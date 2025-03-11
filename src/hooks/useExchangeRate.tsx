import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useMemo } from "react";

type ExchangeRateContextType = {
	rate: number | null
	rateAsText: string
	isLoading: boolean
	isError: boolean
	error?: Error | null
};

const defaultValue = {
	rate: null,
	rateAsText: '',
	isLoading: true,
	isError: false,
	error: null
}

export const ExchangeRateContext = createContext<ExchangeRateContextType>(defaultValue)

export const ExchangeRateContextProvider = ({ children }: { children: ReactNode }) => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['exchangeRate'],
		queryFn: () => fetch('/api/exchange-rate').then((res) => res.json()),
		refetchInterval: 5000
	})

	const formatRate = (value: number) =>
		Intl
			.NumberFormat(undefined, {
				minimumFractionDigits: 3,
				maximumFractionDigits: 3
			})
			.format(value)

	const rateAsText = useMemo(() => {
		if (isError) {
			console.error(error?.message);
			return 'Something went wrong, please try again later'
		}
		if (isLoading) {
			return 'Loading Exchange Rate...'
		}
		return `1 ICS ≈ ${formatRate(data?.rate)} GCS`
	}, [data?.rate, error?.message, isError, isLoading])

	return (
		<ExchangeRateContext.Provider
			value={{
				rate: data?.rate ?? null,
				rateAsText,
				isLoading,
				isError,
				error
			}}
		>
			{children}
		</ExchangeRateContext.Provider>
	)
};

export const useExchangeRateContext = () => useContext(ExchangeRateContext);
