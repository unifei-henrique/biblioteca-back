import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export enum AssociadoStatus {
  Grad = "Grad",
  Posgrad = "Posgrad",
  Prof = "Prof",
}

export interface ICreateEmprestimo {
  ISBN: string;
  nro_exemplar: string;
  id_associado: string;
}

const createEmprestimo = async (params: ICreateEmprestimo) => {
  const { ISBN, id_associado, nro_exemplar } = params;
  const associado = await prisma.aSSOCIADO.findUnique({
    where: {
      Codigo: Number(id_associado),
    },
  });
  if (!associado) throw new Error("Erro ao criar associado");

  const created = await prisma.eMPRESTIMO.create({
    data: {
      ISBN,
      Data_Emp: new Date(),
      Nro_Exemplar: Number(nro_exemplar),
      Codigo_Assoc: Number(id_associado),
    },
  });
  if (!created) {
    throw new Error("Erro ao criar associado");
  }

  return {
    status: 201,
    message: "Associado criado com sucesso",
  };
};

export interface IDevolver {
  nro_exemplar: string;
}

const devolver = async (params: IDevolver) => {
  const { nro_exemplar } = params;

  const updated = await prisma.eMPRESTIMO.updateMany({
    data: {
      Data_Devol: new Date(),
    },
    where: {
      Nro_Exemplar: Number(nro_exemplar),
    },
  });
  if (!updated.count) {
    throw new Error("Erro ao devolver");
  }

  return {
    status: 201,
    message: "Devolvido com sucesso",
  };
};

interface IGetEmprestimo {
  id_associado: string;
}

const getEmprestimos = async (params: IGetEmprestimo) => {
  const { id_associado } = params;

  const emprestimos = await prisma.eMPRESTIMO.findMany({
    where: { Codigo_Assoc: Number(id_associado) },
  });
  if (!emprestimos.length) {
    throw new Error("Erro ao buscar emprestimos");
  }

  return {
    status: 200,
    message: "Emprestimos buscados com sucesso",
    data: emprestimos,
  };
};
export default {
  createEmprestimo,
  devolver,
  getEmprestimos,
};
