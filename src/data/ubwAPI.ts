import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { clientId } from '../config';

export default class UBWAPI extends RESTDataSource {
  public baseURL =
    'https://ubw.unit4cloud.com/se_kno_prod_web/api/pcb/project/worktasks/valuelist/';

  public async worktasks() {
    const result = await this.get(`/${clientId}/ALB/2018-08-13/2018-08-19`, {
      filter: 'gdl',
    });

    return result.rows.map(wt => {
      wt.id = wt.value;
      return wt;
    });
    console.log(result);
    return result;
  }

  protected willSendRequest(request: RequestOptions) {
    request.headers.set('Cookie', `.ASPXAUTH=${this.context.auth}`);
  }
}
