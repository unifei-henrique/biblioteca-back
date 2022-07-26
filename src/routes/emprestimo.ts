import express, { Request, Response } from "express";
import controllers from "../controllers/controllers";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { ISBN, nro_exemplar } = req.body;
    const id_associado = req.headers["x-id-associado"] as string;

    const response = await controllers.emprestimo.createEmprestimo({
      id_associado,
      ISBN,
      nro_exemplar,
    });

    return res.status(response.status).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: 500,
      message: "Erro ao criar emprestimo",
    });
  }
});

router.patch("/devolver", async (req: Request, res: Response) => {
  try {
    const { ISBN, nro_exemplar } = req.body;
    const id_associado = req.headers["x-id-associado"] as string;

    const response = await controllers.emprestimo.createEmprestimo({
      id_associado,
      ISBN,
      nro_exemplar,
    });

    return res.status(response.status).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: 500,
      message: "Erro ao criar emprestimo",
    });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const id_associado = req.headers["x-id-associado"] as string;
    const response = await controllers.emprestimo.getEmprestimos({
      id_associado: id_associado as string,
    });

    return res.status(response.status).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: 500,
      message: "Erro ao recuperar emprestimo",
    });
  }
});

export default router;
