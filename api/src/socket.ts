// @ts-nocheck
import { Socket } from "socket.io";

import Room from "./models/Room";
import User from "./models/User";

import colors from "./config/colors";
import getParagraph from "./config/paragraph";

const paragraph =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam iusto excepturi aperiam voluptatum eveniet quod fuga consequuntur tempora commodi ut cum ad unde officiis, modi provident rem nam ratione beatae?";

// DOCUMENTATION
// SO EVERY EVENT WILL TRIGGER THE update-room EVENT WHICH UPDATES THE ROOM STATE
// IT ALSO HAS A SECOND ARGUMENT "event" WHICH IS A STRING SO WE KNOW FROM WHERE update-game IS TRIGGERED
// WE USE THIS INFORMATION IN THE CLIENT TO DO STUFF DEPENDING ON WHICH EVENT TRIGGERED UPDATE
// REFER TO PLAY.TSX 15,16 (1) (DISCLAIMER: SUBJECT TO CHANGE)
// IF WE DON'T CHECK FOR THOSE TWO EVENTS [refer to (1))] THEN leave-room WILL ALSO TRIGGER history.push AND
// LEAVING ROOMS WILL NOT WORK PROPERLY
// NOTE: NEED TO CLEANUP THE EVENT LISTNERS IN THE CLIENT (MIGHT PROMISIFY IT :/)

export default (socket: Socket, io: any) => {
  socket.on("create-room", async (userID: string) => {
    const user = await User.findById(userID).select("username tag");

    const paragraph = await getParagraph();

    const player = {
      _id: socket.id,
      isPartyLeader: true,
      user,
      color: colors[0],
    };

    let room = await new Room({
      players: [player],
      paragraph,
    }).save();

    socket.join(room._id);
    io.to(room._id).emit("update-room", room, "room-created");

    try {
    } catch (err) {
      throw err;
    }
  });

  socket.on("join-room", async (userID: string, roomID: string) => {
    const { players } = await Room.findById(roomID);

    if (players.length === 4) {
      // EMIT GAME FULL EVENT
    }

    const user = await User.findById(userID).select("username tag");

    const player = {
      _id: socket.id,
      isPartyLeader: false,
      user,
      color: colors[players.length],
    };

    let room = await Room.findByIdAndUpdate(
      roomID,
      {
        $push: { players: player },
      },
      { new: true, upsert: true, useFindAndModify: false }
    ).populate("players.user", "username tag");

    socket.join(room._id);
    io.to(room._id).emit("update-room", room, "room-joined");

    try {
    } catch (err) {
      throw err;
    }
  });

  // THIS BROKE
  socket.on("leave-room", async (userID: string, roomID: string) => {
    let room = await Room.findByIdAndUpdate(
      roomID,
      {
        $pull: { players: { _id: socket.id } },
      },
      { useFindAndModify: false, new: true }
    ).populate("players.user", "username tag");

    io.to(room._id).emit("update-room", room);
    socket.leave(room._id);

    try {
    } catch (err) {
      throw err;
    }
  });

  // ERROR IDHAR
  socket.on("start-game", async (roomID: string) => {
    try {
      let room = await Room.findByIdAndUpdate(
        roomID,
        {
          gameStarted: true,
        },
        { useFindAndModify: false, new: true }
      ).populate("players.user", "username tag");

      io.to(room._id).emit("update-room", room);
    } catch (err) {
      throw err;
    }
  });

  socket.on("word-typed", async (roomID: string) => {
    try {
      const room = await Room.findOneAndUpdate(
        {
          _id: roomID,
          "players._id": socket.id,
        },
        { $inc: { "players.$.currentWordIndex": 1 } },
        { useFindAndModify: false, new: true }
      ).populate("players.user", "username tag");

      io.to(room._id).emit("update-room", room);
    } catch (err) {
      throw err;
    }
  });
};
