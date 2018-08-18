import { Context } from './types';

export const resolvers = {
  Query: {
    async worktasks(_: any, __: any, { dataSources }: Context) {
      return dataSources.UBWAPI.worktasks();
    },

    async balance(_: any, __: any, { dataSources }: Context) {
      return dataSources.timesheetAPI.balance();
    },

    async timecodes(_: any, __: any, { dataSources }: Context) {
      return dataSources.timesheetAPI.getTimeCodes();
    },

    async currentSheet(_: any, __: any, { dataSources }: Context) {
      return dataSources.timesheetAPI.getCurrentSheet();
    },

    /*async details(_: any, __: any, { dataSources }: Context) {
      return dataSources.timesheetAPI.getDetails();
    },*/

    async currentUser(_: any, __: any, { dataSources }: Context) {
      return dataSources.userAPI.currentUser();
    }
  },

  Timesheet: {
    async details(source: any, __: any, { dataSources }: Context) {
      return dataSources.timesheetAPI.getDetails(
        source.dateFrom,
        source.dateTo
      );
    },
    async workSchedule(source: any, __: any, { dataSources }: Context) {
      return dataSources.HRMSAPI.getWorkSchedule(
        source.dateFrom,
        source.dateTo
      );
    }
  }
};
