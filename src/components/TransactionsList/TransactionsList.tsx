import { useExchangeRateContext, usePlanetContext } from "../../hooks";

export const TransactionsList = () => {
	const { data } = usePlanetContext();
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

	return (
		<>
			{/* Implement solution that changes all transactions of this planetId from status `inProgress` to `blocked` */ }
			{/* Add dashboard-like component with widgets displaying planet details (gravity, climate, etc) */}

			<h2>Total ICS Exchanged: {formatTotal(totalICS)}
				<span style={{ fontSize: '0.9rem', fontWeight: '300' }}>
					(Approx. {formatTotal(totalICS * (rate ?? 1))} GSC)
				</span>
			</h2>
			<h3>ICS Net Total: {formatNet(netICS)}
				<span style={{ fontSize: '0.9rem', fontWeight: '300' }}>
					(Approx. {formatNet(netICS * (rate ?? 1))} GSC)
				</span>
			</h3>
			<hr />
			<h2>Total GCS Exchanged: {formatTotal(totalGCS)}
				<span style={{ fontSize: '0.9rem', fontWeight: '300' }}>
					(Approx. {formatTotal(totalGCS / (rate ?? 1))} ICS)
				</span>
			</h2>
			<h3>GCS Net Total: {formatNet(netGCS)}
				<span style={{ fontSize: '0.9rem', fontWeight: '300' }}>
					(Approx. {formatNet(netGCS / (rate ?? 1))} ICS)
				</span>
			</h3>
			<hr />

			{/* Add Filter by currency type */}
			{/* Add columns for trans currency, trans value, value in gcs and value in ics, trans date, trans status */}
			<ul style={{ fontFamily: 'monospace' }}>
				{data?.transactions?.map((t) => (
					<li key={t.id}>
						<strong>{t.currency} </strong>
						{Intl.NumberFormat(
							undefined,
							{
								signDisplay: "always",
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							}
						).format(t.amount)}
						<span style={{ fontSize: '0.75rem' }}> Approx. {Intl.NumberFormat(
						undefined,
						{
							signDisplay: "always",
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						}
					).format(t.currency === 'ICS' ? (t.amount * (rate ?? 1)) : (t.amount / (rate ?? 1)))} {t.currency === 'ICS' ? 'GSC' : 'ICS'}</span>
					</li>
				))}
			</ul>
		</>
	);
};
