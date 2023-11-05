import React, { useCallback } from 'react';
import network from '../utils/Network';

const initState = {
  players: [],
  maze: null,
  room: null,
  messages: [],
  player: null,
  winner: null,
};

export const gameContext = React.createContext({
  gameState: initState,
  connect: () => {},
  setState: () => {},
  disconnect: () => {},
});

export default function GameContextProvider({ children }) {
  const [gameState, setGameState] = React.useState(initState);

  const connect = useCallback((room, name) => {
    network.connect(room, name, setGameState);
  }, []);

  const disconnect = network.disconnect;
  return (
    <gameContext.Provider
      value={{ gameState, connect, setState: setGameState, disconnect }}
    >
      {children}
    </gameContext.Provider>
  );
}
