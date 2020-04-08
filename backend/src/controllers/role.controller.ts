import { Request, Response } from "express";
import { getError } from "../libs/handle.error";
import fs from "fs";
import path from "path";
import axios from "axios";

const urlApi = process.env.URL_API;

export interface data {
  token: string;
  token_type: string;
  expires_in: string;
}

export async function getRoles(req: Request, res: Response): Promise<any> {
  try {
    const token = req.headers.authorization;
    axios.defaults.headers.common['Authorization'] = token;

    const response = await axios.get(urlApi + "roles");
    const { data } = response;
    return res.json({
      error: 0,
      message: "Roles List successful",
      data
    });
  } catch (error) {
    getError(error);
    return res.json({
      error: 1,
      message: error.response.data
    });
  }
}
