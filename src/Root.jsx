import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import App from './pages/App';
import Home from './pages/Home';
import About from './pages/About';
import NoMatch from './pages/NoMatch';
import Navigation from './components/Navigation';
import Header from './components/Header';
import TodoContextProvider from './context/TodoContextProvider';

const Root = () => {
  return (
    <>
      <GlobalStyle />
      <TodoContextProvider>
        <Wrapper>
          <Router>
            <Header />
            <Navigation />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/todo/" component={App} />
              <Route path="/about/" component={About} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </Wrapper>
      </TodoContextProvider>
    </>
  );
};
export default Root;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0
    box-sizing: border-box;
  }

  html {
    font-size: 10px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 5rem auto;
  max-width: 55rem;
  min-width: 45rem;
  border-radius: 10px;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.2);
`;
