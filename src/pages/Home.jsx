import React from 'react';
import Welcome from '../components/Welcome';
import Information from '../components/Information';
import { useTodoContext } from '../context/TodoContextProvider';

const Home = () => {
  const { loading, error } = useTodoContext();
  return <>{loading || error ? <Information /> : <Welcome />}</>;
};

export default Home;
