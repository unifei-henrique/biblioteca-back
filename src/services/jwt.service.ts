import { decode, sign } from "jsonwebtoken";

export interface IJWTDecodedData {
  exp: number;
  id_associado: number;
}

const generate = (params = {}, timeExpire = "3h"): string => {
  if (!process.env["SALT"])
    throw new Error('Env variable "SALT" is not defined');

  return sign(
    {
      ...params,
    },
    process.env["SALT"],
    { expiresIn: timeExpire }
  );
};

const decrypt = (bearerToken: string): IJWTDecodedData => {
  try {
    const token = bearerToken.replace("Bearer ", "").trim();

    return decode(token) as IJWTDecodedData;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const validateExpToken = (bearerToken: string | undefined): boolean => {
  if (!process.env["SALT"]) {
    throw new Error("SALT is not defined");
  }

  if (!bearerToken) {
    return false;
  }

  const decoded = decrypt(bearerToken) as IJWTDecodedData;

  if (Date.now() >= decoded.exp * 1000) {
    return false;
  }
  return true;
};

export default { validateExpToken, generate, decrypt };
