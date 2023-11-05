import React from 'react';
import { gameContext } from '../contexts/gameContext';

const useGameContext = () => {
  return React.useContext(gameContext);
};

export default useGameContext;
