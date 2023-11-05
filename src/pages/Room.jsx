import React from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import ChatWindow from '../components/chatWindow/ChatWindow';
import Game from '../components/Maze';
import useGameContext from '../hooks/useGameContext';

const Room = () => {
  const {room} = useParams()
  const [urlSeatchParams] = useSearchParams()
  const player = urlSeatchParams.get("player")
  const {connect, disconnect} = useGameContext()
  React.useEffect(()=>{
    connect(room, player)
    return disconnect
  }, [room, player, connect, disconnect])

  return <Box>
    <Game/>
    <ChatWindow/>
  </Box>;
};

export default Room;
