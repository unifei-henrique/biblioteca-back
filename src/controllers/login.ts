import jwt from "../services/jwt.service";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface IloginFuncionario {
  nome: string;
  senha: string;
}

export interface IloginAssociado {
  nome: string;
  senha: string;
}

const loginFuncionario = async ({ nome }: IloginFuncionario) => {
  const exists = await prisma.fUNCIONARIO.findFirst({
    where: {
      Nome: nome,
    },
  });
  if (!exists) {
    return {
      status: 404,
      token: "",
    };
  }

  const loginToken = jwt.generate({ nome });

  return {
    status: 200,
    token: loginToken,
  };
};

const loginAssociado = async ({ nome }: IloginAssociado) => {
  const exists = await prisma.aSSOCIADO.findFirst({
    where: {
      Nome: nome,
    },
  });

  if (!exists) {
    return {
      status: 404,
      token: "",
    };
  }

  const loginToken = jwt.generate({ nome });

  return {
    status: 200,
    token: loginToken,
  };
};

export default {
  loginFuncionario,
  loginAssociado,
};
