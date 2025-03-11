import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";
import { Planet, Transaction } from "../types";

type PlanetContextType = {
	data?: {
		planet?: Planet,
		transactions?: Transaction[]
	},
	isLoading: boolean,
	isError: boolean,
	error: Error | null,
	refetchTransactions: () => void
}

const defaultValue = {
	data: {
		planet: undefined,
		transactions: undefined
	},
	isLoading: true,
	isError: false,
	error: null,
	refetchTransactions: () => null
}

export const PlanetContext = createContext<PlanetContextType>(defaultValue)

export const usePlanetContext = () => useContext(PlanetContext);

export const PlanetContextProvider = ({ children, planetId }: { children: ReactNode, planetId?: string }) => {
	const {
		data: planetData,
		isLoading: isLoadingPlanet,
		isError: isErrorPlanet,
		error: errorPlanet
	} = useQuery<{ planet: Planet }>({
		queryKey: [`planet-${planetId}`],
		queryFn: () => fetch(`/api/planets/${planetId}`).then((res) => res.json())
	});

	const {
		data: transactionData,
		isLoading: isLoadingTransaction,
		isError: isErrorTransaction,
		error: errorTransaction,
		refetch: refetchTransactions
	} = useQuery<{ transactions: Transaction[] }>({
		queryKey: [`transactions-${planetId}`],
		queryFn: () => fetch(`/api/transactions/users/${JSON.stringify(planetData?.planet?.residents)}`)
			.then((res) => res.json()),
		enabled: !!planetData?.planet?.residents?.length
	});

	const contextValue = {
		data: {
			planet: planetData?.planet,
			transactions: transactionData?.transactions
		},
		isLoading: isLoadingPlanet || isLoadingTransaction,
		isError: isErrorPlanet || isErrorTransaction,
		error: errorPlanet || errorTransaction || null,
		refetchTransactions
	}

	return (
		<PlanetContext.Provider value={contextValue}>
			{children}
		</PlanetContext.Provider>
	)
};
