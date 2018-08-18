import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { differenceInDays } from 'date-fns';
import { clientId } from '../config';
import { dateAsString } from './utils';

export default class TimesheetAPI extends RESTDataSource {
  public baseURL =
    'https://ubw.unit4cloud.com/se_kno_prod_web/api/pcb/timesheet/';

  public async balance() {
    const result = await this.get(`balance-summary/${clientId}/ALB`);
    const flexTime = result.find(b => b.name === 'Flex').numberOfObjects;
    const vacationTime = result.find(b => b.name === 'Ferie').numberOfObjects;

    return {
      flex: flexTime,
      vacation: vacationTime
    };
  }

  public async getCurrentSheet() {
    // Eg: 08-18-2018
    const dateStr = dateAsString();
    // I think this endpoint returns an array of the sheets inside the time period?
    const result: Array<Timesheet> = await this.get(
      `periods/${clientId}/ALB/TS/${dateStr}/${dateStr}`
    );

    return result.map(sheet => {
      sheet.id = sheet.regPeriod;
      return sheet;
    })[0];
  }

  /**
   * Absence time codes such as FOD100 - "Fødselspermisjon 100%"
   */
  public async getTimeCodes() {
    const result: { rows: Array<TimeCode> } = await this.get(
      'timecodes/320/withglanalysis/ALB/2018-08-13/2018-08-19'
    );

    return result.rows.map((timecode: TimeCode) => {
      timecode.id = timecode.value;
      return timecode;
    });
  }

  /**
   * Time codes such as OVF50 - "Faktuerbar overtid 50%"
   */
  public async getTimeCodeThingy() {
    const result: { rows: Array<TimeCode> } = await this.get(
      `timecodes/${clientId}/withoutglanalysis/ALB/2018-08-13/2018-08-19`
    );

    return result.rows.map((timecode: TimeCode) => {
      timecode.id = timecode.value;
      return timecode;
    });
  }

  public async getDetails(fromDate: string, toDate: string) {
    const dateStr = dateAsString(fromDate);

    const result: { data: { details: Array<Detail> } } = await this.get(
      `timesheets/${clientId}/ALB/${dateStr}`
    );

    const daysInSheet = Math.abs(differenceInDays(fromDate, toDate)) + 1;

    return result.data.details.map(detail => {
      // I have no fucking clue if the value here is actually an unique id
      detail.id = detail.tseGlDetailId;

      detail.project = {
        id: detail.project,
        description: detail.projectDescr
      };

      detail.workOrder = {
        id: detail.workOrder,
        description: detail.workOrderDescr
      };

      detail.values = Array.from(
        new Array(daysInSheet),
        (val, index) => detail[`regValue${index + 1}`]
      );

      return detail;
    });
  }

  protected willSendRequest(request: RequestOptions) {
    request.headers.set('Cookie', `.ASPXAUTH=${this.context.auth}`);
  }
}

interface TimeCode {
  value: string;
  description: string;
}

interface Balance {
  name: string;
  numberOfObjects: number;
}

interface Timesheet {
  regPeriod: number;
  dateFrom: string;
  dateTo: string;
  status: 'P' | 'T' | 'NEW'; // P is open, T is completed?
}

interface Detail {
  // Project id
  project: string;
  projectDescr: string; // Eg. NDLA - GDL Hoveprosjekt

  tseGlDetailId: number;

  // Workorder id
  workOrder: string;
  workOrderDesc: string; // Eg. GDL Hoveprosjekt

  // ID of the timesheet I think
  regPeriod: number;

  // Description field
  description: string; // Eg. "Søke i alle språk #406"

  sum: number;

  regValue1: number;
  regValue2: number;
  regValue3: number;
  regValue4: number;
  regValue5: number;
  regValue6: number;
  regValue7: number;
  regValue8: number;
  // ... all the way down to 31 at least?
}
