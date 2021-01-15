import React, { ReactElement, useContext, useState, useEffect } from "react";
import socket from "../utils/socket";

import { Room, Nullable } from "../utils/types";

interface Props {
  children: ReactElement;
}

interface Value {
  room: Nullable<Room>;
  createRoom: () => void;
  joinRoom: (roomID: string) => void;
  leaveRoom: () => void;
  onUpdate: (func: (room: Room, event: string) => void) => void;
  startGame: () => void;
  cleanup: () => void;
  incrementPlayerIndex: () => void;
}

const GameContext = React.createContext<Nullable<Value>>(null);

export function useGame() {
  return useContext(GameContext);
}

export default function GameProvider({ children }: Props): ReactElement {
  const [room, setRoom] = useState<Nullable<Room>>(null);

  //TODO: change this any
  useEffect((): (() => any) => {
    socket.on("update-room", (room: Room) => {
      setRoom(room);
    });

    return socket.removeAllListeners;
  }, []);

  // NEED TO FIGURE OUT HOW TO UNSUB FROM game.onUpdate EVENTS
  const onUpdate = (func: (room: Room, event: string) => void) => {
    socket.once("update-room", (room: Room, event: string) => {
      func(room, event);
    });
  };

  const createRoom = () => {
    socket.emit("create-room", "5ffd0ae29dab1d26e86e20f0");
  };

  const joinRoom = (roomID: string) => {
    socket.emit("join-room", "5ffd0ae29dab1d26e86e20f0", roomID);
  };

  const leaveRoom = () => {
    socket.emit("leave-room", "5ffd0ae29dab1d26e86e20f0", room?._id);
    cleanup();
  };

  const startGame = () => {
    socket.emit("start-game", room?._id);
  };

  const cleanup = () => {
    setRoom(null);
  };

  const incrementPlayerIndex = () => {
    socket.emit("word-typed", room?._id);
  };

  const value = {
    room,
    createRoom,
    joinRoom,
    leaveRoom,
    onUpdate,
    startGame,
    cleanup,
    incrementPlayerIndex,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
