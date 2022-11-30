import { Box, Button, Paper, TextField, useTheme, Icon } from '@mui/material';

import { Environment } from '../../environment';

interface IFerramentasDaListagemProps {
	textoDaBusca?: string;
	mostrarInputBusca?: boolean;
	aoMudarTextoDeBusca?: (novoTexto: string) => void;

	textoBotaoNovo?: string;
	mostrarBotaoNovo?: boolean;
	aoClicarEmNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
	textoDaBusca = '',
	mostrarInputBusca = false,
	aoMudarTextoDeBusca,
	textoBotaoNovo = 'Novo',
	mostrarBotaoNovo = true,
	aoClicarEmNovo
}) => {

	const theme = useTheme();

	return (
		<Box
			component={Paper}
			height={theme.spacing(5)}
			display='flex'
			gap={1}
			marginX={1}
			padding={1}
			paddingX={2}
			alignItems='center'
		>
			{mostrarInputBusca && (<TextField
				size='small'
				placeholder={Environment.INPUT_DE_BUSCA}
				value={textoDaBusca}
				onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
			/>)}

			<Box flex={1} display='flex' justifyContent='end'>
				{mostrarBotaoNovo && (
					<Button
						variant='contained'
						color='primary'
						disableElevation
						onClick={aoClicarEmNovo}
						endIcon={<Icon>add</Icon>}
					>{textoBotaoNovo}</Button>)}
			</Box>
		</Box>
	);
};