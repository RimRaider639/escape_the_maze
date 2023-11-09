import { Button, Input, Radio, RadioGroup, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router';
import { CHARACTERS } from '../constants/characters';

const Home = () => {
  const [name, setName] = React.useState("")
  const [room, setRoom] = React.useState("")
  const [players, setPlayers] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [show, setShow] = React.useState(false)
  const navigate = useNavigate()
  const id = React.useRef()

  const onJoin = () => {
    navigate(`/${room}?player=${name}`)
  }

  const fetchRoomDetails = (room) => {
    setLoading(true)
    fetch(`https://iced-gabby-apogee.glitch.me/${room}`)
    .then(res=>res.json())
    .then(data=>data.players ? setPlayers(data.players.map(p=>p.name)) : setPlayers([]))
    .then(()=>setShow(true))
    .catch(()=>setShow(false))
    .finally(()=>setLoading(false))
  }

  console.log(players, players.includes("Harry"))

  const debounce = React.useCallback((keyword) => {
    if (id.current){
      clearTimeout(id.current)
      
    }
    id.current = setTimeout(()=>{
      fetchRoomDetails(keyword)
    }, 3000)
  }, [])

  React.useEffect(()=>{
    if (room){
      debounce(room)
    } else {
      setPlayers([])
    }
    
  }, [room, debounce])
  return <Flex display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100vh"}>
    <Flex width={500} justifyContent={"center"} flexDirection={"column"} gap={"20px"}>
      <Flex>
        <Input placeholder='Room Name' value={room} onChange={(e)=>setRoom(e.target.value)}/>
        <Button isLoading={loading} isDisabled={loading} onClick={()=>fetchRoomDetails(room)}>{"⟳"}</Button>
      </Flex>
      <Flex direction={"column"} gap={"20px"}>
        <Text>Select a Character: </Text>
      {show ? <RadioGroup value={name} onChange={(val)=>setName(val)} gap={"20px"}>
        <Flex gap={"20px"}>
          {CHARACTERS.map(item=><Radio key={item.name} value={item.name} isDisabled={players.includes(item.name)} bgColor={item.color}>{item.name}</Radio>)}
        </Flex>
      </RadioGroup>: <></>}
      </Flex>
      <Button onClick={onJoin} isDisabled={!name.length || !room.length}>Join</Button>
    </Flex>
  </Flex>;
};

export default Home;
