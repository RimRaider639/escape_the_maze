import React from 'react'
import {Flex, Text} from '@chakra-ui/react'
import useGameContext from '../../hooks/useGameContext'

const ChatWindow = () => {
  const {gameState: {messages}} = useGameContext()
  return (
    <Flex>
      {messages.map(({name, message})=><Text>{name}: {message}</Text>)}
    </Flex>
  )
}

export default ChatWindow