import { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import * as yup from 'yup';

import { useAuthContext } from '../../contexts';

const loginSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required().min(5)
});

interface ILoginProps {
	children: React.ReactNode
}

export const Login: React.FC<ILoginProps> = ({ children }) => {

	const { isAuthenticated, login } = useAuthContext();

	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');

	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = () => {
		setIsLoading(true);

		loginSchema
			.validate({ email, password }, { abortEarly: false })
			.then((dadosValidados) => {
				login(dadosValidados.email, dadosValidados.password)
					.then(() => {
						setIsLoading(false);
					});
			})
			.catch((errors: yup.ValidationError) => {
				setIsLoading(false);

				errors.inner.forEach(error => {
					if (error.path === 'email') {
						setEmailError(error.message);
					} else if (error.path === 'password') {
						setPasswordError(error.message);
					}
				});
			});
	};

	if (isAuthenticated) return (
		<>{children}</>
	);

	return (
		<Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center' >

			<Card>
				<CardContent>
					<Box display='flex' flexDirection='column' gap={2} width={250} >
						<Typography variant='h6' align='center'>Identifique-se</Typography>

						<TextField
							fullWidth
							label='Email'
							type='email'
							error={!!emailError}
							helperText={emailError}
							value={email}
							disabled={isLoading}
							onChange={e => setEmail(e.target.value)}
							onKeyDown={() => setEmailError('')}
						/>

						<TextField
							fullWidth
							label='Senha'
							type='password'
							error={!!passwordError}
							helperText={passwordError}
							value={password}
							disabled={isLoading}
							onChange={e => setPassword(e.target.value)}
							onKeyDown={() => setPasswordError('')}
						/>
					</Box>
				</CardContent>

				<CardActions>
					<Box width='100%' display='flex' justifyContent='center' >

						<Button
							variant='contained'
							onClick={handleSubmit}
							disabled={isLoading}
							endIcon={isLoading ? <CircularProgress variant='indeterminate' size={20} color='inherit' /> : undefined}
						>
							Entrar
						</Button>

					</Box>
				</CardActions>
			</Card>

		</Box>
	);
};