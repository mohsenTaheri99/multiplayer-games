import { ClientPlayer } from "../game/models/player";
import { createWS } from "../websocket";

export const handleInputs = (
  player: ClientPlayer,
  wsClinet: Awaited<ReturnType<typeof createWS>>
) => {
  const keys: Set<string> = new Set();
  window.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key === "d" && !keys.has("d")) {
      wsClinet.send({
        type: "player-input",
        data: {
          input: "left",
          time: Date.now(),
        },
      });
      player.moveleft();
      player.currentAnimation = 0;
      keys.add(key);
    }

    if (key === "a" && !keys.has("a")) {
      wsClinet.send({
        type: "player-input",
        data: {
          input: "right",
          time: Date.now(),
        },
      });
      player.moveRight();
      player.currentAnimation = 0;
      keys.add(key);
    }
    // jump -
    if (key === " ") {
      player.velacityY = -100;
      //for no resone the jump fucntion did't work !!!!!!!!!!!!!!!!!!!
      // player.jump();
      wsClinet.send({
        type: "player-input",
        data: {
          input: "jump",
          time: Date.now(),
        },
      });
    }
  });

  window.addEventListener("keyup", (event) => {
    const key = event.key;
    keys.delete(key);
    if (!(keys.has("a") || keys.has("d"))) {
      player.stopSideMove();
      player.currentAnimation = 1;
      wsClinet.send({
        type: "player-input",
        data: {
          input: "stop",
          time: Date.now(),
        },
      });
    }
  });
};
