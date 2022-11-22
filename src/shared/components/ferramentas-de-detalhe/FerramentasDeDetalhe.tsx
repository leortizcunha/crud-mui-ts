import { Box, useTheme, Paper, Button, Icon, Divider } from '@mui/material';

interface IFerramentasDeDetalheProps {
	textoBotaoNovo?: string;

	mostrarBotaoNovo?: boolean;
	mostrarBotaoVoltar?: boolean;
	mostrarBotaoApagar?: boolean;
	mostrarBotaoSalvar?: boolean;
	mostrarBotaoSalvarEVoltar?: boolean;

	aoClicarEmNovo?: () => void;
	aoClicarEmVoltar?: () => void;
	aoClicarEmApagar?: () => void;
	aoClicarEmSalvar?: () => void;
	aoClicarEmSalvarEVoltar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
	textoBotaoNovo = 'Novo',
	mostrarBotaoNovo = true,
	mostrarBotaoVoltar = true,
	mostrarBotaoApagar = true,
	mostrarBotaoSalvar = true,
	mostrarBotaoSalvarEVoltar = false,

	aoClicarEmNovo,
	aoClicarEmVoltar,
	aoClicarEmApagar,
	aoClicarEmSalvar,
	aoClicarEmSalvarEVoltar
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
			{mostrarBotaoSalvar && (
				<Button
					variant='contained'
					color='primary'
					disableElevation
					onClick={aoClicarEmSalvar}
					startIcon={<Icon>save</Icon>}
				>Salvar</Button>
			)}

			{mostrarBotaoSalvarEVoltar && (
				<Button
					variant='outlined'
					color='primary'
					disableElevation
					onClick={aoClicarEmSalvarEVoltar}
					startIcon={<Icon>save</Icon>}
				>Salvar e Voltar</Button>
			)}

			{mostrarBotaoApagar && (
				<Button
					variant='outlined'
					color='primary'
					disableElevation
					onClick={aoClicarEmApagar}
					startIcon={<Icon>delete</Icon>}
				>Apagar</Button>
			)}

			{mostrarBotaoNovo && (
				<Button
					variant='outlined'
					color='primary'
					disableElevation
					onClick={aoClicarEmNovo}
					startIcon={<Icon>add</Icon>}
				>{textoBotaoNovo}</Button>
			)}

			<Divider variant='middle' orientation='vertical' />

			{mostrarBotaoVoltar && (
				<Button
					variant='outlined'
					color='primary'
					disableElevation
					onClick={aoClicarEmVoltar}
					startIcon={<Icon>arrow_back</Icon>}
				>Voltar</Button>
			)}
		</Box>
	);
};