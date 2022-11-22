import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';

export const Dashboard = () => {

	return (

		<LayoutBasePage title='Página Inicial' barraDeFerramentas={(<FerramentasDeDetalhe mostrarBotaoSalvarEVoltar />)} >
            Teste2
		</LayoutBasePage>
	);
};