import { Box, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { lostGirl } from '../assets/avatars'
import useGameContext from '../hooks/useGameContext'
import network from '../utils/Network'
import { MAP, SIDE } from '../constants/maze'
import { CHARACTERS } from '../constants/characters'

const getDir = (dir) => {
    if (dir) {const [x, y] = dir
    if (x===1 && y===0) return lostGirl.RIGHT
    else if (x===-1 && y===0) return lostGirl.LEFT
    else if (x===0 && y===1) return lostGirl.DOWN
    else if (x===0 && y===-1) return lostGirl.UP}
    return lostGirl.UP
  }

const Players = ({matrix, cont}) => {
    const {gameState: {player: {pos, name, dir}, players}} = useGameContext()
    console.log({pos})
    const PlayerLocal = React.useCallback(() => {
      return <Box>
        <Image  position={'absolute'} src={getDir(dir)} w={SIDE} h={SIDE}/>
        <Image src="middle.png" w={SIDE} h={SIDE}/>
      </Box>}, [dir])
  
      
      const PlayerRemote = React.useCallback(({dir, name}) => <Box>
      <Image  position={'absolute'} src={getDir(dir)} w={SIDE} h={SIDE} bgColor={(CHARACTERS.find(item=>item.name===name)).color}/>
      <Image src="middle.png" w={SIDE} h={SIDE}/>
    </Box>, [])

    //   const MOVE = {
    //     UP: () => setState(state=>({...state, player: {...state.player, pos:[pos[0]-1, pos[1]]}})),
    //     DOWN: () => setState(state=>({...state, player: {...state.player, pos:[pos[0]+1, pos[1]]}})),
    //     RIGHT: () => setState(state=>({...state, player: {...state.player, pos:[pos[0], pos[1]+1]}})),
    //     LEFT: () => setState(state=>({...state, player: {...state.player, pos:[pos[0], pos[1]-1]}}))
    //   }

      const MOVE = {
        UP: () => network.movePlayer([pos[0]-1, pos[1]], [0, -1]),
        DOWN: () => network.movePlayer([pos[0]+1, pos[1]], [0, 1]),
        RIGHT: () => network.movePlayer([pos[0], pos[1]+1], [1, 0]),
        LEFT: () => network.movePlayer([pos[0], pos[1]-1], [-1, 0])
      }

      const keyDownEvent = (event) => {
        console.log(event.code)             
        if (event.code === "ArrowDown") {
            if (pos[0]+1<matrix[0].length && matrix[pos[0]+1][pos[1]]===MAP.gap)
            MOVE.DOWN()
        }
        if (event.code === "ArrowUp") {
            if (pos[0]-1>=0 && matrix[pos[0]-1][pos[1]]===MAP.gap)
            MOVE.UP()
            if (pos[0]-1>=0 && matrix[pos[0]-1][pos[1]]===MAP.exit){
                network.playerWon()
                MOVE.UP()
            }
        }
        if (event.code === "ArrowRight") {
            if (pos[1]+1<matrix.length && matrix[pos[0]][pos[1]+1])
            MOVE.RIGHT()
        }
        if (event.code === "ArrowLeft") {
            if (pos[1]-1>=0 && matrix[pos[0]][pos[1]-1]===MAP.gap)
            MOVE.LEFT()
        }
      };

  return (
    <Box position={"absolute"} top={0} onKeyDown={keyDownEvent} tabIndex={-1} ref={cont}>
        {
            matrix.map((row, i)=><Flex key={i}>
            {row.map((col, j)=>{
                if (pos[0]===i && pos[1]===j) return <PlayerLocal key={j}/>
                for (let k=0; k<players.length; k++){
                    if (players[k].name!==name && players[k].pos[0]===i && players[k].pos[1]===j){
                        return <PlayerRemote key={j} dir={players[k].dir} name={players[k].name}/>
                    }
                }
                return <Box key={j} width={SIDE} height={SIDE}/>
            })}
        </Flex>)
        }

    </Box>
  )
}

export default Players