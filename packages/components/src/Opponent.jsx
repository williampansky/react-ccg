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
  parentComponent: PropTypes.string,
  theirID: PropTypes.string.isRequired
};

Opponent.defaultProps = {
  parentComponent: 'Opponent'
};

export default Opponent;
