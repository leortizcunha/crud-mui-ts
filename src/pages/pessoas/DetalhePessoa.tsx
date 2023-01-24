import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';

import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { VTextField, VForm, useVForm } from '../../shared/forms';
import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';

interface IFormData {
	nomeCompleto: string;
	email: string;
	cidadeId: number;
}

export const DetalhePessoa: React.FC = () => {

	const { id = 'nova' } = useParams<'id'>();

	const navigate = useNavigate();

	const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

	const [isLoading, setIsLoading] = useState(false);
	const [nome, setNome] = useState('');

	useEffect(() => {
		if (id !== 'nova') {
			setIsLoading(true);

			PessoasService.getById(Number(id))
				.then((result) => {
					setIsLoading(false);

					if (result instanceof Error) {
						alert(result.message);
						navigate('/pessoas');
					} else {
						setNome(result.nomeCompleto);
						console.log(result);

						formRef.current?.setData(result);
					}
				});
		} else {
			formRef.current?.setData({
				nomeCompleto: '',
				email: '',
				cidadeId: ''
			});
		}
	}, [id]);

	const handleSave = (dados: IFormData) => {
		setIsLoading(true);

		if (id === 'nova') {
			PessoasService.create(dados)
				.then((result) => {
					setIsLoading(false);

					if (result instanceof Error) {
						alert(result.message);
					} else {
						if (isSaveAndClose()) {
							navigate('/pessoas');
						} else {
							navigate(`/pessoas/detalhe/${result}`);
						}
					}
				});
		} else {
			PessoasService.updateById(Number(id), { id: Number(id), ...dados })
				.then((result) => {
					setIsLoading(false);

					if (result instanceof Error) {
						alert(result.message);
					} else {
						if (isSaveAndClose()) {
							navigate('/pessoas');
						}
					}
				});
		}
	};

	const handleDelete = (id: number) => {

		if (confirm('Deseja apagar o registro?')) {
			PessoasService.deleteById(id)
				.then(result => {
					if (result instanceof Error) {
						alert(result.message);
					} else {
						alert('Registro apagado!');
						navigate('/pessoas');
					}
				});
		}

	};

	return (
		<LayoutBasePage
			title={id === 'nova' ? 'Nova pessoa' : nome}
			barraDeFerramentas={
				<FerramentasDeDetalhe
					textoBotaoNovo='Nova'
					mostrarBotaoSalvarEVoltar
					mostrarBotaoNovo={id !== 'nova'}
					mostrarBotaoApagar={id !== 'nova'}

					aoClicarEmApagar={() => handleDelete((Number(id)))}
					aoClicarEmSalvar={save}
					aoClicarEmSalvarEVoltar={saveAndClose}
					aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
					aoClicarEmVoltar={() => navigate('/pessoas')}
				/>
			}
		>

			<VForm ref={formRef} onSubmit={handleSave}>

				<Box padding={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>

					<Grid container direction='column' padding={2} spacing={2}>

						{isLoading && (
							<Grid item>
								<LinearProgress variant='indeterminate' />
							</Grid>
						)}

						<Grid item>
							<Typography variant='h6'>Geral</Typography>
						</Grid>

						<Grid item container direction='row' spacing={2}>
							<Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
								<VTextField
									fullWidth
									label='Nome completo'
									name='nomeCompleto'
									disabled={isLoading}
									onChange={e => setNome(e.target.value)}
								/>
							</Grid>
						</Grid>

						<Grid item container direction='row' spacing={2}>
							<Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
								<VTextField
									fullWidth
									label='Email'
									name='email'
									disabled={isLoading}
								/>
							</Grid>
						</Grid>

						<Grid item container direction='row' spacing={2}>
							<Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
								<VTextField
									fullWidth
									label='Cidade'
									name='cidadeId'
									disabled={isLoading}
								/>
							</Grid>
						</Grid>

					</Grid>

				</Box>

			</VForm>

		</LayoutBasePage>
	);
};