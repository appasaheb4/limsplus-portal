/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
  
 import { http } from "@lp/library/modules/http"

export class AssetsService {
  uploadFile = (file: any, folder: string, name: string) =>
    new Promise<any>((resolve, reject) => {
      if (file) {
        const form = new FormData()
        form.append("file", file)
        form.append("folder", folder)
        form.append("fileName", name)
        http
          .post(`/assets/uploadFile`, form, {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          })  
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject({ error })
          })
      }
    })
}
