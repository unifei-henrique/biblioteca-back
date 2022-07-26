import cors from "cors";
import { config as dtoEnvConfig } from "dotenv";
import express from "express";
import helmet from "helmet";
import { checkToken } from "./middlewares/security";

dtoEnvConfig();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(checkToken);

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.listen(process.env["PORT"], () => {
  console.log("listening");
});

export default app;
