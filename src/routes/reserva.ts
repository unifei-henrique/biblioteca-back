import express, { Request, Response } from "express";
import controllers from "../controllers/controllers";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { ISBN, associadoId } = req.body;

    const response = await controllers.reserva.createReserva({
      associadoId,
      ISBN,
    });

    return res.status(response.status).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: 500,
      message: "Erro ao reservar",
    });
  }
});

export default router;
