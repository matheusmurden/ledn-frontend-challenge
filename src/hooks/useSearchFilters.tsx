import { useQuery } from "@tanstack/react-query";
import { uniq } from "lodash";
import { ChangeEvent, createContext, ReactNode, useCallback, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

const defaultValue: {
	isLoading: boolean
	isError: boolean
	error?: Error | null
	allPlanets?: { [key: string]: string }[]
	allClimates?: string[]
	allTerrains?: string[]
	filteredResults?: { [key: string]: string }[]
	filterValues: {
		name?: string
		climate?: string
		terrain?: string
	}
	setSearchFilters?: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
} = {
	isLoading: true,
	isError: false,
	filterValues: {
		name: '',
		climate: '',
		terrain: ''
	},
	setSearchFilters: () => null
}

export const SearchContext = createContext(defaultValue)

export const SearchContextProvider = ({ children }: { children: ReactNode }) => {

	const { data, isLoading, isError, error } = useQuery({
		queryKey:['AllPlanets'],
		queryFn: () => fetch('/api/planets').then((res) => res.json())
	})

	const [searchParams, setSearchParams] = useSearchParams();
	const [filterValues, setFilterValues] = useState({
		name: searchParams.get("name") ?? "",
		climate: searchParams.get("climate") ?? "",
		terrain: searchParams.get("terrain") ?? ""
	})

	const setSearchFilters = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { target: { value, name: field } } = event;
		setFilterValues((prev) => ({ ...prev, [field]: value }));
		setSearchParams((prev) => ({...Object.fromEntries(prev.entries()), [field]: value }));
	}

	const allPlanets: { [key: string]: string }[] = data?.planets;

	const getUniquePropertyValues = useCallback((property: string) => {
		return uniq(
			allPlanets?.flatMap((planet: { [property: string]: string }) => planet?.[property]?.split(', '))
		)?.sort()
	}, [allPlanets])

	const allClimates = getUniquePropertyValues('climate');
	const allTerrains = getUniquePropertyValues('terrain');

	const filteredResults = allPlanets
		?.filter((item) => item.name.toLowerCase().includes(filterValues.name.toLowerCase()))
		?.filter((item) => item.climate.toLowerCase().includes(filterValues.climate.toLowerCase()))
		?.filter((item) => item.terrain.toLowerCase().includes(filterValues.terrain.toLowerCase()))

	if (isError) {
		return <p>Error: {error?.message}</p>
	}

	const contextValue = {
		isLoading,
		isError,
		error,
		allPlanets,
		allClimates,
		allTerrains,
		filterValues,
		setSearchFilters,
		filteredResults
	}

	return (
		<SearchContext.Provider value={contextValue}>
			{children}
		</SearchContext.Provider>
	)
};

export const useSearchContext = () => useContext(SearchContext);
