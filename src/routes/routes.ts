import express from "express";
import auth from "./auth";
import associado from "./associado";
import funcionario from "./funcionario";
import publicacao from "./publicacao";
import exemplar from "./exemplar";
import reserva from "./reserva";
import emprestimo from "./emprestimo";

const router = express.Router();

router.use("/login", auth);
router.use("/associado", associado);
router.use("/funcionario", funcionario);
router.use("/publicacao", publicacao);
router.use("/exemplar", exemplar);
router.use("/reserva", reserva);
router.use("/emprestimo", emprestimo);

export default router;
