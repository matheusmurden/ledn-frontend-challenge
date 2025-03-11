import { useCallback, useEffect, useState } from "react";
import { useExchangeRateContext, usePlanetContext } from "../../hooks";
import { Button, LoadingOverlay, NumberFormatter, Title } from '@mantine/core';
import { Transaction } from "../../types";
import { IconForbid2 } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";

import { Table } from '@mantine/core';
import styled from "styled-components";

const TableHeader = styled(Table.Thead)`
	font-weight: 700;
`;

const TableFilters = styled('div')`
	display: flex;
	gap: 2rem;
	align-items: center;
	margin-bottom: 2rem;
`;

const InputLabel = styled('label')`
	display: flex;
	flex-direction: column;
	cursor: pointer;
`;

const RadioInput = styled('input')`
	cursor: inherit;
	accent-color: teal;
`;

const FloatingButtonContainer = styled('div')`
	position: fixed;
	z-index: 1001;
	bottom: 1rem;
	right: 1rem;
`;

const TableHeadCell = styled(Table.Th)`
	color: rgb(2, 61, 75);
`;

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
	const [currency, setCurrency] = useState<string>('Any')

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
			isLoading ? <p>Loading Transaction Data...</p> :
		!!filteredTransactions?.length
		? (
		<>
			<Title order={3} c="rgb(2, 61, 75)" my="1rem">Transactions</Title>
			<TableFilters>
				<InputLabel>
					Any
					<RadioInput
						type="radio"
						value="Any"
						checked={currency === 'Any'}
						onChange={({ target: { value } }) => setCurrency(value)}
					/>
				</InputLabel>
				<InputLabel>
					ICS
					<RadioInput
						type="radio"
						value="ICS"
						checked={currency === 'ICS'}
						onChange={({ target: { value } }) => setCurrency(value)}
					/>
				</InputLabel>
				<InputLabel>
					GCS
					<RadioInput
						type="radio"
						value="GCS"
						checked={currency === 'GCS'}
						onChange={({ target: { value } }) => setCurrency(value)}
					/>
				</InputLabel>
			</TableFilters>

			<Table.ScrollContainer minWidth={720}>
				<Table
					striped
					withTableBorder
					withRowBorders
					stickyHeader
					stickyHeaderOffset={0}
					style={{ position: 'relative' }}
				>
					<TableHeader>
						<Table.Tr>
							<TableHeadCell>Currency</TableHeadCell>
							<TableHeadCell>Amount</TableHeadCell>
							<TableHeadCell>Value in GCS</TableHeadCell>
							<TableHeadCell>Value in ICS</TableHeadCell>
							<TableHeadCell>Date</TableHeadCell>
							<TableHeadCell>Status</TableHeadCell>
						</Table.Tr>
					</TableHeader>
					<Table.Tbody>
						{filteredTransactions?.map((t) => (
							<Table.Tr key={t.id}>
								<Table.Td>{t.currency}</Table.Td>
								<Table.Td>
									<NumberFormatter
										value={t.amount}
										allowNegative
										thousandSeparator
										decimalScale={2}
									/>
								</Table.Td>
								<Table.Td>
									{t.currency === 'GCS'
										? '-'
										: (<NumberFormatter
											value={(t.amount / (rate ?? 1))}
											thousandSeparator
											allowNegative
											decimalScale={2}
										/>)
									}
								</Table.Td>
								<Table.Td>
									{t.currency === 'ICS'
										? '-'
										: (<NumberFormatter
											value={(t.amount * (rate ?? 1))}
											thousandSeparator
											allowNegative
											decimalScale={2}
										/>)
									}
								</Table.Td>
								<Table.Td>
									{new Date(t.date).toLocaleDateString(undefined, {
									  year: "numeric",
									  month: "2-digit",
									  day: "2-digit",
									})}
								</Table.Td>
								<Table.Td>
									{statuses[t.status]}
								</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
	        <LoadingOverlay
						visible={isLoading || isLoadingMutation}
						zIndex={1000}
						overlayProps={{ radius: "sm", blur: 2 }}
					/>
				</Table>
			</Table.ScrollContainer>
		</>
	) : <p>No transactions to display</p>
		}
		<FloatingButtonContainer>
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
				<p>
					{isLoading
						? 'Loading...'
						: 'Block all transactions with status In Progress' }
				</p>
	     </Button>
		</FloatingButtonContainer>
	</>
};
