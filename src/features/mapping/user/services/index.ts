import * as Clients from "@lp/library/clients"
import * as Models from "../models"

const RELATIVE_PATH = "/banner"

export const addBanner = (banner: any) =>
  new Promise<any>((resolve, reject) => {
    const form = new FormData()
    form.append("title", banner.title)
    form.append("file", banner.image)
    form.append("folder", "banner")
    form.append("name", banner.image.name)
    form.append(
      "image",
      `https://limsplus.blob.core.windows.net/banner/${banner.image.name}`
    )
    const client = Clients.createLimsPlusClient()
    client
      .post(`${RELATIVE_PATH}/addBanner`, form, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        resolve(res as Models.User)
      })
      .catch((error) => {
        reject({ error })
      })
  })
