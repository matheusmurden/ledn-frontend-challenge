import { useParams } from "react-router-dom";
import { PlanetContextProvider } from "../../hooks";
import { PlanetDetails, TotalTransactionsByPlanet, TransactionsList } from "../../components";

export const PlanetDetailsPage = () => {
	const { id } = useParams();
	return (
		<PlanetContextProvider planetId={id}>
			<div style={{ display: 'flex', width: '100%', gap: '5rem' }}>
				<PlanetDetails />
				<TotalTransactionsByPlanet />
			</div>
			<hr />
			<TransactionsList />
		</PlanetContextProvider>
	)
};
