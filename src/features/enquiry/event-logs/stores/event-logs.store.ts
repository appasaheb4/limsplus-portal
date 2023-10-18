import { makeObservable, action, observable, computed } from 'mobx';
import { EventLogs } from '../models';
import { EventLogsService } from '../services';

export class EventLogsStore {
  eventLogsList!: EventLogs[];
  eventLogsListCount: number = 0;

  constructor() {
    this.eventLogsList = [];
    makeObservable<EventLogsStore, any>(this, {
      eventLogsList: observable,
      eventLogsListCount: observable,

      eventLogsService: computed,
      updateEventLogsList: action,
    });
  }

  get eventLogsService() {
    return new EventLogsService();
  }

  updateEventLogsList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.eventLogs.success) return alert(res.eventLogs.message);
      this.eventLogsListCount = res.eventLogs.paginatorInfo.count;
      this.eventLogsList = res.eventLogs.data;
    } else {
      this.eventLogsList = res;
    }
  }
}
