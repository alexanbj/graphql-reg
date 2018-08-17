import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';

export default class UserAPI extends RESTDataSource {
  public baseURL =
    'https://ubw.unit4cloud.com/se_kno_prod_web/api/session/current/';

  public async currentUser() {
    const result = await this.get('user');
    result.id = result.userId;
    return result;
  }

  protected willSendRequest(request: RequestOptions) {
    request.headers.set('Cookie', `.ASPXAUTH=${this.context.auth}`);
  }
}
