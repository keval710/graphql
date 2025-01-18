import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const client = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsIn',
      'Apollo-Require-Preflight': 'true',
    }
  }),
  cache: new InMemoryCache()
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
