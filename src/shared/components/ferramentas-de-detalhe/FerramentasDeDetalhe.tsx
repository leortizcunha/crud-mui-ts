import { Box, useTheme, Paper, Button, Icon, Divider, Skeleton, Typography, useMediaQuery, Theme } from '@mui/material';

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

	mostrarBotaoNovoCarregando?: boolean;
	mostrarBotaoVoltarCarregando?: boolean;
	mostrarBotaoApagarCarregando?: boolean;
	mostrarBotaoSalvarCarregando?: boolean;
	mostrarBotaoSalvarEVoltarCarregando?: boolean;
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
	aoClicarEmSalvarEVoltar,

	mostrarBotaoNovoCarregando = false,
	mostrarBotaoVoltarCarregando = false,
	mostrarBotaoApagarCarregando = false,
	mostrarBotaoSalvarCarregando = false,
	mostrarBotaoSalvarEVoltarCarregando = false,
}) => {

	const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
	const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

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
			{(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
				<Button
					variant='contained'
					color='primary'
					disableElevation
					onClick={aoClicarEmSalvar}
					startIcon={<Icon>save</Icon>}
				>
					<Typography variant='button' noWrap>
						Salvar
					</Typography>
				</Button>
			)}

			{mostrarBotaoSalvarCarregando && (
				<Skeleton width={110} height={60} />
			)}

			{(mostrarBotaoSalvarEVoltar && !mostrarBotaoSalvarEVoltarCarregando && !smDown && !mdDown) && (
				<Button
					variant='outlined'
					color='primary'
					disableElevation
					onClick={aoClicarEmSalvarEVoltar}
					startIcon={<Icon>save</Icon>}
				>
					<Typography variant='button' noWrap >
						Salvar e Voltar
					</Typography>
				</Button>
			)}

			{(mostrarBotaoSalvarEVoltarCarregando && !smDown && !mdDown) && (
				<Skeleton width={180} height={60} />
			)}

			{(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
				<Button
					variant='outlined'
					color='primary'
					disableElevation
					onClick={aoClicarEmApagar}
					startIcon={<Icon>delete</Icon>}
				>
					<Typography variant='button' noWrap>
						Apagar
					</Typography>
				</Button>
			)}

			{mostrarBotaoApagarCarregando && (
				<Skeleton width={110} height={60} />
			)}

			{(mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown) && (
				<Button
					variant='outlined'
					color='primary'
					disableElevation
					onClick={aoClicarEmNovo}
					startIcon={<Icon>add</Icon>}
				>
					<Typography variant='button' noWrap>
						{textoBotaoNovo}
					</Typography>
				</Button>
			)}

			{(mostrarBotaoNovoCarregando && !smDown) && (
				<Skeleton width={110} height={60} />
			)}

			{
				(mostrarBotaoVoltar &&
					(mostrarBotaoNovo || mostrarBotaoApagar || mostrarBotaoSalvar || mostrarBotaoSalvarEVoltar)
				) && (
					<Divider variant='middle' orientation='vertical' />
				)
			}

			{(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
				<Button
					variant='outlined'
					color='primary'
					disableElevation
					onClick={aoClicarEmVoltar}
					startIcon={<Icon>arrow_back</Icon>}
				>
					<Typography variant='button' noWrap>
						Voltar
					</Typography>
				</Button>
			)}

			{mostrarBotaoVoltarCarregando && (
				<Skeleton width={110} height={60} />
			)}
		</Box>
	);
};