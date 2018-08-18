import { ApolloServer } from 'apollo-server';
import { Request } from 'express';

import UBWAPI from './data/ubwAPI';
import UserAPI from './data/userAPI';
import HRMSAPI from './data/hrmsAPI';
import TimesheetAPI from './data/timesheetAPI';
import { resolvers } from './resolvers';
import typeDefs from './schema';

/**
 * Add the authorization token to the apollo context
 */
function getContext({ req }: { req: Request }) {
  let auth = req.get('Authorization');
  // Wtf.... Why does it pull the value as the string 'null' if it doesn't exist?
  auth = auth === 'null' ? undefined : auth;
  return { auth };
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: getContext,
  dataSources: () => ({
    UBWAPI: new UBWAPI(),
    userAPI: new UserAPI(),
    timesheetAPI: new TimesheetAPI(),
    HRMSAPI: new HRMSAPI()
  })
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀 Server ready at ${url}`);
});
