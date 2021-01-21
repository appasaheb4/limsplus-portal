import * as Clients from "@lp/library/clients";
import * as Models from "../models";

const RELATIVE_PATH = "/banner";

export const addBanner = (banner: any) =>
  new Promise<any>((resolve, reject) => {
    const form = new FormData();
    form.append("title", banner.title);
    form.append("file", banner.image);
    form.append("folder", "banner");
    form.append("name", banner.image.name);
    form.append(
      "image",
      `https://limsplus.blob.core.windows.net/banner/${banner.image.name}`
    );
    const client = Clients.createLimsPlusClient();
    client
      .post(`${RELATIVE_PATH}/addBanner`, form, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        resolve(res as Models.IBanner);
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
        console.log({ banner: res });

        resolve(res.data.data);
      })
      .catch((error) => {
        reject({ error });
      });
  });
export const deleteBanner = (id: string) =>
  new Promise<Models.IBanner[]>((resolve, reject) => {
    const client = Clients.createLimsPlusClient();
    client
      .delete(`${RELATIVE_PATH}/deleteBanner/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject({ error });
      });
  });
