import React from 'react';
import styled from 'styled-components';

const About = () => {
  return (
    <Wrapper>
      <div>📝</div>
      <h1>React Todo App</h1>
    </Wrapper>
  );
};

export default About;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 4rem auto;

  div {
    font-size: 5rem;
  }
`;
