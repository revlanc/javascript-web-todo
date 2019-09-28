import React from 'react';
import styled from 'styled-components';
import CONFIGS from '../configs/configs';
const { MAIN_COLOR } = CONFIGS;

const Header = () => {
  return (
    <Wrapper>
      <h1>React Todo App</h1>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 10rem;
  background: linear-gradient(to right, ${MAIN_COLOR}, #009de6);
  border-radius: 10px 10px 0 0;

  h1 {
    margin: auto;
    font-size: 3.5rem;
    color: #fff;
    font-weight: 400;
  }
`;
