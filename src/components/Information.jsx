import React from 'react';
import styled from 'styled-components';
import { useTodoContext } from '../context/TodoContextProvider';
import WarningModal from '../atomicComponents/WarningModal';

const Typography = styled.div`
  font-size: 2rem;
`;

const Information = () => {
  const { loading, error } = useTodoContext();

  return (
    <>
      {loading && <Typography>로딩중..</Typography>}
      {error && <WarningModal>네트워크 에러가 발생했습니다</WarningModal>}
    </>
  );
};

export default Information;
