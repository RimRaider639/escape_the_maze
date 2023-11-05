import socketIOClient from 'socket.io-client';
// import MazeBuilder from "../models/Maze";

const serverURL = `wss://iced-gabby-apogee.glitch.me`;

class Network {
  io;
  constructor() {
    this.isConnected = false;
    this.localPlayerName = null;
    this.players = [];
    this.maze = null;
    this.room = null;
    this.messages = [];
    this.setter = null;
    this.io = socketIOClient(`${serverURL}`, {
      autoConnect: false,
    });
  }

  connect(room, player, setter) {
    this.io.connect();
    this.io.on('connect', async () => {
      this.isConnected = true;
      this.io.emit('join', {
        room,
        player,
      });
      this.listenToRoom();
      this.setter = setter;
      this.localPlayerName = player;
    });
  }

  listenToRoom() {
    this.io.on('joined', async data => {
      console.log('joined');

      const { room, players, maze, messages } = data;
      console.log(data);
      this.room = room;
      this.players = players;
      this.maze = maze;
      this.messages = messages;
      this.setter({
        ...data,
        player: players.find(item => item.name === this.localPlayerName),
      });
      // let result = await fetch(
      //   `http://iced-gabby-apogee.glitch.me/chats?room=${room}`
      // ).then(response => response.json());

      // this.chatMessages = result.messages;
      // this.chatMessages.push({
      //   id: 0,
      //   name: 'bot',
      //   message: 'Welcome to ' + room,
      // });
      // if (this.chatMessages.length > 20) {
      //   this.chatMessages.shift();
      // }
      // setText(this.chatMessages);
    });

    this.io.on('newMessage', ({ room, playerName, text }) => {
      if (room === this.room) {
        this.messages.push({ name: playerName, message: text });
        this.setter(state => ({
          ...state,
          messages: [...state.messages, { name: playerName, message: text }],
        }));
      }
    });
    this.io.on(
      'updatePlayerPosition',
      ({ playerName, playerPos, playerDir }) => {
        console.log('update', { playerName, playerPos, playerDir });
        this.setter(state => {
          const updatedState = state.players.map(player =>
            player.name === playerName
              ? { ...player, pos: playerPos, dir: playerDir }
              : player
          );
          this.players = updatedState;
          return {
            ...state,
            players: updatedState,
            player:
              playerName === this.localPlayerName
                ? { name: playerName, pos: playerPos, dir: playerDir }
                : state.player,
          };
        });
      }
    );
    this.io.on('endGame', ({ winner }) => {
      this.setter(state => ({ ...state, winner }));
    });
  }

  movePlayer(pos, dir) {
    this.io.emit('playerMoved', {
      room: this.room,
      playerName: this.localPlayerName,
      playerPos: pos,
      playerDir: dir,
    });
  }

  playerWon() {
    this.io.emit('playerWon', {
      playerName: this.localPlayerName,
      room: this.room,
    });
  }

  message(text) {
    this.io.emit('sendMessage', {
      room: this.room,
      playerName: this.localPlayerName,
      text,
    });
  }

  disconnect() {
    console.log('disconnecting...');
    this.io.emit('disconnected', {
      playerName: this.localPlayerName,
      room: this.room,
    });
    this.io.disconnect();
    this.isConnected = false;
    this.localPlayerName = null;
    this.players = [];
    this.maze = null;
    this.room = null;
    this.messages = [];
    this.setter = null;
  }
}

const network = new Network();
export default network;
