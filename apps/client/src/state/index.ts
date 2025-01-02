export type Page = "menu" | "create-room" | "game-rooms" | "game";

export class State {
  private currentPage: Page = "menu";
  private gameId: string | null = null;
  private listener: () => void = () => {};
  private username: string = "";
  private gameName: string = "";

  addListenToPageChenge(cl: () => void) {
    this.listener = cl;
  }

  private notify() {
    this.listener();
    console.log(this.currentPage);
  }

  setCurrentPage(page: Page) {
    this.currentPage = page;
    this.notify();
  }

  setGameId(id: string) {
    this.gameId = id;
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getGameId() {
    return this.gameId;
  }

  setUsername(name: string) {
    this.username = name;
  }

  getUserName() {
    return this.username;
  }

  setGameName(name: string) {
    this.gameName = name;
  }
  getGameName() {
    return this.gameName;
  }
}

export const state = new State();
