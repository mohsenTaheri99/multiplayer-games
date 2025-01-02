import { State } from "../../state";
import "./menu.css";
export const renderMenu = (app: HTMLDivElement, state: State) => {
  // Create a container for the menu
  const menuContainer = document.createElement("div");
  menuContainer.className = "menu-container";

  // Add a title to the menu
  const title = document.createElement("h2");
  title.innerText = "My 2D Game";
  menuContainer.appendChild(title);

  const createANewGame = document.createElement("button");
  createANewGame.innerText = "create a new game";
  createANewGame.className = "menu-button";
  createANewGame.addEventListener("click", () =>
    state.setCurrentPage("create-room")
  );
  menuContainer.appendChild(createANewGame);

  const joinAGame = document.createElement("button");
  joinAGame.className = "menu-button";
  joinAGame.innerText = "join a game";
  joinAGame.addEventListener("click", () => state.setCurrentPage("game-rooms"));

  menuContainer.appendChild(joinAGame);

  app.appendChild(menuContainer);
};
