import { useCallback, useEffect, useState } from "react";
import { useExchangeRateContext, usePlanetContext } from "../../hooks";
import { Button } from '@mantine/core';
import { Transaction } from "../../types";
import { IconForbid2 } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";

export const TotalTransactionsByPlanet = () => {
	const { data, isLoading } = usePlanetContext();
	const { rate } = useExchangeRateContext();

	const totalICS = data?.transactions
		?.filter((i) => i.currency === 'ICS')
		?.reduce((curr, acc) => {
		return curr + Math.abs(acc.amount)
	}, 0) || 0;

	const totalGCS = data?.transactions
		?.filter((i) => i.currency === 'GCS')
		?.reduce((curr, acc) => {
		return curr + Math.abs(acc.amount)
	}, 0) || 0;

	const netICS = data?.transactions
		?.filter((i) => i.currency === 'ICS')
		?.reduce((curr, acc) => {
		return curr + acc.amount
	}, 0) || 0;

	const netGCS = data?.transactions
		?.filter((i) => i.currency === 'GCS')
		?.reduce((curr, acc) => {
		return curr + acc.amount
	}, 0) || 0;

const formatTotal = (value: number) => Intl.NumberFormat(
	undefined,
	{
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}
).format(value)

const formatNet = (value: number) => Intl.NumberFormat(
	undefined,
	{
		signDisplay: "always",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}
).format(value)

if (isLoading) {
	return <p>Loading Total Transactions...</p>
}

	return !!data?.planet?.residents?.length && (
		<div>
			<h2>Total ICS Exchanged: {formatTotal(totalICS)}
				<span style={{ fontSize: '0.9rem', fontWeight: '300', marginLeft: '0.5rem' }}>
					(Approx. {formatTotal(totalICS * (rate ?? 1))} GSC)
				</span>
			</h2>
			<h3>Net ICS: {formatNet(netICS)}
				<span style={{ fontSize: '0.7rem', fontWeight: '300', marginLeft: '0.5rem' }}>
					(Approx. {formatNet(netICS * (rate ?? 1))} GSC)
				</span>
			</h3>
			<hr />
			<h2>Total GCS Exchanged: {formatTotal(totalGCS)}
				<span style={{ fontSize: '0.9rem', fontWeight: '300', marginLeft: '0.5rem' }}>
					(Approx. {formatTotal(totalGCS / (rate ?? 1))} ICS)
				</span>
			</h2>
			<h3>Net GCS: {formatNet(netGCS)}
				<span style={{ fontSize: '0.7rem', fontWeight: '300', marginLeft: '0.5rem' }}>
					(Approx. {formatNet(netGCS / (rate ?? 1))} ICS)
				</span>
			</h3>
		</div>
	)
}

export const TransactionsList = () => {
	const { data, isLoading, refetchTransactions } = usePlanetContext();
	const { rate } = useExchangeRateContext();

	const {
		mutateAsync,
		isPending: isLoadingMutation
	} = useMutation({
		mutationKey: [`block-transactions-${data?.planet?.id}`],
		mutationFn: () => fetch("/api/transactions/update-batch", {
			method: 'PUT',
			body: JSON.stringify({
				transactions: data?.transactions
					?.filter((i) => i.status === 'inProgress')
					?.map((i) => ({...i, status: 'blocked'}))
			})
		}).then((res) => res.json())
	})

	const statuses = {
		inProgress: 'In Progress',
		completed: 'Completed',
		blocked: 'Blocked'
	}

	const [filteredTransactions, setFilteredTransactions] = useState<Transaction[] | undefined>()
	const [currency, setCurrency] = useState<'ICS' | 'GCS' | 'Any'>('Any')

	const filterTransactionsByCurrency = useCallback(() => {
		if (currency === 'Any') {
			return [...(data?.transactions || [])];
		} else {
			return [...(data?.transactions || [])]?.filter((item) => item.currency === currency)
		}
	}, [currency, data?.transactions])

	const blockTransactions = async () => {
		await mutateAsync()
			.then(() => {
				setCurrency('Any');
				refetchTransactions()
			});
	}
	useEffect(() => {
		setFilteredTransactions(filterTransactionsByCurrency());
	}, [filterTransactionsByCurrency])

	return <>
		{
		isLoading || isLoadingMutation
		? <p>Loading Planet Transactions...</p> :
		!!filteredTransactions?.length
		? (
		<>
			<h2>Transactions</h2>
			<div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
				<label style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
					Any
					<input type="radio" value="Any" checked={currency === 'Any'} onChange={({ target: { value } }) => setCurrency(value as 'Any')} />
				</label>
				<label style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
					ICS
					<input type="radio" value="ICS" checked={currency === 'ICS'} onChange={({ target: { value } }) => setCurrency(value as 'ICS')} />
				</label>
				<label style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
					GCS
					<input type="radio" value="GCS" checked={currency === 'GCS'} onChange={({ target: { value } }) => setCurrency(value as 'GCS')} />
				</label>
			</div>

			<table style={{ display: 'table' }}>
				<thead style={{ width: '100%', fontWeight: '700' }}>
					<tr style={{ display: 'table-row' }}>
						<td style={{ padding: '1rem', display: 'table-cell' }}>Currency</td>
						<td style={{ padding: '1rem', display: 'table-cell' }}>Amount</td>
						<td style={{ padding: '1rem', display: 'table-cell' }}>Value in GCS</td>
						<td style={{ padding: '1rem', display: 'table-cell' }}>Value in ICS</td>
						<td style={{ padding: '1rem', display: 'table-cell' }}>Date</td>
						<td style={{ padding: '1rem', display: 'table-cell' }}>Status</td>
					</tr>
				</thead>
				<tbody>
					{filteredTransactions?.map((t) => (
						<tr key={t.id} style={{ width: '100%', display: 'table-row' }}>
							<td style={{ padding: '1rem' }}>{t.currency}</td>
							<td style={{ padding: '1rem' }}>
								{Intl.NumberFormat(
									undefined,
									{
										signDisplay: "always",
										minimumFractionDigits: 2,
										maximumFractionDigits: 2
									}
								).format(t.amount)}
							</td>
							<td style={{ padding: '1rem' }}>
								{
									Intl.NumberFormat(
										undefined,
										{
											signDisplay: "never",
											minimumFractionDigits: 2,
											maximumFractionDigits: 2
										}
									)
										.format(
											t.currency === 'GCS'
												? t.amount
												: (t.amount / (rate ?? 1))
										)
								}
							</td>
							<td style={{ padding: '1rem' }}>
								{
									Intl.NumberFormat(
										undefined,
										{
											signDisplay: "never",
											minimumFractionDigits: 2,
											maximumFractionDigits: 2
										}
									)
										.format(
											t.currency === 'ICS'
												? t.amount
												: (t.amount * (rate ?? 1))
										)
								}
							</td>
							<td style={{ padding: '1rem' }}>
								{t.date}
							</td>
							<td style={{ padding: '1rem' }}>
								{statuses[t.status]}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	) : <p>No Transactions Found</p>
		}
		<div style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}>
			<Button
				color="red"
				loading={isLoadingMutation}
				disabled={isLoading || isLoadingMutation}
				onClick={() => blockTransactions()}
			>
	    	<IconForbid2
						size={20}
						stroke={1.5}
						style={{ marginRight: '0.4rem' }}
				/>
				<p>Block all transactions with status <i>In Progress</i></p>
	     </Button>
		</div>
	</>
};
