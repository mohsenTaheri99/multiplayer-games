import { Page, state, State } from "../../state";
export const renderGameRooms = async (app: HTMLDivElement, state: State) => {
  const menuContainer = document.createElement("div");
  menuContainer.className = "menu-container";

  const title = document.createElement("h2");
  title.innerText = "My 2D Game";
  menuContainer.appendChild(title);
  const result = await fetch("http://localhost:3000/game-rooms");
  const gameList: { name: string; id: string }[] = await result.json();
  console.log(gameList);
  gameList.forEach((gameRoom) => {
    const room = document.createElement("button");
    room.innerText = gameRoom.name;
    room.className = "menu-button";
    room.addEventListener("click", () => {
      state.setGameId(gameRoom.id);
      state.setCurrentPage("game");
    });
    menuContainer.appendChild(room);
  });

  app.appendChild(menuContainer);
};
