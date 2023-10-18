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
      if (!res.EventLogs.success) return alert(res.EventLogs.message);
      this.eventLogsListCount = res.EventLogs.paginatorInfo.count;
      this.eventLogsList = res.EventLogs.data;
    } else {
      this.eventLogsList = res;
    }
  }
}
