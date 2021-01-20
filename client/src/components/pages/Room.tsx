import React, { ReactElement, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useGame } from "../../context/GameContext";

import { Room as RoomType, Player } from "../../utils/types";

export default function Room({ match }: any): ReactElement {
  const game = useGame();

  const history = useHistory();

  const players = game?.room?.players;

  useEffect(() => {
    // if (!game?.room?.gameStarted) {
    //   return game?.leaveRoom;
    // }
  }, []);

  game?.onUpdate((room) => {
    if (room.gameStarted) {
      history.push({
        pathname: `${match.url}/game`,
        state: { textString: room.paragraph },
      });
    }
  });

  const handleLeave = () => {
    game?.leaveRoom();
    history.push("/play");
  };

  const handleStart = () => {
    game?.startGame();
  };

  return (
    <div className="room">
      <h1>
        Room ID: <span> {game?.room?._id}</span>{" "}
        <LeaveButton handleLeave={handleLeave} />
      </h1>
      <h2>Players</h2>
      {players?.map((player: Player) => (
        <div className="player">
          {" "}
          <i
            style={{ color: `${player.color}` }}
            className="fas fa-user"
          ></i>{" "}
          {player.user.username} #{player.user.tag}
        </div>
      ))}
      <button onClick={handleStart} disabled={players && players.length < 2}>
        Start
      </button>
    </div>
  );
}

// FOR OPTIMIZATION
// IF ITS NOT IN A DIFFERENT COMPONENT
// WHOLE PAGE IS RE RENDERING ON HOVER
function LeaveButton({
  handleLeave,
}: {
  handleLeave: () => void;
}): ReactElement {
  const [doorClass, setDoorClass] = useState("fas fa-door-closed");

  return (
    <div
      onClick={handleLeave}
      onMouseEnter={() => setDoorClass("fas fa-door-open")}
      onMouseLeave={() => setDoorClass("fas fa-door-closed")}
      className="leave"
    >
      Leave
      <i className={doorClass}></i>
    </div>
  );
}
