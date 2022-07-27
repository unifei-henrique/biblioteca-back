import express, { Request, Response } from 'express';
import controllers from '../controllers/controllers';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
	try {
		const { email, endereco, nome, status } = req.body;

		const response = await controllers.associado.createAssociado({
			email,
			endereco,
			nome,
			status,
		});

		return res.status(response.status).send(response);
	} catch (err) {
		console.log(err);
		return res.status(500).send({
			status: 500,
			message: 'Erro ao criar associado',
		});
	}
});

router.get('/', async (req: Request, res: Response) => {
	try {
		const response = await controllers.associado.getAllAssociados();

		return res.status(response.status).send(response);
	} catch (err) {
		console.log(err);
		return res.status(500).send({
			status: 500,
			message: 'Erro ao recuperar associados',
		});
	}
});

export default router;
