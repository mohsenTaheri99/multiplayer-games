import { renderCreateGame } from "./Pages/CreateGameRoom/createGamePage";
import { renderGame } from "./Pages/gamePage/gamePage";
import { renderGameRooms } from "./Pages/GameRooms/gameRooms";
import { renderMenu } from "./Pages/menuPage/menuPage";
import { state } from "./state";
import "./style.css";
const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("Element with #app id did not exist");

const renderPage = () => {
  app.innerHTML = "";
  switch (state.getCurrentPage()) {
    case "create-room":
      renderCreateGame(app, state);
      break;
    case "game":
      renderGame(app, state);
      break;
    case "game-rooms":
      renderGameRooms(app, state);
      break;
    case "menu":
      renderMenu(app, state);
      break;

    default:
      break;
  }
};
state.addListenToPageChenge(renderPage);
renderPage();
