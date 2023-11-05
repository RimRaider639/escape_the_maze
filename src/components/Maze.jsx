import React from 'react'
import Maze from '../utils/Game'
import useGameContext from '../hooks/useGameContext'
import { Box, Flex, Image } from '@chakra-ui/react'
import Players from './Players'
import { MAP, SIDE } from '../constants/maze'

const Game = () => {
    const {gameState} = useGameContext()
    const [maze, setMaze] = React.useState(null)

    const Wall = React.useCallback(() => <Image src="stones.png" w={SIDE} h={SIDE}/>, [])
    
    const Gap = React.useCallback(() => <Image src="middle.png" w={SIDE} h={SIDE}/>, [])
    
    React.useEffect(()=>{
        if (gameState.maze){
          setMaze(new Maze(gameState.maze))
        }
        
    }, [gameState.maze])

    React.useEffect(()=>{
        if (gameState.winner){
            alert(gameState.winner+" won the game.")
        }
    }, [gameState.winner])
  return (
    <Box position={"relative"}>
        {maze && maze.matrix.map((row, i)=><Flex key={i}>
            {row.map((col, j)=>{
                if (col===MAP.wall) return <Wall key={j}/>
                else return <Gap key={j}/>
            })}
        </Flex>)}
        {maze && <Players matrix={maze.matrix}/>}
    </Box>
  )
}

export default Game