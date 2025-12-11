import GameListCard from "./GameListCard";
import { games } from "../mockData/games";
import styles from './GameList.module.css';

export default function GameList() {
  return (
    <ol className={styles.gameList} data-testid="game-list">
      {games.map((game) => (
        <GameListCard
          key={game.id}
          gameImage={game.image}
          gameName={game.name}
        />
      ))}
    </ol>
  );
}