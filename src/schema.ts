import { gql } from 'apollo-server';

const typeDefs = gql`
  # An ISO-8601 encoded UTC date string.
  scalar DateTime

  type WorkTask {
    id: ID!
    description: String!
    isProject: Boolean!
  }

  type User {
    id: ID!
    userName: String!
    client: String!
  }

  type Balance {
    flex: Float!
    vacation: Int!
  }

  type HRMS {
    workingDay: Boolean!
    publicHoliday: Boolean!
    normalHours: Float!
    transDate: DateTime!
  }

  type Fravar {
    id: ID!
    description: String!
  }

  type Detail {
    project: ID!
    projectDescr: String!
    description: String!
    sum: Float!
  }

  type Query {
    worktasks: [WorkTask]
    currentUser: User
    balance: Balance!
    timecodes: [Fravar]
    details: [Detail!]!
  }
`;

export default typeDefs;
