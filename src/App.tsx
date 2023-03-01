import { BrowserRouter } from 'react-router-dom';

import './shared/forms/TraducoesYup';

import { AppRoutes } from './routes';
import { Login, MenuLateral } from './shared/components';
import { AppDrawerProvider, AppThemeProvider, AuthProvider } from './shared/contexts';

export const App = () => {
	return (
		<AuthProvider>

			<AppThemeProvider>

				<Login>

					<AppDrawerProvider>

						<BrowserRouter>

							<MenuLateral>
								<AppRoutes />
							</MenuLateral>

						</BrowserRouter>

					</AppDrawerProvider>

				</Login>

			</AppThemeProvider>

		</AuthProvider>
	);
};