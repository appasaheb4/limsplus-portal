import { makeObservable, action, observable, computed } from 'mobx';
import dayjs from 'dayjs';
import { SalesTeam } from '../models';
import { SalesTeamService } from '../services';

export class SalesTeamStore {
  listSalesTeam!: SalesTeam[];
  listSalesTeamCopy!: SalesTeam[];
  salesTeam!: SalesTeam;
  listSalesTeamCount = 0;
  checkExistsRecord?: boolean = false;

  constructor() {
    this.listSalesTeam = [];
    this.reset();
    makeObservable<SalesTeamStore, any>(this, {
      listSalesTeam: observable,
      salesTeam: observable,
      listSalesTeamCount: observable,
      checkExistsRecord: observable,

      salesTeamService: computed,
      fetchSalesTeam: action,
      updateSalesTeamList: action,
      updateSalesTeam: action,
      updateExistsRecord: action,
      filterSalesTeamList: action,
      reset: action,
    });
  }

  reset() {
    this.salesTeam = new SalesTeam({});
    this.listSalesTeam = [];
    this.listSalesTeamCount = 0;
    this.salesTeam = new SalesTeam({
      ...this.salesTeam,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(
        dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
      ),
      version: 1,
    });
  }

  get salesTeamService() {
    return new SalesTeamService();
  }

  fetchSalesTeam(page?, limit?) {
    this.salesTeamService.listSalesTeam(page, limit);
  }

  updateSalesTeamList(res: any) {
    if (!Array.isArray(res)) {
      if (!res.salesTeams.success) return alert(res.salesTeams.message);
      this.listSalesTeam = res.salesTeams.data;
      this.listSalesTeamCopy = res.salesTeams.data;
      this.listSalesTeamCount = res.salesTeams.paginatorInfo.count;
    } else {
      this.listSalesTeam = res;
    }
  }

  filterSalesTeamList(res: any) {
    this.listSalesTeam = res.filterSalesTeams.data;
    this.listSalesTeamCount = res.filterSalesTeams.paginatorInfo.count;
  }

  updateSalesTeam(team: SalesTeam) {
    console.log({ team });

    this.salesTeam = team;
  }

  updateExistsRecord(status: boolean) {
    this.checkExistsRecord = status;
  }
}
