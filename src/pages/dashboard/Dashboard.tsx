import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';

export const Dashboard = () => {

	const [isLoadingCidades, setIsLoadingCidades] = useState(false);
	const [totalCountCidades, setTotalCountCidades] = useState(0);

	const [isLoadingPessoas, setIsLoadingPessoas] = useState(false);
	const [totalCountPessoas, setTotalCountPessoas] = useState(0);

	useEffect(() => {
		setIsLoadingCidades(true);
		setIsLoadingPessoas(true);

		CidadesService.getAll(1)
			.then((result) => {
				setIsLoadingCidades(false);

				if (result instanceof Error) {
					alert(result.message);
				} else {
					setTotalCountCidades(result.totalCount);
				}
			});

		PessoasService.getAll(1)
			.then((result) => {
				setIsLoadingPessoas(false);

				if (result instanceof Error) {
					alert(result.message);
				} else {
					setTotalCountPessoas(result.totalCount);
				}
			});
	}, []);

	return (
		<LayoutBasePage title='Página Inicial' barraDeFerramentas={(<FerramentasDeDetalhe mostrarBotaoNovo={false} />)} >
			<Box width="100%" display="flex">
				<Grid container margin={2}>
					<Grid container item spacing={2}>
						<Grid item xs={12} sm={12} md={6} lg={4} xl={3} >
							<Card>
								<CardContent>
									<Typography variant='h5' align='center'>
										Total de pessoas
									</Typography>

									<Box padding={6} display='flex' justifyContent='center' alignItems='center'>
										{!isLoadingPessoas && (
											<Typography variant='h2' >
												{totalCountPessoas}
											</Typography>
										)}

										{isLoadingPessoas && (
											<Typography variant='h6' >
												Carregando...
											</Typography>
										)}
									</Box>
								</CardContent>
							</Card>
						</Grid>

						<Grid item xs={12} sm={12} md={6} lg={4} xl={3} >
							<Card>
								<CardContent>
									<Typography variant='h5' align='center'>
										Total de cidades
									</Typography>

									<Box padding={6} display='flex' justifyContent='center' alignItems='center'>
										{!isLoadingCidades && (
											<Typography variant='h2' >
												{totalCountCidades}
											</Typography>
										)}

										{isLoadingCidades && (
											<Typography variant='h6' >
												Carregando...
											</Typography>
										)}
									</Box>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</LayoutBasePage>
	);
};