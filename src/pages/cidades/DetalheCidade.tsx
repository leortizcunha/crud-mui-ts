import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';

import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';
import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';

interface IFormData {
	nome: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
	nome: yup.string().required().min(3)

});

export const DetalheCidade: React.FC = () => {

	const { id = 'nova' } = useParams<'id'>();

	const navigate = useNavigate();

	const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

	const [isLoading, setIsLoading] = useState(false);
	const [nome, setNome] = useState('');

	useEffect(() => {
		if (id !== 'nova') {
			setIsLoading(true);

			CidadesService.getById(Number(id))
				.then((result) => {
					setIsLoading(false);

					if (result instanceof Error) {
						alert(result.message);
						navigate('/cidades');
					} else {
						setNome(result.nome);
						console.log(result);

						formRef.current?.setData(result);
					}
				});
		} else {
			formRef.current?.setData({
				nome: '',				
			});
		}
	}, [id]);

	const handleSave = (dados: IFormData) => {

		formValidationSchema.
			validate(dados, { abortEarly: false })
			.then((dadosValidados) => {

				setIsLoading(true);

				if (id === 'nova') {
					CidadesService.create(dadosValidados)
						.then((result) => {
							setIsLoading(false);

							if (result instanceof Error) {
								alert(result.message);
							} else {
								if (isSaveAndClose()) {
									navigate('/cidades');
								} else {
									navigate(`/cidades/detalhe/${result}`);
								}
							}
						});
				} else {
					CidadesService.updateById(Number(id), { id: Number(id), ...dadosValidados })
						.then((result) => {
							setIsLoading(false);

							if (result instanceof Error) {
								alert(result.message);
							} else {
								if (isSaveAndClose()) {
									navigate('/cidades');
								}
							}
						});
				}

			})
			.catch((errors: yup.ValidationError) => {
				const validationErrors: IVFormErrors = {};

				errors.inner.forEach(error => {
					if (!error.path) return;

					validationErrors[error.path] = error.message;

					formRef.current?.setErrors(validationErrors);
				});

			});
	};

	const handleDelete = (id: number) => {

		if (confirm('Deseja apagar o registro?')) {
			CidadesService.deleteById(id)
				.then(result => {
					if (result instanceof Error) {
						alert(result.message);
					} else {
						alert('Registro apagado!');
						navigate('/cidades');
					}
				});
		}

	};

	return (
		<LayoutBasePage
			title={id === 'nova' ? 'Nova cidade' : nome}
			barraDeFerramentas={
				<FerramentasDeDetalhe
					textoBotaoNovo='Nova'
					mostrarBotaoSalvarEVoltar
					mostrarBotaoNovo={id !== 'nova'}
					mostrarBotaoApagar={id !== 'nova'}

					aoClicarEmApagar={() => handleDelete((Number(id)))}
					aoClicarEmSalvar={save}
					aoClicarEmSalvarEVoltar={saveAndClose}
					aoClicarEmNovo={() => navigate('/cidades/detalhe/nova')}
					aoClicarEmVoltar={() => navigate('/cidades')}
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
									label='Nome'
									name='nome'
									disabled={isLoading}
									onChange={e => setNome(e.target.value)}
								/>
							</Grid>
						</Grid>									

					</Grid>

				</Box>

			</VForm>

		</LayoutBasePage>
	);
};