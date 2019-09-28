import React from 'react';
import styled from 'styled-components';
import { useTodoContext } from '../context/TodoContextProvider';
import CONFIGS from '../configs/configs';
const { MAIN_COLOR } = CONFIGS;

const Welcome = () => {
  const { todoCount, doneCount } = useTodoContext();
  return (
    <Typography>
      반갑습니다.
      <br />
      할일관리 애플리케이션입니다.
      <br />
      현재 해야 할 일이 <TextHighlight>{todoCount}</TextHighlight>개,
      <br />
      완료된 일이 <TextHighlight>{doneCount}</TextHighlight>개 있습니다.
      <br />
    </Typography>
  );
};

export default Welcome;

const Typography = styled.div`
  margin: 4rem auto;
  font-size: 3rem;
  font-weight: 400;
  line-height: 5.5rem;
`;

const TextHighlight = styled.span`
  color: ${MAIN_COLOR};
  font-weight: bold;
`;
