import { Request, Response } from "express";
import { getError } from "../libs/handle.error";
import axios from "axios";

const urlApi = process.env.URL_API;
const table = 'order-types';

export interface data {
  token: string;
  token_type: string;
  expires_in: string;
}

export async function getOrderTypes(req: Request, res: Response): Promise<any> {
  try {
    const token = req.headers.authorization;
    axios.defaults.headers.common['Authorization'] = token;

    const response = await axios.get(urlApi + table);
    const { data } = response;
    return res.json({
      error: 0,
      message: "OrderTypes List successful",
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

export async function orderTypeId(req: Request, res: Response): Promise<any> {
    try {
      const token = req.headers.authorization;
      axios.defaults.headers.common['Authorization'] = token;
      console.log(req.body);
      const response = await axios.get(urlApi + table + "/" + req.params.id);
        console.log(req.body.id);
      const { data } = response;
      return res.json({
        error: 0,
        message: "OrderTypes List successful",
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

export async function createOrderType(req: Request, res: Response): Promise<any> {

  try {
    const token = req.headers.authorization;
    axios.defaults.headers.common['Authorization'] = token;

    const response = await axios.post(urlApi + table, req.body);
    const { data } = response;
    return res.json({
      error: 0,
      message: "OrderTypes Created successful",
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

export async function updateOrderType(req: Request, res: Response): Promise<any> {
  try {
    const token = req.headers.authorization;
    axios.defaults.headers.common['Authorization'] = token;

    const response = await axios.put(urlApi + table, req.body);
    const { data } = response;
    return res.json({
      error: 0,
      message: "OrderTypes Update successful",
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

export async function deleteOrderType(req: Request, res: Response): Promise<any> {
    try {
        const token = req.headers.authorization;
        axios.defaults.headers.common['Authorization'] = token;

        const response = await axios.delete(urlApi + table + "/" + req.params.id);
        const { data } = response;
        return res.json({
          error: 0,
          message: "OrderTypes Delete successful",
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
