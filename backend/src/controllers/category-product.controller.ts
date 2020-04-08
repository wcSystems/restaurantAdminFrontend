import { Request, Response } from "express";
import { getError } from "../libs/handle.error";
import axios from "axios";

const urlApi = process.env.URL_API;
const table = 'category-products';

export interface data {
  token: string;
  token_type: string;
  expires_in: string;
}

export async function getCategoryProducts(req: Request, res: Response): Promise<any> {
  try {
    const token = req.headers.authorization;
    axios.defaults.headers.common['Authorization'] = token;

    const response = await axios.get(urlApi + table);
    const { data } = response;
    return res.json({
      error: 0,
      message: "CategoryProducts List successful",
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

export async function getSubCategoryProduct(req: Request, res: Response): Promise<any> {
    try {
      const token = req.headers.authorization;
      axios.defaults.headers.common['Authorization'] = token;

      const response = await axios.post(urlApi + table + '/sub_category', req.body);
      const { data } = response;
      return res.json({
        error: 0,
        message: "SubCategoryProducts List successful",
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

export async function categoryProductId(req: Request, res: Response): Promise<any> {
    try {
      const token = req.headers.authorization;
      axios.defaults.headers.common['Authorization'] = token;
      console.log(req.body);
      const response = await axios.get(urlApi + table + "/" + req.params.id);

      const { data } = response;
      return res.json({
        error: 0,
        message: "CategoryProduct List successful",
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

export async function createCategoryProduct(req: Request, res: Response): Promise<any> {

  try {
    const token = req.headers.authorization;
    axios.defaults.headers.common['Authorization'] = token;

    const response = await axios.post(urlApi + table, req.body);
    const { data } = response;
    return res.json({
      error: 0,
      message: "CategoryProduct Created successful",
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

export async function updateCategoryProduct(req: Request, res: Response): Promise<any> {
  try {
    const token = req.headers.authorization;
    axios.defaults.headers.common['Authorization'] = token;

    const response = await axios.put(urlApi + table, req.body);
    const { data } = response;
    return res.json({
      error: 0,
      message: "CategoryProduct Update successful",
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

export async function deleteCategoryProduct(req: Request, res: Response): Promise<any> {
    try {
        const token = req.headers.authorization;
        axios.defaults.headers.common['Authorization'] = token;

        const response = await axios.delete(urlApi + table + "/" + req.params.id);
        const { data } = response;
        return res.json({
          error: 0,
          message: "CategoryProduct Delete successful",
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

export async function getProductByCategory(req: Request, res: Response): Promise<any> {
    try {
      const token = req.headers.authorization;
      axios.defaults.headers.common['Authorization'] = token;

      const response = await axios.post(urlApi + table + '/products', req.body);
      const { data } = response;
      return res.json({
        error: 0,
        message: "Products List successful",
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
