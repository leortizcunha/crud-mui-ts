import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FerramentasDaListagem } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutBasePage } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

export const ListagemPessoa: React.FC = () => {

	const [searchParams, setSearchParams] = useSearchParams();

	const { debounce } = useDebounce();

	const busca = useMemo(() => {
		return searchParams.get('busca') || '';
	}, [searchParams]);

	useEffect(() => {

		debounce(() => {
			PessoasService.getAll(1, busca)
				.then((result) => {
					if (result instanceof Error) {
						alert(result.message);
					} else {
						console.log(result);
					}
				});
		});
	}, [busca]);

	return (
		<LayoutBasePage
			title='Listagem de Pessoas'
			barraDeFerramentas={
				<FerramentasDaListagem
					mostrarInputBusca
					textoBotaoNovo='Nova'
					textoDaBusca={busca}
					aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
				/>
			}
		>

		</LayoutBasePage>
	);
};