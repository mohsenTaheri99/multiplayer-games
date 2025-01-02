import { State } from "../../state";
export const renderCreateGame = (app: HTMLDivElement, state: State) => {
  // Create a container for the menu

  const menuContainer = document.createElement("div");
  menuContainer.className = "menu-container";

  // Add a title to the menu
  const title = document.createElement("h2");
  title.innerText = "My 2D Game";
  menuContainer.appendChild(title);
  const inputGameName = document.createElement("input");
  inputGameName.className = "menu-button";
  inputGameName.addEventListener("input", (event) => {
    state.setGameName((event.target as HTMLInputElement).value);
  });
  menuContainer.appendChild(inputGameName);

  const submitButton = document.createElement("button");
  submitButton.innerText = "create game";
  submitButton.className = "menu-button";
  submitButton.addEventListener("click", () => {
    if (state.getGameName() === "") {
    } else state.setCurrentPage("game");
  });
  menuContainer.appendChild(submitButton);

  app.appendChild(menuContainer);
};
