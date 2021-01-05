import React, { ReactElement } from "react";

export default function Play(): ReactElement {
  return (
    <div className="play">
      <section>
        <h1>Create a Room</h1>
        <button>Create</button>
      </section>
      <section>
        <h1>Join a Room</h1>
        <input type="text" placeholder="Room ID" />
        <button>Join</button>
      </section>
    </div>
  );
}
