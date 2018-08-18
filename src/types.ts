import ubwAPI from './data/ubwAPI';
import UserAPI from './data/userAPI';
import TimesheetAPI from './data/timesheetAPI';
import HRMSAPI from './data/hrmsAPI';

export interface Context {
  dataSources: {
    UBWAPI: ubwAPI;
    userAPI: UserAPI;
    timesheetAPI: TimesheetAPI;
    HRMSAPI: HRMSAPI;
  };
  auth?: string;
}
