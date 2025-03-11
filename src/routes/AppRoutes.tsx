import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SearchPage } from '../pages';
import { ExchangeRateContextProvider } from '../hooks';
import { DefaultLayout } from '../layouts';

export const AppRoutes = () => {
	return (
		<BrowserRouter>
			<ExchangeRateContextProvider>
				<Routes>
					<Route element={<DefaultLayout />}>
						<Route index element={<Navigate to="/planets" replace />} />
						<Route path="/planets" element={<SearchPage />} />
						<Route path="/planets/:id" element={<SearchPage />} />
					</Route>
				</Routes>
			</ExchangeRateContextProvider>
		</BrowserRouter>
	);
};
