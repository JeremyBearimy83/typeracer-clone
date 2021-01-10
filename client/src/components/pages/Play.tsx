import React, { ReactElement, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Play(): ReactElement {
  const history = useHistory();

  const [error, setError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCreate = () => {
    //CREATE A ROOM
    const roomID = "edaa";
    history.push({
      pathname: `/room/${roomID}`,
      state: {
        roomID,
      },
    });
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

    history.push({
      pathname: `/room/${roomID}`,
      state: {
        roomID,
      },
    });
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
