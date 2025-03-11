import { useParams } from "react-router-dom";
import { PlanetContextProvider } from "../../hooks";
import { PlanetDetails, TransactionsList, TransactionsTotal } from "../../components";
import styled from "styled-components";

const HorizontalDivider = styled('hr')`
	margin-top: 1rem;
	color: teal;
`;

const DetailsContainer = styled('div')`
	display: flex;
	width: 100%;
	gap: 4rem;
	align-items: flex-end;
`;

export const PlanetDetailsPage = () => {
	const { id } = useParams();
	return (
		<PlanetContextProvider planetId={id}>
			<DetailsContainer>
				<PlanetDetails />
				<TransactionsTotal />
			</DetailsContainer>
			<HorizontalDivider />
			<TransactionsList />
		</PlanetContextProvider>
	)
};
