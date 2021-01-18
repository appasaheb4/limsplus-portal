import * as Clients from "@lp/library/clients";
import { Form } from "react-bootstrap";
import * as Models from "../models";

const RELATIVE_PATH = "/banner";

export const addBanner = (banner: any) =>
  new Promise<any>((resolve, reject) => {
    const form = new FormData();
    form.append("title", banner.title);
    form.append("file", banner.imagePath);
    const client = Clients.createLimsPlusClient();
    client
      .post(`${RELATIVE_PATH}/addBanner`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        resolve(res.data.data as Models.IBanner);
      })
      .catch((error) => {
        reject({ error });
      });
  });

export const listBanner = () =>
  new Promise<Models.IBanner[]>((resolve, reject) => {
    const client = Clients.createLimsPlusClient();
    client
      .get(`${RELATIVE_PATH}/listBanner`)
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((error) => {
        reject({ error });
      });
  });
