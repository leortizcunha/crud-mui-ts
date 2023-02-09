import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListagemCidade {
	id: number;
	nome: string;
}

export interface IDetalheCidade {
	id: number;
	nome: string;
}

type TCidadeTotalCount = {
	data: IListagemCidade[];
	totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TCidadeTotalCount | Error> => {
	try {
		const urlRelativa = `/cidades?_page=${page}&_limit=${Environment.LIMIT_DE_LINHAS}&nome_like=${filter}`;

		const { data, headers } = await Api.get(urlRelativa);

		if (data) {
			return {
				data,
				totalCount: Number(headers['x-total-count'] || Environment.LIMIT_DE_LINHAS),
			};
		}

		return new Error('Erro ao consultar os registros.');

	} catch (error) {
		console.error(error);

		return new Error((error as { message: string }).message || 'Erro ao consultar os registros.');
	}
};

const getById = async (id: number): Promise<IDetalheCidade | Error> => {
	try {

		const { data } = await Api.get(`/cidades/${id}`);

		if (data) {
			return data;
		}

		return new Error('Erro ao consultar o registro.');

	} catch (error) {
		console.error(error);

		return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
	}
};

const create = async (dados: Omit<IDetalheCidade, 'id'>): Promise<number | Error> => {
	try {

		const { data } = await Api.post<IDetalheCidade>('/cidades', dados);

		if (data) {
			return data.id;
		}

		return new Error('Erro ao criar o registro.');

	} catch (error) {
		console.error(error);

		return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
	}
};

const updateById = async (id: number, dados: IDetalheCidade): Promise<void | Error> => {
	try {
		await Api.put(`/cidades/${id}`, dados);
	} catch (error) {
		console.error(error);

		return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
	}
};

const deleteById = async (id: number): Promise<void | Error> => {
	try {
		await Api.delete(`/cidades/${id}`);
	} catch (error) {
		console.error(error);

		return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
	}
};

export const CidadesService = {
	getAll,
	getById,
	create,
	updateById,
	deleteById,
};