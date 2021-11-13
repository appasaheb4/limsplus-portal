import { version, ignore } from "mobx-sync"
import { makeObservable, action, observable, computed } from "mobx"
import * as Services from "../services"
import * as Models from "../models"
@version(0.1)
export class NoticeBoardStore {
  @ignore @observable noticeBoard!: Models.NoticeBoard
  @observable noticeBoardList: Models.NoticeBoard[]
  @observable noticeBoardListCount: number

  constructor() {
    this.noticeBoardList = []
    this.noticeBoardListCount = 0
    makeObservable<NoticeBoardStore, any>(this, {
      noticeBoard: observable,
      noticeBoardList: observable,
      noticeBoardListCount: observable,
    })
  }

  @computed get NoticeBoardService() {
    return new Services.NoticeBoardService()
  }

  @action fetchNoticeBoards(page?, limit?) {
    this.NoticeBoardService.noticeBoardsList(page, limit)
  }

  @action updateNoticeBoardsList(res: any) {
    if (!res.noticeBoards.success) return alert(res.noticeBoards.message)
    this.noticeBoardList = res.noticeBoards.data
    this.noticeBoardListCount = res.noticeBoards.paginatorInfo.count
  }

  // notice board
  @action updateNoticeBoard(notice: Models.NoticeBoard) {
    this.noticeBoard = notice
  }
}
