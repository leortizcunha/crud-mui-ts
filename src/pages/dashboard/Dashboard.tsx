import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';

export const Dashboard = () => {

	return (

		<LayoutBasePage title='Página Inicial' barraDeFerramentas={(<FerramentasDaListagem mostrarInputBusca />)} >
            Teste2
		</LayoutBasePage>
	);
};