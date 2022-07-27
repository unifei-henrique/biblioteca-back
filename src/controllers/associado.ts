import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export enum AssociadoStatus {
	Grad = 'Grad',
	Posgrad = 'Posgrad',
	Prof = 'Prof',
}

export interface ICreateAssociado {
	nome: string;
	email: string;
	endereco: string;
	status: AssociadoStatus;
}

const getTempoDevolucao = (status: AssociadoStatus) => {
	switch (status) {
		case AssociadoStatus.Grad:
			return 7;
		case AssociadoStatus.Posgrad:
			return 10;
		case AssociadoStatus.Prof:
			return 14;
	}
};

const getAllAssociados = async () => {
	const associados = await prisma.aSSOCIADO.findMany();

	return {
		status: 200,
		message: 'Exemplares encontrados com sucesso',
		data: associados,
	};
};

const createAssociado = async (params: ICreateAssociado) => {
	const { email, endereco, nome, status } = params;
	const created = await prisma.aSSOCIADO.create({
		data: {
			Email: email,
			Endereco: endereco,
			Nome: nome,
			Status: status,
		},
	});
	if (!created) {
		throw new Error('Erro ao criar associado');
	}

	return {
		status: 201,
		message: 'Associado criado com sucesso',
	};
};

export default {
	createAssociado,
	getTempoDevolucao,
  getAllAssociados,
};
