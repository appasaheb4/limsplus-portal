/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import {  Http, http, ServiceResponse } from "@lp/library/modules/http"

class NoticeBoardService  {
  noticeBoardsList = (page=0,limit=10) =>
    new Promise<any>((resolve, reject) => {
      http
        .get(`/settings/noticeBoards/listNoticeBoards/${page}/${limit}`)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
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
