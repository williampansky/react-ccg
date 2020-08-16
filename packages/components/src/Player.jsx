import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useResponsive } from '@ccg/hooks';
import { Hand, PlayerHero } from '@ccg/components';

const Player = props => {
  const {
    G,
    G: { players, playerSpellDamage, selectedCardIndex, selectedCardObject },
    moves,
    parentComponent,
    selectCardContextFunction,
    selectedCardInteractionContext,
    yourID
  } = props;

  const { isDesktop } = useResponsive();
  const cardsInHandArray = players[yourID].hand;
  const selectedCardObj = selectedCardObject[yourID];
  const selectedCardUuid = selectedCardObj && selectedCardObj.uuid;

  return (
    <div
      className={[
        'player',
        selectedCardInteractionContext ? 'disable-interaction' : ''
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
        disableInteraction={selectedCardInteractionContext ? true : false}
        G={G}
        isDesktop={isDesktop}
        moves={moves}
        playerSpellDamage={playerSpellDamage[yourID]}
        selectCardContextFunction={selectCardContextFunction}
        selectedCardIndex={selectedCardIndex[yourID]}
        selectedCardInteractionContext={selectedCardInteractionContext}
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
