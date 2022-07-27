import express, { Request, Response } from "express";
import controllers from "../controllers/controllers";

const router = express.Router();

router.post("/funcionario", async (req: Request, res: Response) => {
  try {
    const { nome, senha } = req.body;

    const response = await controllers.login.loginFuncionario({
      nome,
      senha,
    });

    return res.status(response.status).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: 500,
      message: "Erro ao logar funcionário",
    });
  }
});

router.post("/associado", async (req: Request, res: Response) => {
  try {
    const { nome, senha } = req.body;

    const response = await controllers.login.loginAssociado({
      nome,
      senha,
    });

    return res.status(response.status).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: 500,
      message: "Erro ao logar associado",
    });
  }
});

export default router;
