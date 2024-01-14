import { useEffect } from 'react';
import initializeGame from '../GameLogic/index';

const Game = ({ user }) => {
  useEffect(() => {
    if (user) {
      initializeGame();
    }
  }, [user]);

  return (
    <>
      {user && (
        <section className='game'>
          <canvas id='gameCanvas'></canvas>
        </section>
      )}
    </>
  );
};

export default Game;