import React from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
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
    window.addEventListener("beforeunload", ()=>{
      disconnect()
    })
  }, [room, player, connect, disconnect])

  return <Flex padding={"30px"} justify={"space-between"} boxSizing={'border-box'} height={"100vh"} paddingY={"50px"}>
    <Game/>
    <ChatWindow/>
  </Flex>;
};

export default Room;
