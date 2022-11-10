import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerContextData {
    isDrawerOpen: boolean;
	drawerOptions: IDrawerOption[];
    toggleDrawerOpen: () => void;
	setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
	return useContext(DrawerContext);
};

interface IAppDrawerProviderProps {
    children: React.ReactNode
}

interface IDrawerOption {
	icon: string;
	path: string;
	label: string;
}

export const AppDrawerProvider: React.FC<IAppDrawerProviderProps> = ({ children }) => {

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);


	const toggleDrawerOpen = useCallback(() => {
		setIsDrawerOpen(oldDrawer => !oldDrawer);
	}, []);

	const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
		setDrawerOptions(newDrawerOptions);
	},[]);

	return (
		<DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, setDrawerOptions: handleSetDrawerOptions, toggleDrawerOpen }}>
			{children}
		</DrawerContext.Provider>
	);
};