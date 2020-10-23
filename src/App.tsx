import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import ErrorBoundary from "pages/ErrorBoundary";
import AuthContext from "providers/AuthProvider";

import DataProvider from "./providers/DataProvider";
import Routes from "./routes";

import "bootstrap/dist/css/bootstrap.min.css";

const client = new ApolloClient({
  link: createUploadLink({ uri: "http://localhost:5003/graphql/" }),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <AuthContext>
          <DataProvider>
            <Router>
              <Routes />
            </Router>
          </DataProvider>
        </AuthContext>
      </ApolloProvider>
    </ErrorBoundary>
  );
}

export default App;
