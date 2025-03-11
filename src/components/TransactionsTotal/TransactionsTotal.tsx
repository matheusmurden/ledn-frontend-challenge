import { Table, NumberFormatter } from "@mantine/core";
import { useMemo } from "react";
import { usePlanetContext, useExchangeRateContext } from "../../hooks";
import styled from "styled-components";

const TableHeader = styled(Table.Thead)`
	font-weight: 700;
`;

const TableHeadCell = styled(Table.Th)`
	color: rgb(2, 61, 75);
	@media screen and (prefers-color-scheme: dark) {
		color: #92b7b1;
	}
`;

export const TransactionsTotal = () => {
	const { data, isLoading } = usePlanetContext();
	const { rate } = useExchangeRateContext();

	const { totalICS, totalGCS } = useMemo(() => {
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

		return {
			totalICS,
			totalGCS
		}

	}, [data?.transactions])

if (isLoading) {
	return <p>Loading Total Transactions...</p>
}

	return !!data?.planet?.residents?.length && (
		<Table.ScrollContainer minWidth={200}>
			<Table striped withRowBorders withTableBorder>
				<TableHeader>
					<Table.Tr>
						<TableHeadCell>Currency</TableHeadCell>
						<TableHeadCell>Total Transaction Amount</TableHeadCell>
						<TableHeadCell>Value in GCS</TableHeadCell>
						<TableHeadCell>Value in ICS</TableHeadCell>
					</Table.Tr>
				</TableHeader>
				<Table.Tbody>
					<Table.Tr>
						<Table.Td>
							ICS
						</Table.Td>
						<Table.Td>
							<NumberFormatter
								value={totalICS}
								decimalScale={2}
								allowNegative={false}
								thousandSeparator
							/>
						</Table.Td>
						<Table.Td>
							<NumberFormatter
								value={totalICS * (rate ?? 1)}
								decimalScale={2}
								allowNegative={false}
								thousandSeparator
							/>
						</Table.Td>
						<Table.Td>
							-
						</Table.Td>
					</Table.Tr>
					<Table.Tr>
						<Table.Td>
							GCS
						</Table.Td>
						<Table.Td>
							<NumberFormatter
								value={totalGCS}
								decimalScale={2}
								allowNegative={false}
								thousandSeparator
							/>
						</Table.Td>
						<Table.Td>
							-
						</Table.Td>
						<Table.Td>
							<NumberFormatter
								value={totalGCS / (rate ?? 1)}
								decimalScale={2}
								allowNegative={false}
								thousandSeparator
							/>
						</Table.Td>
					</Table.Tr>
				</Table.Tbody>
			</Table>
		</Table.ScrollContainer>
	)
}
