// import { Player } from "../models/player";
class Player {
  id = "10";
}

class PlayerRepository {
  private players: Map<string, Player>;

  constructor() {
    this.players = new Map(); // In-memory storage
  }

  // Add a player
  savePlayer(player: Player): void {
    this.players.set(player.id, player);
  }

  // Retrieve a player by ID
  getPlayer(id: string): Player | undefined {
    return this.players.get(id);
  }

  // Delete a player by ID
  deletePlayer(id: string): void {
    this.players.delete(id);
  }

  // Get all players
  getAllPlayers(): Player[] {
    return Array.from(this.players.values());
  }
}

export const playerRepository = new PlayerRepository();
