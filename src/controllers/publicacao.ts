import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface ICreateAssociado {
  ISBN: string;
  titulo: string;
  autor: string;
  editora: string;
}

const createPublicacao = async (params: ICreateAssociado) => {
  const { ISBN, autor, editora, titulo } = params;
  const created = await prisma.pUBLICACAO.create({
    data: {
      ISBN,
      Titulo: titulo,
      Autor: autor,
      Editora: editora,
    },
  });
  if (!created) {
    throw new Error("Erro ao criar publicação");
  }

  return {
    status: 201,
    message: "Publicação criado com sucesso",
  };
};

interface IGetPublicacoes {
  ISBN?: string;
  titulo?: string;
}

// Publicacao & {
//  exemplares: Array<Exemplar & { status: 'Emprestado' | 'Em estoque' }>;
// }

const getOnePublicacao = async ({ ISBN, titulo }: IGetPublicacoes) => {
  const where = {
    ...(ISBN && { ISBN }),
    ...(titulo && { Titulo: { contains: titulo } }),
  };

  const publicacao = await prisma.pUBLICACAO.findFirst({
    where,
    include: {
      EXEMPLAR: true,
    },
  });

  if (!publicacao) {
    throw new Error("Erro ao buscar publicação");
  }

  const emEstoque = await prisma.eMPRESTIMO.findMany({
    where: {
      ISBN: publicacao.ISBN,
      Data_Devol: null,
    },
  });

  const exemplaresComStatus = publicacao.EXEMPLAR.map((exemplar) => {
    const exemplarEmEstoque = emEstoque.find(
      ({ Nro_Exemplar }) => exemplar.Numero === Nro_Exemplar
    );

    const status = exemplarEmEstoque ? "Emprestado" : "Em estoque";

    return { ...exemplar, status };
  });

  const { EXEMPLAR, ...publicacaoSemEXEMPLAR } = publicacao;

  return {
    status: 200,
    message: "Publicações buscadas com sucesso",
    data: {
      ...publicacaoSemEXEMPLAR,
      exemplares: exemplaresComStatus,
    },
  };
};

const getPublicacoes = async () => {
  const publicacoes = await prisma.pUBLICACAO.findMany();

  return {
    status: 200,
    message: "Publicações buscadas com sucesso",
    data: publicacoes,
  };
};

export default {
  createPublicacao,
  getPublicacoes,
  getOnePublicacao,
};
