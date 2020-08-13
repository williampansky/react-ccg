import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useResponsive } from '@ccg/hooks';
import { Hand, PlayerHero } from '@ccg/components';

const Player = props => {
  const {
    G,
    G: { players, playerSpellDamage, selectedCardIndex, selectedCardObject },
    ctx,
    moves: { hoverCard, deselectCard, initTargetedCard, selectCard },
    abilitiesImageBase,
    abilitiesImageClose,
    avatarPlaceholderImageSrc,
    cardsInDeckCount,
    cardsInHandCount,
    costGemImageSrc,
    deselectCardFunction,
    actionPointsCurrent,
    actionPointsTotal,
    heroAbilities,
    heroSymbol,
    imagesDataCards,
    imagesDataSets,
    playerDeck,
    playerHealthCurrent,
    playerHealthTotal,
    playerName,
    selectCardFunction,
    selectCardContextFunction,
    handleCardHoverFunction,
    handleInitTargetedCardFunction,
    selectedCardUuid,
    yourID,
    parentComponent,
    selectedCardInteractionContext
  } = props;

  const { isDesktop } = useResponsive();
  const cardsInHandArray = players[yourID].hand;

  const handleCardInteractionClick = useCallback(
    (cardObject, index) => {
      if (selectedCardUuid) return console.log('deselect');
      else return selectCardFunction(cardObject, index);
      // else if (cardIsPlayable) return selectCardFunction(cardObject, index);
    },
    [selectedCardUuid, selectCardFunction]
  );

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
        deselectCardFunction={() => deselectCard()}
        selectCardFunction={(obj, idx) => selectCard(obj, idx)}
        handleCardInteractionClick={handleCardInteractionClick}
        selectedCardObject={selectedCardObject[yourID]}
        selectedCardUuid={
          selectedCardObject[yourID] && selectedCardObject[yourID].uuid
        }
        selectedCardInteractionContext={selectedCardInteractionContext}
        disableInteraction={selectedCardInteractionContext ? true : false}
        isDesktop={isDesktop}
        handleCardHoverFunction={idx => hoverCard(idx)}
        selectCardContextFunction={selectCardContextFunction}
        yourID={yourID}
        playerSpellDamage={playerSpellDamage[yourID]}
        selectedCardIndex={selectedCardIndex[yourID]}
        handleInitTargetedCardFunction={(obj, idx) =>
          initTargetedCard(obj, idx)
        }
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
