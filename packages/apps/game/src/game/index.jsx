import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

// import BoardWrapper from './BoardWrapper';
// import OpponentWrapper from './OpponentWrapper';
// import PlayerWrapper from './PlayerWrapper';
// import SelectedCardMobileModalWrapper from './SelectedCardMobileModalWrapper';
import { Board, Opponent, Player } from '@ccg/components';

const Game = props => {
  // boardgame props
  const {
    G,
    G: { selectedCardObject, selectedMinionObject },
    ctx,
    moves,
    moves: { deselectCard, deselectMinion },
    events,
    reset,
    undo,
    redo,
    step,
    log,
    gameID,
    playerID,
    gameMetadata,
    isActive,
    isMultiplayer,
    isConnected,
    credentials
  } = props;

  // id declarations
  const theirID = playerID === '0' ? '1' : '0';
  const yourID = playerID === '0' ? '0' : '1';

  // top-level game objects
  const yourSelectedCard = selectedCardObject[yourID];
  const yourSelectedMinion = selectedMinionObject[yourID];

  // log bools
  const logSelectedCardObject = false;

  // removes mac swipe back functionality
  useLayoutEffect(() => {
    document.documentElement.className = 'no-overscroll-behavior';
  }, []);

  useEffect(() => {
    if (logSelectedCardObject)
      console.log(
        'G.selectedCardObject[yourID]: ',
        G.selectedCardObject[yourID]
      );
  }, [G, logSelectedCardObject, yourID]);

  const handleRightClick = useCallback(
    event => {
      event.preventDefault();
      if (yourSelectedMinion) return deselectMinion();
      else if (yourSelectedCard) return deselectCard();
      else return;
    },
    [deselectCard, deselectMinion, yourSelectedCard, yourSelectedMinion]
  );

  useEffect(() => {
    document.addEventListener('contextmenu', handleRightClick);
    return () => document.removeEventListener('contextmenu', handleRightClick);
  }, [handleRightClick]);

  return (
    <Styled.Container>
      {/* <MatchHistory G={G} ctx={ctx} /> */}

      <Opponent
        G={G}
        ctx={ctx}
        moves={moves}
        theirID={theirID}
        parentComponent={'Opponent'}
      />

      <Board G={G} ctx={ctx} moves={moves} theirID={theirID} yourID={yourID} />

      <Player
        G={G}
        ctx={ctx}
        moves={moves}
        yourID={yourID}
        parentComponent={'Player'}
      />

      {/* <SelectedCardMobileModalWrapper
        G={G}
        ctx={ctx}
        moves={moves}
        playerID={yourID}
        images={{
          CARDS: CARDS,
          SETS: SETS
        }}
      /> */}
    </Styled.Container>
  );
};

Game.propTypes = {
  G: PropTypes.object
};

export default Game;
