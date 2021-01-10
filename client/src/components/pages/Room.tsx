import React, { ReactElement, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

export default function Room({ match }: any): ReactElement {
  const {
    state: { roomID },
  }: any = useLocation();

  const history = useHistory();

  const init = [
    {
      name: "JeremyBearimy83",
      id: "1337",
      color: "orangered",
    },
    {
      name: "AKhForty7",
      id: "1337",
      color: "#a3f7bf",
    },
    {
      name: "Loser23",
      id: "1221",
      color: "#efd510",
    },
  ];

  const [players, setPlayers] = useState(init);

  const handleStart = () => {
    //DO SOCKET WALA LOGIC
    // GET A PARAGRAH
    const textString =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam quia exercitationem sint officiis nemo, voluptatem nisi esse quasi, consequuntur voluptatum officia, corrupti natus atque voluptates doloribus quae quam molestiae odio.";

    history.push({
      pathname: `${match.url}/game`,
      state: { textString },
    });
  };

  return (
    <div className="room">
      <h1>
        Room ID: <span> {roomID}</span>
      </h1>

      <h2>Players</h2>
      {players.map((player) => (
        <div className="player">
          {" "}
          <i
            style={{ color: `${player.color}` }}
            className="fas fa-user"
          ></i>{" "}
          {player.name} #{player.id}
        </div>
      ))}
      <button onClick={handleStart} disabled={players.length < 2}>
        Start
      </button>
    </div>
  );
}
