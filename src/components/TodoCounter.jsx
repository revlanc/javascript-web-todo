import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useTodoContext } from '../context/TodoContextProvider';
import CONFIGS from '../configs/configs';
import { makeDelay } from '../utils/myUtils';

const { ANIMATE_DURATION, MAIN_COLOR } = CONFIGS;

const TodoCounter = () => {
  const { todoCount, doneCount } = useTodoContext();
  const [emphasize, setEmphasize] = useState(false);

  useEffect(() => {
    (async () => {
      setEmphasize(true);
      await makeDelay(ANIMATE_DURATION);
      setEmphasize(false);
    })();
  }, [todoCount]);

  return (
    <Wrapper>
      <Box emphasize={emphasize}>Todo: {todoCount}</Box>
      <Box emphasize={emphasize}>Done: {doneCount}</Box>
    </Wrapper>
  );
};

export default TodoCounter;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: inherit;
  min-width: inherit;
  padding: 1rem;
  margin-bottom: 2rem;
`;

const Box = styled.div`
  padding: 0.75rem 2rem;
  width: 11.5rem;
  border: 2px solid ${MAIN_COLOR};
  border-radius: 5px;

  font-size: 2rem;
  font-weight: 400;
  background: ${props => (props.emphasize === true ? MAIN_COLOR : '#fff')};
  color: ${props => (props.emphasize === true ? '#fff' : '#000')};
  transition: all ${ANIMATE_DURATION}ms;
`;
