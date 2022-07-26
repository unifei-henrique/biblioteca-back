import jwt from "../services/jwt.service";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface IloginFuncionario {
  codigo: number;
  senha: string;
}

export interface IloginAssociado {
  codigo: number;
  senha: string;
}

const loginFuncionario = async ({ codigo }: IloginFuncionario) => {
  const exists = await prisma.fUNCIONARIO.findFirst({
    where: {
      Codigo: codigo,
    },
  });
  if (!exists) {
    return {
      status: 404,
      token: "",
    };
  }

  const loginToken = jwt.generate({ codigo });

  return {
    status: 200,
    token: loginToken,
  };
};

const loginAssociado = async ({ codigo }: IloginAssociado) => {
  const exists = await prisma.aSSOCIADO.findFirst({
    where: {
      Codigo: codigo,
    },
  });

  if (!exists) {
    return {
      status: 404,
      token: "",
    };
  }

  const loginToken = jwt.generate({ codigo });

  return {
    status: 200,
    token: loginToken,
  };
};

export default {
  loginFuncionario,
  loginAssociado,
};
