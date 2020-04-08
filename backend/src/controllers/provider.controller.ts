import { Request, Response } from "express";
import { getError } from "../libs/handle.error";
import axios from "axios";

const urlApi = process.env.URL_API;
const table = 'providers';

export interface data {
  token: string;
  token_type: string;
  expires_in: string;
}

export async function getProviders(req: Request, res: Response): Promise<any> {
  try {
    const token = req.headers.authorization;
    axios.defaults.headers.common['Authorization'] = token;

    const response = await axios.get(urlApi + table);
    const { data } = response;
    return res.json({
      error: 0,
      message: "Providers List successful",
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

export async function providerId(req: Request, res: Response): Promise<any> {
    try {
      const token = req.headers.authorization;
      axios.defaults.headers.common['Authorization'] = token;
      console.log(req.body);
      const response = await axios.get(urlApi + table + "/" + req.params.id);
        console.log(req.body.id);
      const { data } = response;
      return res.json({
        error: 0,
        message: "Provider List successful",
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

export async function createProvider(req: Request, res: Response): Promise<any> {

  try {
    const token = req.headers.authorization;
    axios.defaults.headers.common['Authorization'] = token;

    const response = await axios.post(urlApi + table, req.body);
    const { data } = response;
    return res.json({
      error: 0,
      message: "Provider Created successful",
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

export async function updateProvider(req: Request, res: Response): Promise<any> {
  try {
    const token = req.headers.authorization;
    axios.defaults.headers.common['Authorization'] = token;

    const response = await axios.put(urlApi + table, req.body);
    const { data } = response;
    return res.json({
      error: 0,
      message: "Provider Update successful",
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

export async function deleteProvider(req: Request, res: Response): Promise<any> {
    try {
        const token = req.headers.authorization;
        axios.defaults.headers.common['Authorization'] = token;

        const response = await axios.delete(urlApi + table + "/" + req.params.id);
        const { data } = response;
        return res.json({
          error: 0,
          message: "Provider Delete successful",
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
