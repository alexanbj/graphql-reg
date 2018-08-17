import ubwAPI from './data/ubwAPI';
import UserAPI from './data/userAPI';
import TimesheetAPI from './data/timesheetAPI';

export interface Context {
  dataSources: {
    UBWAPI: ubwAPI;
    userAPI: UserAPI;
    timesheetAPI: TimesheetAPI;
  };
  auth?: string;
}
