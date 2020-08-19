import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useResponsive } from '@ccg/hooks';
import { Hand, PlayerHero } from '@ccg/components';

const Player = props => {
  const {
    G,
    G: {
      players,
      playerSpellDamage,
      selectedCardIndex,
      selectedCardInteractionContext,
      selectedCardObject
    },
    moves,
    parentComponent,
    yourID
  } = props;

  const { isDesktop } = useResponsive();
  const cardsInHandArray = players[yourID].hand;
  const disableInteraction = selectedCardInteractionContext[yourID];
  const selectedCardObj = selectedCardObject[yourID];
  const selectedCardUuid = selectedCardObj && selectedCardObj.uuid;
  const selectedCardIntCtx = selectedCardInteractionContext[yourID];

  return (
    <div
      className={[
        'player',
        selectedCardIntCtx ? 'disable-interaction' : ''
      ].join(' ')}
      data-component={parentComponent}
    >
      {/* <PlayerInteractionLayer
        handlePlayerInteractionClick={e => console.log(e)}
        parentComponent={parentComponent}
      /> */}

      <PlayerHero {...props} />

      <Hand
        cardsInHand={cardsInHandArray}
        disableInteraction={disableInteraction ? true : false}
        G={G}
        isDesktop={isDesktop}
        moves={moves}
        playerSpellDamage={playerSpellDamage[yourID]}
        selectedCardIndex={selectedCardIndex[yourID]}
        selectedCardInteractionContext={selectedCardIntCtx}
        selectedCardObject={selectedCardObject[yourID]}
        selectedCardUuid={selectedCardUuid}
        yourID={yourID}
      />
    </div>
  );
};

Player.propTypes = {
  G: PropTypes.object.isRequired,
  ctx: PropTypes.object.isRequired,
  moves: PropTypes.object.isRequired,
  parentComponent: PropTypes.string,
  yourID: PropTypes.string.isRequired
};

Player.defaultProps = {
  parentComponent: 'Player'
};

export default Player;
