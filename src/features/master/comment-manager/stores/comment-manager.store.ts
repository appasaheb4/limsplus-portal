import {makeObservable, action, observable, computed} from 'mobx';
import {CommentManager} from '../models';
import {CommentManagerService} from '../services/comment-manager.service';
import dayjs from 'dayjs';

export class CommentManagerStore {
  commentManager!: CommentManager;
  commentManagerList!: CommentManager[];
  commentManagerCopy: CommentManager[];
  commentManagerListCount: number;

  constructor() {
    this.commentManagerList = [];
    this.commentManagerCopy = [];
    this.commentManagerListCount = 0;
    this.reset();
    makeObservable<CommentManagerStore, any>(this, {
      commentManager: observable,
      commentManagerList: observable,
      commentManagerCopy: observable,
      commentManagerListCount: observable,

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
    this.commentManagerListCount = 0;
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
      if (!res.commentManagers.success)
        return alert(res.commentManagers.message);
      this.commentManagerList = res.commentManagers.data;
      this.commentManagerCopy = res.commentManagers.data;
      this.commentManagerListCount = res.commentManagers.paginatorInfo.count;
    } else {
      this.commentManagerList = res;
    }
  }
}
