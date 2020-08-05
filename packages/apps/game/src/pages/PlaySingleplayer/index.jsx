import React, { useEffect } from 'react';
import * as Styled from './styled';
import { useLocation } from 'react-router-dom';
import { Client as BoardgameClient } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { ReactCCG } from '@ccg/server';
import GameWrapper from '../../GameWrapper';
import { useState } from 'react';

const REDUX_DEVTOOLS =
  typeof window !== undefined &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__();

const Client = BoardgameClient({
  game: ReactCCG,
  board: GameWrapper,
  // loading: GameLoader,
  debug: true,
  multiplayer: Local(),
  enhancer: REDUX_DEVTOOLS
});

const PlaySingleplayer = props => {
  const [playerID, setPlayerID] = useState(null);
  let location = useLocation();
  const { href } = location;

  useEffect(() => {
    href.includes('3002') ? setPlayerID('1') : setPlayerID('0');
  }, [href]);

  return <Styled.Container>Sp</Styled.Container>;
};

export default PlaySingleplayer;
