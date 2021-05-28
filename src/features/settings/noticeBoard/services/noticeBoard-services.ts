/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class NoticeBoardService extends BaseService {
  noticeBoardsList = () =>
    new Promise<Models.NoticeBoard[]>((resolve, reject) => {
      this.client
        .get(`/settings/noticeBoards/listNoticeBoards`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addNoticeBoard = (notice: Models.NoticeBoard) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/settings/noticeBoards/addNoticeBoards`, notice)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  deleteNoticeBoards = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .delete(`/settings/noticeBoards/deleteNoticeBoards/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  updateSingleFiled = (newValue: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/settings/noticeBoards/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default NoticeBoardService
