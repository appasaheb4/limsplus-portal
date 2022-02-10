/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @author limsplus
 */
   
import { Http, http, ServiceResponse } from "@/library/modules/http"
    
export class AssetsService {
  uploadFile = (file: any, folder: string, name: string) =>
    new Promise<any>((resolve, reject) => {
      if (file) {
        console.log({file,folder,name});
        
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
          .then((response) => {
            const serviceResponse = Http.handleResponse<any>(response)
            resolve(serviceResponse)
          })
          .catch((error) => {
            reject(new ServiceResponse<any>(0, error.message, undefined))
          })
      }
    })
}
