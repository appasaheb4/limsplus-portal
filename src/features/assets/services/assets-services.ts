/**
 * @fileoverview Use this file invoke Memetoons API
 * implementation related to Memetoons standards
 * @package Feed Service
 * @author limsplus
 */

import BaseService from "@lp/library/modules/base-service"

class AssetsService extends BaseService {
  uploadFile = (file: any, folder: string, name: string) =>
    new Promise<any>((resolve, reject) => {
      if (file) {
        const form = new FormData()
        form.append("file", file)
        form.append("folder", folder)
        form.append("name", name)
        this.client
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

export default AssetsService
