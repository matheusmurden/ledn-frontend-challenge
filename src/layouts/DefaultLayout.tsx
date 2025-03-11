import { Outlet } from "react-router-dom";
import { useExchangeRateContext } from "../hooks";
import { FloatingCard } from "../components";

export const DefaultLayout = () => {
	const { rateAsText } = useExchangeRateContext();

	return (
		<div style={{ padding: '2rem' }}>
			<FloatingCard>{rateAsText}</FloatingCard>
			<Outlet />
		</div>
	)
};
