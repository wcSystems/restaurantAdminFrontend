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

export async function getUsers(req: Request, res: Response): Promise<any> {
  try {
    const token = req.headers.authorization;
    axios.defaults.headers.common['Authorization'] = token;

    const response = await axios.get(urlApi + "users");
    const { data } = response;
    return res.json({
      error: 0,
      message: "User List successful",
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

export async function userId(req: Request, res: Response): Promise<any> {
    try {
      const token = req.headers.authorization;
      axios.defaults.headers.common['Authorization'] = token;
      console.log(req.body);
      const response = await axios.get(urlApi + "users/" + req.params.id);
        console.log(req.body.id);
      const { data } = response;
      return res.json({
        error: 0,
        message: "User List successful",
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

export async function createUser(req: Request, res: Response): Promise<any> {
  
  try {
    const token = req.headers.authorization;
    axios.defaults.headers.common['Authorization'] = token;

    if (req.file == undefined){
      req.body.img_profile = 'uploads/img/users/default.jpg';
    }else {
        fs.rename(req.file.path, 'uploads/img/users/'+req.body.username+path.extname(req.file.originalname),
            function(err) { if ( err ) console.log('ERROR: ' + err); });
        req.body.img_profile = 'uploads/img/users/'+req.body.username+path.extname(req.file.originalname);
    }

    const response = await axios.post(urlApi + "users", req.body);
    const { data } = response;
    return res.json({
      error: 0,
      message: "User Created successful",
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

export async function updateUser(req: Request, res: Response): Promise<any> {
  try {
    const token = req.headers.authorization;
    axios.defaults.headers.common['Authorization'] = token;

    if (req.file == undefined){
      if ((req.body.img_profile === null) || (req.body.img_profile === '')) {
        req.body.img_profile = 'uploads/img/users/default.jpg';
      }      
    }else {
        fs.rename(req.file.path, 'uploads/img/users/'+req.body.username+path.extname(req.file.originalname),
            function(err) { if ( err ) console.log('ERROR: ' + err); });
        req.body.img_profile = 'uploads/img/users/'+req.body.username+path.extname(req.file.originalname);
    }

    const response = await axios.put(urlApi + "users", req.body);
    const { data } = response;
    return res.json({
      error: 0,
      message: "User Update successful",
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

export async function deleteUser(req: Request, res: Response): Promise<any> {
    try {
        const token = req.headers.authorization;
        axios.defaults.headers.common['Authorization'] = token;

        const response = await axios.patch(urlApi + "users/" + req.params.id);
        const { data } = response;
        return res.json({
          error: 0,
          message: "User Delete successful",
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

export async function userLogin(req: Request, res: Response): Promise<any> {
  try {
    const response = await axios.post(urlApi + "users/login", req.body);
    const { data } = response;
    return res.json({
      error: 0,
      message: "Login successful",
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

export function userLogout(req: Request, res: Response): Response {
  return res.json({
    message: "Lists Users"
  });
}
