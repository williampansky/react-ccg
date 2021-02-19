import React from 'react';
import PropTypes from 'prop-types';
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
    theirID,
    parentComponent
  } = props;

  return (
    <div className={['opponent'].join(' ')} data-component={parentComponent}>
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
    </div>
  );
};

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
