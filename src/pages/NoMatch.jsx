import React from 'react';
import styled from 'styled-components';

const NoMatch = () => {
  return (
    <Wrapper>
      <h1>찾으시는 페이지가 없습니다</h1>
    </Wrapper>
  );
};

export default NoMatch;

const Wrapper = styled.div`
  margin: 4rem auto;
  h1 {
    font-weight: 400;
  }
`;
