import { BrowserRouter } from 'react-router-dom';

import './shared/forms/TraducoesYup';

import { AppRoutes } from './routes';
import { MenuLateral } from './shared/components';
import { AppDrawerProvider, AppThemeProvider } from './shared/contexts';

export const App = () => {
	return (
		<AppThemeProvider>
			<AppDrawerProvider>
				<BrowserRouter>
					<MenuLateral>
						<AppRoutes />
					</MenuLateral>		
				</BrowserRouter>
			</AppDrawerProvider>
		</AppThemeProvider>		
	);
};