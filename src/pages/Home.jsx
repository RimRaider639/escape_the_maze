import { Box, Button, Input, Radio, RadioGroup } from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';

const Home = () => {
  const [name, setName] = React.useState("")
  const [room, setRoom] = React.useState("")
  const [players, setPlayers] = React.useState([])
  const navigate = useNavigate()
  const id = React.useRef()

  const onJoin = () => {
    navigate(`/${room}?player=${name}`)
  }

  const debounce = useCallback((keyword) => {
    if (id.current){
      clearTimeout(id.current)
      
    }
    id.current = setTimeout(()=>{
      fetch(`https://iced-gabby-apogee.glitch.me/${keyword}`)
      .then(res=>res.json())
      .then(data=>data.players && setPlayers(data.players.map(p=>p.name)))
      // .then(res=>console.log(res.body))
      // .then(console.log)
    }, 3000)
  }, [])

  React.useEffect(()=>{
    if (room){
      debounce(room)
    }
    
  }, [room, debounce])
  return <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100vh"}>
    <Box width={500} display={"flex"} justifyContent={"center"} flexDirection={"column"} gap={"20px"}>
      <Input placeholder='room' value={room} onChange={(e)=>setRoom(e.target.value)}/>
      <RadioGroup value={name} onChange={(val)=>setName(val)}>
        <Radio value="a" disabled={players.includes('a')}>A</Radio>
        <Radio value="b" disabled={players.includes('b')}>B</Radio>
        <Radio value="c" disabled={players.includes('c')}>C</Radio>
        <Radio value="d" disabled={players.includes('d')}>D</Radio>
        <Radio value="e" disabled={players.includes('e')}>E</Radio>
      </RadioGroup>
      <Button onClick={onJoin} isDisabled={!name.length || !room.length}>Join</Button>
    </Box>
  </Box>;
};

export default Home;
