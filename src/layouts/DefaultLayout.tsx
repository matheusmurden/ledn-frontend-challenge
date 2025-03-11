import { Outlet } from "react-router-dom";
import { useExchangeRateContext } from "../hooks";

export const DefaultLayout = () => {
	const { rateAsText } = useExchangeRateContext();

	return (
		<div style={{ padding: '2rem' }}>
			<p style={{ position: 'fixed', top: '2rem', right: '2rem' }}>
				{rateAsText}
			</p>
			<Outlet />
		</div>
	)
};
