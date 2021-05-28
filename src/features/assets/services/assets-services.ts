/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
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

  uploadImage = (deatils: any) =>
    new Promise<any>((resolve, reject) => {
      const formData = new FormData()
      formData.append("id", deatils.id)
      formData.append("file", deatils.image)
      formData.append("folder", deatils.folder)
      formData.append("name", deatils.image.name)
      formData.append(
        "image",
        `https://limsplus.blob.core.windows.net/${deatils.folder}/${deatils.image.name}`
      )
      this.client
        .post(`/auth/uploadImage`, formData, {
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
    })
}

export default AssetsService
