import React, { ReactElement, useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useGame } from "../../context/GameContext";

export default function Play({ match }: any): ReactElement {
  const history = useHistory();

  const game = useGame();

  const [error, setError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  game?.onUpdate((room, event) => {
    if (event === "room-created" || event === "room-joined")
      history.push(`/room/${room._id}`);
  });

  const handleCreate = () => {
    game?.createRoom();
  };

  const handleJoin = () => {
    const roomID = inputRef.current?.value;

    if (!roomID) return;

    //VERIFY IF ROOM EXISTS

    const exists = true;

    if (!exists) {
      setError(true);
      return;
    }

    game?.joinRoom(roomID);
  };

  return (
    <div className="play">
      <section>
        <h1>Create a Room</h1>
        <button onClick={handleCreate}>Create</button>
      </section>
      <section>
        <h1>Join a Room</h1>
        {error && <span className="error">Invalid ID</span>}
        <input ref={inputRef} type="text" placeholder="Room ID" />
        <button onClick={handleJoin}>Join</button>
      </section>
    </div>
  );
}
