/**
 * @fileoverview Use this file invoke Memetoons API
 * implementation related to Memetoons standards
 * @package Feed Service
 * @author limsplus
 */
//import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class CommunicationService extends BaseService {
  deleteBanner = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .delete(`banner/deleteBanner/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  importSegmentMapping = (segments: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`communication/importSegmentMapping`, segments)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default CommunicationService
