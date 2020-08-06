import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { OpponentHero, OpponentInteractionLayer } from '@ccg/components';

const Opponent = props => {
  const {
    G,
    G: {
      playerCanBeAttackedByMinion,
      playercanBeAttackedByOnPlay,
      playerCanBeAttackedByPlayer,
      playerCanBeAttackedBySpell
    },
    ctx,
    moves,
    theirID
  } = props;

  return (
    <StyledComponent data-component="Opponent">
      <OpponentInteractionLayer
        G={G}
        ctx={ctx}
        moves={moves}
        canBeAttackedByMinion={playerCanBeAttackedByMinion[theirID]}
        canBeAttackedByOnPlay={playercanBeAttackedByOnPlay[theirID]}
        canBeAttackedByPlayer={playerCanBeAttackedByPlayer[theirID]}
        canBeAttackedBySpell={playerCanBeAttackedBySpell[theirID]}
      />

      <OpponentHero {...props} />

      {/* <Hero
        avatarPlaceholderImageSrc={avatarPlaceholderImageSrc}
        cardIsSelected={cardIsSelected}
        cardsInDeck={cardsInDeckCount}
        cardsInHand={cardsInHandCount}
        costGemImageSrc={costGemImageSrc}
        actionPointsCurrent={actionPointsCurrent}
        actionPointsTotal={actionPointsTotal}
        heroAbilities={heroAbilities}
        heroSymbol={heroSymbol}
        parentComponent={parentComponent}
        playerHealthCurrent={playerHealthCurrent}
        playerHealthTotal={playerHealthTotal}
        playerName={playerName}
        playerId={theirID}
        selectedCardContext={selectedCardContext}
      /> */}
    </StyledComponent>
  );
};

const StyledComponent = styled.div`
  background: var(--board-theirPlayerArea-background-color);
  box-sizing: border-box;
  position: relative;
  z-index: 1;
`;

Opponent.propTypes = {
  G: PropTypes.object.isRequired,
  ctx: PropTypes.object.isRequired,
  moves: PropTypes.object.isRequired,
  theirID: PropTypes.string.isRequired
};

Opponent.defaultProps = {};

export default Opponent;
