import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';

import { useAppThemeContext, useDrawerContext } from '../../contexts';
import { ListItemLink } from './ListItemLink';

interface IMenuLateralChildren {
	children: React.ReactNode;
}

export const MenuLateral: React.FC<IMenuLateralChildren> = ({ children }) => {

	const theme = useTheme();

	const smDown = useMediaQuery(theme.breakpoints.down('sm'));

	const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();

	const { toggleTheme } = useAppThemeContext();

	return (
		<>
			<Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
				<Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
					<Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
						<Avatar
							sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
							src="https://i.ibb.co/Mcp9T8b/avatar.jpg"
						/>
					</Box>

					<Divider />

					<Box flex={1}>
						<List component="nav">
							{drawerOptions.map(drawerOption => (
								<ListItemLink
									key={drawerOption.path}
									icon={drawerOption.icon}
									label={drawerOption.label}
									to={drawerOption.path}
									onClick={smDown ? toggleDrawerOpen : undefined} />
							))}
						</List>
					</Box>

					<Box>
						<List component="nav">
							<ListItemButton onClick={toggleTheme}>
								<ListItemIcon>
									<Icon>dark_mode</Icon>
								</ListItemIcon>
								<ListItemText primary='Alterar tema' />
							</ListItemButton>
						</List>
					</Box>
				</Box>
			</Drawer>

			<Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
				{children}
			</Box>
		</>
	);
};