/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { http } from "@lp/library/modules/http"

class NoticeBoardService  {
  noticeBoardsList = () =>
    new Promise<Models.NoticeBoard[]>((resolve, reject) => {
      http
        .get(`/settings/noticeBoards/listNoticeBoards`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addNoticeBoard = (notice: Models.NoticeBoard) =>
    new Promise<any>((resolve, reject) => {
      http
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
      http
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
      http
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
