/**
 * @fileoverview Use this file invoke Memetoons API
 * implementation related to Memetoons standards
 * @package Feed Service
 * @author limsplus
 */
//import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class CommunicationService extends BaseService {
  deleteSegmentMapping = (id: string[]) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .delete(`communication/deleteSegmentMapping/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  addSegmentMapping = (segments: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`communication/addSegmentMapping`, segments)
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
  listSegmentMapping = () =>
    new Promise<any>((resolve, reject) => {
      this.client
        .get(`communication/listSegmentMapping`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default CommunicationService
