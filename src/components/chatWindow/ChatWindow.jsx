import React from 'react'
import {Button, Flex, Heading, Input, Text} from '@chakra-ui/react'
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
    <Flex flexDirection={"column"} height={"100%"} width="30%" bgColor={"#6d4f28"}>
      <Heading size={"sm"} padding={"20px"}>
        Chat
      </Heading>
      <Flex flexDirection={"column"} gap={"20px"} height={"100%"} overflow={"auto"} bgColor={"#849f15"} padding={"20px"}>
        {messages.map(({name, message}, i)=><Text key={i}><b>{name}:</b> {message}</Text>)}
      </Flex>
      <Flex>
        <Input value={text} onChange={(e=>setText(e.target.value))} placeholder='Write some text...' onKeyDown={keyDownEvent}/>
        <Button isDisabled={!text} onClick={onSend}>Send</Button>
      </Flex>
    </Flex>
  )
}

export default ChatWindow