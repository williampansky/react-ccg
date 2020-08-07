import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useResponsive } from '@ccg/hooks';
import { PlayerHero } from '@ccg/components';

const Player = props => {
  const {
    abilitiesImageBase,
    abilitiesImageClose,
    avatarPlaceholderImageSrc,
    cardsInDeckCount,
    cardsInHandArray,
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
    selectedCardObject,
    selectedCardIndex,
    selectedCardUuid,
    yourId,
    parentComponent,
    selectedCardInteractionContext,
    playerSpellDamage
  } = props;

  const { isDesktop } = useResponsive();

  const handleCardInteractionClick = useCallback(
    (cardObject, index) => {
      if (selectedCardUuid) return console.log('deselect');
      else return selectCardFunction(cardObject, index);
      // else if (cardIsPlayable) return selectCardFunction(cardObject, index);
    },
    [selectedCardUuid, selectCardFunction]
  );

  return (
    <StyledComponent
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

      {/* <Hand
        cardsInHand={cardsInHandArray}
        deselectCardFunction={deselectCardFunction}
        selectCardFunction={selectCardFunction}
        handleCardInteractionClick={handleCardInteractionClick}
        imagesDataCards={imagesDataCards}
        imagesDataSets={imagesDataSets}
        selectedCardObject={selectedCardObject}
        selectedCardUuid={selectedCardUuid}
        selectedCardInteractionContext={selectedCardInteractionContext}
        disableInteraction={selectedCardInteractionContext ? true : false}
        isDesktop={isDesktop}
        handleCardHoverFunction={handleCardHoverFunction}
        selectCardContextFunction={selectCardContextFunction}
        yourId={yourId}
        playerSpellDamage={playerSpellDamage}
        selectedCardIndex={selectedCardIndex}
        handleInitTargetedCardFunction={handleInitTargetedCardFunction}
      /> */}
    </StyledComponent>
  );
};

const StyledComponent = styled.div`
  background: var(--board-theirPlayerArea-background-color);
  box-sizing: border-box;
`;

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
