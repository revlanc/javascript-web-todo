import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import CONFIGS from '../configs/configs';
const { MAIN_COLOR } = CONFIGS;

const Navigation = () => {
  return (
    <Wrapper>
      <div className="innerWrapper">
        <NavLink exact to="/" className="item" activeClassName="active">
          HOME
        </NavLink>
        <NavLink to="/todo/" className="item" activeClassName="active">
          할일관리
        </NavLink>
        <NavLink to="/about/" className="item" activeClassName="active">
          ABOUT
        </NavLink>
      </div>
    </Wrapper>
  );
};

export default Navigation;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 6rem;

  .innerWrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }

  .item {
    text-decoration: none;
    position: relative;
    color: #c9cbd3;
    font-size: 2rem;
    font-weight: 400;
  }

  .active {
    color: ${MAIN_COLOR};
    &:after{
      position: absolute;
      top: 120%;
      left: -50%;
      content: "";
      width: 200%;
      border-bottom: 2px solid #FF7D9C;
    }
  }
}
`;
