import React, { ReactElement, useContext, useState, useEffect } from "react";
import socket from "../utils/socket";

import { Room, Nullable } from "../utils/types";
import { useAuth } from "./AuthContext";

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

  //THIS USER IS FROM AUTH CONTEXT
  const User = useAuth()?.currentUser;

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
    socket.emit("create-room", User?.id);

    // return new Promise((resolve, reject) => {
    //   socket.on("room-created", (roomID: string) => {
    //     if (roomID) resolve(roomID);
    //     else reject(new Error("Bhai typing tere sei nahi hoga"));
    //   });
    // });
  };

  const joinRoom = (roomID: string) => {
    socket.emit("join-room", User?.id, roomID);
  };

  const leaveRoom = () => {
    socket.emit("leave-room", User?.id, room?._id);
  };

  const startGame = () => {
    socket.emit("start-game", room?._id);
  };
  const cleanup = () => {
    socket.removeAllListeners();
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

//TODO:
//MAKE PLAY A PROTECTED ROUTE (ONLY LOGGED IN USERS CAN ACCESS)
// (ADD GUEST FEATURE LATER)

//ONCE USER IS LOGS IN, SHOW THAT HE IS (TOOLTIP) AND MAKE THAT IN THE CONTEXT
//ONCE USER IS LOGS OUT, SHOW THAT HE IS (TOOLTOP) AND DELETE FROM CONTEXT

//IF USER IS NOT LOGGED IN AND TRIES TO CREATE A ROOM SHOW ERROR
// (ADD GUEST FEATURE LATER)
//IF USER IS NOT LOGGED IN AND TRIES JOINING A ROOM SHOW ERROR
// (ADD GUEST FEATURE LATER)
//SIGNOUT

//=================================================================

//ISSUES:

//THE TRAFFIC SIGNALS AT THE START OF THE GAME DESTORY CONCENTRATION
// AND SHOULDN'T COVER
//UP THE WHOLE SCREEN
// (OPINION OF A TYPERACER USER WITH SKILL LEVEL OF TYPEMASTER AND OVER 2200 COMPLETED RACES (ME))

//FORGOT PASSWORD FEATURE

//PLAY AS GUEST FEATURE

//PREVENT THE SAME USER JOINING MORE THAN ONE ROOM
// (BASICALLY DON'T ALLOW SAME USER IN TWO DIFFERENT PLACES)

//MAKE SO THAT ONLY PARTY LEADER CAN START GAME
//ALSO AUTOSTARTING FEATURE (TYPERACER ONLY DOES THIS)

//IN THE ROOM THE PLAYER WHO THE USER'S CAR SHOULD BE HIGHLIGHTED TO SHOW THAT'S HIM

//CLICK TO COPY ROOM ID
