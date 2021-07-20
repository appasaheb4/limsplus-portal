import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Services from "../services"
import * as Models from "../models"
import { Stores as LoginStores } from "@lp/features/login/stores"
@version(0.1)
class NoticeBoardStore {
  @ignore @observable noticeBoard?: Models.NoticeBoard
  @observable noticeBoardList?: Models.NoticeBoard[] = []

  constructor() {
    makeAutoObservable(this)
  }

  @computed get NoticeBoardService() {
    return new Services.NoticeBoardService(
    )
  }

  @action fetchNoticeBoards() {
    this.NoticeBoardService.noticeBoardsList().then((list) => {
      this.noticeBoardList = list
    })
  }

  // notice board
  @action updateNoticeBoard(notice: Models.NoticeBoard) {
    this.noticeBoard = notice
  }
}
export default NoticeBoardStore
