import React from 'react'
import {Button, Flex, Input, Text} from '@chakra-ui/react'
import useGameContext from '../../hooks/useGameContext'
import network from '../../utils/Network'

const ChatWindow = () => {
  const {gameState: {messages}} = useGameContext()
  const [text, setText] = React.useState("")
  const onSend = () => {
    network.sendMessage(text)
    setText("")
  }
  const keyDownEvent = (event) => {
    console.log(event.code)             
    if (event.code === "Enter") {
      if (text) onSend()
    }
  };
  return (
    <Flex flexDirection={"column"} height={"100%"} width="30%" bgColor={"violet"}>
      <Flex padding={"20px"}>
        Chat
      </Flex>
      <Flex flexDirection={"column"} gap={"20px"} height={"100%"} overflow={"auto"} bgColor={"brown"} padding={"20px"}>
        {messages.map(({name, message}, i)=><Text key={i}>{name}: {message}</Text>)}
      </Flex>
      <Flex>
        <Input value={text} onChange={(e=>setText(e.target.value))} onKeyDown={keyDownEvent}/>
        <Button isDisabled={!text} onClick={onSend}>Send</Button>
      </Flex>
    </Flex>
  )
}

export default ChatWindow