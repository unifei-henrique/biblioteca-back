import express, { Request, Response } from "express";
import controllers from "../controllers/controllers";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { autor, editora, ISBN, titulo } = req.body;

    const response = await controllers.publicacao.createPublicacao({
      autor,
      editora,
      ISBN,
      titulo,
    });

    return res.status(response.status).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: 500,
      message: "Erro ao criar publicação",
    });
  }
});

router.get("/getOne", async (req: Request, res: Response) => {
  try {
    const { ISBN, titulo } = req.query;
    const response = await controllers.publicacao.getOnePublicacao({
      ISBN: ISBN as string,
      titulo: titulo as string,
    });

    return res.status(response.status).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: 500,
      message: "Erro ao criar publicação",
    });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const response = await controllers.publicacao.getPublicacoes();

    return res.status(response.status).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: 500,
      message: "Erro ao criar publicação",
    });
  }
});

export default router;
