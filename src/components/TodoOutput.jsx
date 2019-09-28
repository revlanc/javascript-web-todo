import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Button from '../atomicComponents/Button';
import TodoList from './TodoList';
import PropTypes from 'prop-types';

const TodoOutput = () => {
  const [folded, setFolded] = useState(false);

  const toggleLists = useCallback(() => {
    setFolded(!folded);
  }, [folded]);

  return (
    <Wrapper>
      <div>
        <h3>할 일 목록</h3>
        <Button onClick={toggleLists}>{folded ? '펼치기' : '접기'}</Button>
      </div>
      {!folded && <TodoList />}
    </Wrapper>
  );
};

Button.propTypes = {
  onClick: PropTypes.func
};

export default TodoOutput;

const Wrapper = styled.div`
  width: 100%;
  max-width: inherit;
  min-width: inherit;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.5rem 0;
  }

  h3 {
    padding-left: 2rem;
    font-size: 2rem;
    font-weight: bold;
  }
`;
