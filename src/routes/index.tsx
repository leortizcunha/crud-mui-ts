
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';

import {
	Dashboard,
	DetalhePessoa,
	ListagemPessoa,
} from '../pages';

export const AppRoutes = () => {

	const { setDrawerOptions } = useDrawerContext();

	useEffect(() => {
		setDrawerOptions([
			{
				label: 'Inicio',
				icon: 'home',
				path: '/pagina-inicial'
			},
			{
				label:'Pessoas',
				icon: 'people',
				path: '/pessoas'
			},
			{
				label: 'Cidades',
				icon: 'location_city',
				path: '/cidades'
			}
		]);
	}, []);

	return (
		<Routes>
			<Route path='/pagina-inicial' element={<Dashboard />} />

			<Route path='/pessoas' element={<ListagemPessoa />} />
			<Route path='/pessoas/detalhe/:id' element={<DetalhePessoa />} />

			<Route path='cidades' element={'cidade'}/>

			<Route path='*' element={<Navigate to='/pagina-inicial' />} />
		</Routes>
	);
};