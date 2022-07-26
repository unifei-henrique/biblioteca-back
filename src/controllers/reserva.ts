import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export enum ReservaStatus {
  Iniciado = "Iniciado",
  Avisado = "Avisado",
  Anulado = "Anulado",
}

export interface ICreateReserva {
  ISBN: string;
  associadoId: string;
}

const createReserva = async (params: ICreateReserva) => {
  const { ISBN, associadoId } = params;
  const created = await prisma.rESERVA.create({
    data: {
      ISBN,
      Codigo_Assoc: Number(associadoId),
      Data: new Date(),
      Status: ReservaStatus["Iniciado"],
    },
  });
  if (!created) {
    throw new Error("Erro ao criar reserva");
  }

  return {
    status: 201,
    message: "Reserva criada com sucesso",
  };
};

export default {
  createReserva,
};
