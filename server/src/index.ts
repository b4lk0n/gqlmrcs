import { ApolloServer, gql } from 'apollo-server';
import { initializeApp, credential, ServiceAccount } from 'firebase-admin';
import serviceAccount from './firebase-service-account.json';

initializeApp({
  credential: credential.cert(<ServiceAccount>serviceAccount),
  databaseURL: 'https://the-game-ce344.firebaseio.com'
});

const typeDefs = gql`
type User {
  id: ID!
  name: String
}

type JoinResponse {
  token: String
  user: User
}

type Query {
  me: User!
}

type Mutation {
  join(id: ID!, name: String): JoinResponse!
}
`;

interface JoinRequest {
  id: string;
  name?: string;
}

const resolvers = {
  Query: {
    me: () => ({ id: 1, name: 'b4lk0n' })
  },

  Mutation: {
    join: (parent: unknown, { id, name }: JoinRequest) => {
      return {
        token: 'secret_token',
        user: { id, name }
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {}
});

  server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
})