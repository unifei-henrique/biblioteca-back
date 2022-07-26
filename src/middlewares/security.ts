import { NextFunction, Request, Response } from "express";
import jwt, { IJWTDecodedData } from "../services/jwt.service";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (
      req.url.includes("/login/associado") ||
      req.url.includes("/login/funcionario")
    )
      return next();
    if (jwtVerify(req)) {
      const bearerToken = req.headers.authorization as string;
      const decoded = jwt.decrypt(bearerToken) as IJWTDecodedData;

      req.headers["x-id-associado"] = `${decoded.id_associado}`;

      return next();
    }
  } catch (err) {
    return res.sendStatus(401);
  }
};

const jwtVerify = (req: Request): boolean => {
  const bearerToken = req.headers.authorization
    ? req.headers.authorization
    : "";

  try {
    if (!bearerToken) {
      throw new Error(
        "Token não informado. Por favor, informe o token no cabeçalho da requisição."
      );
    }

    const decoded = jwt.decrypt(bearerToken) as IJWTDecodedData;

    if (Date.now() >= decoded.exp * 1000) {
      throw new Error("Falha na autenticação, por favor renove seu token.");
    }

    return true;
  } catch (err) {
    throw new Error("Falha na autenticação, por favor renove seu token.");
  }
};
