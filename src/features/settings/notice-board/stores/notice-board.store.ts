import { makeObservable, action, observable, computed } from 'mobx';
import { NoticeBoardService } from '../services';
import { NoticeBoard } from '../models';

export class NoticeBoardStore {
  noticeBoard!: NoticeBoard;
  noticeBoardList: NoticeBoard[];
  noticeBoardListCount: number;

  constructor() {
    this.noticeBoardList = [];
    this.noticeBoardListCount = 0;
    this.noticeBoard = new NoticeBoard({});
    this.reset();
    makeObservable<NoticeBoardStore, any>(this, {
      noticeBoard: observable,
      noticeBoardList: observable,
      noticeBoardListCount: observable,

      NoticeBoardService: computed,
      fetchNoticeBoards: action,
      updateNoticeBoardsList: action,
      updateNoticeBoard: action,
      reset: action,
    });
  }

  reset() {
    this.noticeBoard = new NoticeBoard({});
    this.noticeBoardList = [];
    this.noticeBoardListCount = 0;
  }

  get NoticeBoardService() {
    return new NoticeBoardService();
  }

  fetchNoticeBoards(page?, limit?) {
    this.NoticeBoardService.noticeBoardsList(page, limit);
  }

  updateNoticeBoardsList(res: any) {
    if (!res.noticeBoards.success) return console.log(res.noticeBoards.message);
    this.noticeBoardList = res.noticeBoards.data;
    this.noticeBoardListCount = res.noticeBoards.paginatorInfo.count;
  }

  filterNoticeBoardsList(res: any) {
    this.noticeBoardList = res.filterNoticeBoard.data;
    this.noticeBoardListCount = res.filterNoticeBoard.paginatorInfo.count;
  }

  // notice board
  updateNoticeBoard(notice: NoticeBoard) {
    this.noticeBoard = notice;
  }
}
