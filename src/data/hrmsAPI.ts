import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';

import { clientId } from '../config';
import { dateAsString } from './utils';

export default class HRMSAPI extends RESTDataSource {
  public baseURL = 'https://ubw.unit4cloud.com/se_kno_prod_web/api/hrms/';

  public async getWorkSchedule(
    fromDate: string,
    toDate: string
  ): Promise<Array<WorkSchedule>> {
    const result: Array<APIWorkSchedule> = await this.get(
      `/workschedule/${clientId}/ALB/${dateAsString(fromDate)}/${dateAsString(
        toDate
      )}`
    );

    return result.map(workSchedule => {
      workSchedule.date = workSchedule.transDate;
      return workSchedule;
    });
  }

  protected willSendRequest(request: RequestOptions) {
    request.headers.set('Cookie', `.ASPXAUTH=${this.context.auth}`);
  }
}

interface APIWorkSchedule {
  publicHoliday: boolean;
  workingDay: boolean;
  normalHours: number;
  transDate: string;
}

interface WorkSchedule {
  publicHoliday: boolean;
  workingDay: boolean;
  normalHours: number;
  date: string;
}
