import React from 'react';
import styled from 'styled-components';
import TodoInput from '../components/TodoInput';
import TodoOutput from '../components/TodoOutput';
import Information from '../components/Information';
import TodoCounter from '../components/TodoCounter';

const App = () => {
  return (
    <>
      <Wrapper>
        <TodoCounter />
        <TodoInput />
        <TodoOutput />
        <Information />
      </Wrapper>
    </>
  );
};

export default App;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 52rem;
  min-width: 35rem;
  padding: 2rem;

  h1 {
    font-size: 5rem;
  }
`;
