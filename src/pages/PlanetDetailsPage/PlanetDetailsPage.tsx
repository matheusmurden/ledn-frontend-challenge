import { useParams } from "react-router-dom";
import { PlanetContextProvider } from "../../hooks";
import { TransactionsList } from "../../components/TransactionsList";

export const PlanetDetailsPage = () => {
	const { id } = useParams();
	return (
		<PlanetContextProvider planetId={id}>
			<TransactionsList />
		</PlanetContextProvider>
	)
};
