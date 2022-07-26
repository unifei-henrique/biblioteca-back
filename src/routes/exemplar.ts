import express, { Request, Response } from "express";
import controllers from "../controllers/controllers";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { ISBN, numero, preco } = req.body;

    const response = await controllers.exemplar.createExemplar({
      ISBN,
      numero,
      preco,
    });

    return res.status(response.status).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: 500,
      message: "Erro ao criar exemplar",
    });
  }
});

router.get("/publicacao/:ISBN", async (req: Request, res: Response) => {
  try {
    const { ISBN } = req.params;

    const response = await controllers.exemplar.getAllFromPublicacao({
      ISBN,
    });

    return res.status(response.status).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: 500,
      message: "Erro ao criar exemplar",
    });
  }
});

export default router;
