import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export enum FuncionarioFuncao {
  funcionario = "funcionario",
  gerente = "gerente",
}

export interface ICreateAssociado {
  nome: string;
  email: string;
  funcao: FuncionarioFuncao;
}

const createFuncionario = async (params: ICreateAssociado) => {
  const { email, funcao, nome } = params;
  const created = await prisma.fUNCIONARIO.create({
    data: {
      Email: email,
      Funcao: funcao,
      Nome: nome,
    },
  });
  if (!created) {
    throw new Error("Erro ao criar funcionario");
  }

  return {
    status: 201,
    message: "Funcionario criado com sucesso",
  };
};

export default {
  createFuncionario,
};
