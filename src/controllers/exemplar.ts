import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface ICreateExemplar {
  Preco: string;
  ISBN: string;
  Numero: string;
}

const createExemplar = async (params: ICreateExemplar) => {
  const { Preco, ISBN, Numero } = params;
  const created = await prisma.eXEMPLAR.create({
    data: {
      Numero: Number(Numero),
      Preco: Number(Preco),
      ISBN,
    },
  });
  if (!created) {
    throw new Error("Erro ao criar exemplar");
  }

  return {
    status: 201,
    message: "Exemplar criado com sucesso",
  };
};

const getAllFromPublicacao = async (params: { ISBN: string }) => {
  const { ISBN } = params;
  const exemplares = await prisma.eXEMPLAR.findMany({
    where: {
      ISBN,
    },
  });

  return {
    status: 200,
    message: "Exemplares encontrados com sucesso",
    data: exemplares,
  };
};

export default {
  createExemplar,
  getAllFromPublicacao,
};
