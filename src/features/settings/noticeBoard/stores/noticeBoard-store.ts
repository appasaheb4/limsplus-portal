import { version, ignore } from "mobx-sync"
import { makeAutoObservable, action, observable, computed } from "mobx"
import * as Services from "../services"
import * as Models from "../models"
@version(0.1)
class NoticeBoardStore {
  @ignore @observable noticeBoard?: Models.NoticeBoard
  @observable noticeBoardList?: Models.NoticeBoard[] = []
  @observable noticeBoardListCount: number = 0 

  constructor() {
    makeAutoObservable(this)
  }

  @computed get NoticeBoardService() {
    return new Services.NoticeBoardService(
    )
  }

  @action fetchNoticeBoards(page?,limit?) {
    this.NoticeBoardService.noticeBoardsList(page,limit).then((res) => {
      if (!res.success) return alert(res.message)
      this.noticeBoardList = res.data.noticeBoard
      this.noticeBoardListCount = res.data.count

    })
  }

  // notice board
  @action updateNoticeBoard(notice: Models.NoticeBoard) {
    this.noticeBoard = notice
  }
}
export default NoticeBoardStore
