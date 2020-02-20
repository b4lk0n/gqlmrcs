import React from 'react';
import { render } from 'react-dom';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, useMutation } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:4000'
});

const User = () => {
  const [join, { loading, error, data }] = useMutation(gql`
    mutation Join($id: ID!, $name: String) {
      join(id: $id, name: $name) {
        token,
        user {
          id,
          name
        }
      }
    }
  `);

  const handleButtonClick = () => join({
    variables: {
      id: 2,
      name: 'lex'
    }
  });

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {data && (
        <>
          <div>ID: {data?.join?.user.id}</div>
          <div>name: {data?.join?.user?.name || ''}</div>
        </>
      )}
      <button onClick={() => handleButtonClick()}>join</button>
    </div>
  );
};

render((
  <ApolloProvider client={client}>
    <User />
  </ApolloProvider>
), document.getElementById('root'));

