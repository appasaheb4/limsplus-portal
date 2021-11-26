import { makeObservable, action, observable, computed } from "mobx"
import * as Services from "../services"
import * as Models from "../models"

export class NoticeBoardStore {
  noticeBoard!: Models.NoticeBoard
  noticeBoardList: Models.NoticeBoard[]
  noticeBoardListCount: number

  constructor() {
    this.noticeBoardList = []
    this.noticeBoardListCount = 0
    makeObservable<NoticeBoardStore, any>(this, {
      noticeBoard: observable,
      noticeBoardList: observable,
      noticeBoardListCount: observable,

      NoticeBoardService: computed,
      fetchNoticeBoards: action,
      updateNoticeBoardsList: action,
      updateNoticeBoard: action,
    })
  }

  get NoticeBoardService() {
    return new Services.NoticeBoardService()
  }

  fetchNoticeBoards(page?, limit?) {
    this.NoticeBoardService.noticeBoardsList(page, limit)
  }

  updateNoticeBoardsList(res: any) {
    if (!res.noticeBoards.success) return alert(res.noticeBoards.message)
    this.noticeBoardList = res.noticeBoards.data
    this.noticeBoardListCount = res.noticeBoards.paginatorInfo.count
  }
     
  filterNoticeBoardsList(res: any) {
    this.noticeBoardList = res.filterNoticeBoard.data
    this.noticeBoardListCount = res.filterNoticeBoard.paginatorInfo.count
  }

  // notice board
  updateNoticeBoard(notice: Models.NoticeBoard) {
    this.noticeBoard = notice
  }
}
