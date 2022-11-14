import { Box } from '@mui/material';

interface ILayoutBaseProps {
    title: string;
    children: React.ReactNode;
}

export const LayoutBasePage: React.FC<ILayoutBaseProps> = ( {children, title} ) => {

	return (
		<Box>
			{title}
			{children}
		</Box>
	);
};