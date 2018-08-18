import { gql } from 'apollo-server';

const typeDefs = gql`
  # An ISO-8601 encoded UTC date string.
  scalar DateTime

  type WorkTask {
    id: ID!
    description: String!
  }

  enum Status {
    # Open I think
    P
    # Closed I think
    T
    # Future timesheets...
    NEW
  }

  type Timesheet {
    id: ID!
    dateFrom: DateTime!
    dateTo: DateTime!
    details: [Detail!]!
    workSchedule: [WorkSchedule!]!
    status: Status!
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

  type WorkSchedule {
    workingDay: Boolean!
    publicHoliday: Boolean!
    normalHours: Float!
    date: DateTime!
  }

  type Fravar {
    id: ID!
    description: String!
  }

  type Detail {
    id: ID!
    project: WorkTask!
    workOrder: WorkTask!
    description: String!
    values: [Float!]!
    sum: Float!
  }

  type Query {
    worktasks: [WorkTask!]!
    currentUser: User!
    balance: Balance!
    timecodes: [Fravar]
    currentSheet: Timesheet!
    #details: [Detail!]!
  }
`;

export default typeDefs;
