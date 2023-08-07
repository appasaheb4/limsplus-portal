import {makeObservable, action, observable, computed} from 'mobx';
import {CommentManager} from '../models';
import {CommentManagerService} from '../services/comment-manager.service';
import dayjs from 'dayjs';

export class CommentManagerStore {
  commentManager!: CommentManager;
  commentManagerList!: CommentManager[];
  commentManagerCopy: CommentManager[];
  commentManagerCount: number;

  constructor() {
    this.commentManagerList = [];
    this.commentManagerCopy = [];
    this.commentManagerCount = 0;
    this.reset();
    makeObservable<CommentManagerStore, any>(this, {
      commentManager: observable,
      commentManagerList: observable,
      commentManagerCopy: observable,
      commentManagerCount: observable,

      commentManagerService: computed,
      reset: action,
      updateCommentManagerList: action,
    });
  }

  get commentManagerService() {
    return new CommentManagerService();
  }

  reset() {
    this.commentManager = new CommentManager({});
    this.commentManagerList = [];
    this.commentManagerCount = 0;
    this.commentManager = {
      ...this.commentManager,
      lab: 'Default',
      department: 'Default',
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(
        dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD hh:mm:ss'),
      ),
      versions: 1,
    };
  }

  updateCommentManagerList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.librarys.success) return alert(res.librarys.message);
      this.commentManagerList = res.librarys.data;
      this.commentManagerCopy = res.librarys.data;
      this.commentManagerCount = res.librarys.paginatorInfo.count;
    } else {
      this.commentManagerList = res;
    }
  }
}
