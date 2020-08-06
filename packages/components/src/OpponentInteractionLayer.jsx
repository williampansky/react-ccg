import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import styles from './styles.module.scss';
// import {
//   OpponentCanBeAttackedByMinion,
//   OpponentCanBeAttackedByOnPlay,
//   OpponentCanBeAttackedByPlayer,
//   OpponentCanBeAttackedBySpell
// } from '@ccg/components';

const OpponentInteractionLayer = props => {
  const {
    G: { selectedMinionIndex },
    ctx: { currentPlayer },
    moves: {
      attackPlayerWithMinion,
      resetAttackedMinionIndex,
      resetMinionIsAttacking,
      resetMinionIsAttackingPlayer
    },
    canBeAttackedByMinion,
    canBeAttackedByOnPlay,
    canBeAttackedByPlayer,
    canBeAttackedBySpell
  } = props;

  const [activeState, setActiveState] = useState(null);

  const handleActiveStateCallback = useCallback(
    (byMinion, byOnPlay, byPlayer, bySpell) => {
      if (byMinion) return setActiveState('canBeAttackedByMinion');
      if (byOnPlay) return setActiveState('canBeAttackedByOnPlay');
      if (byPlayer) return setActiveState('canBeAttackedByPlayer');
      if (bySpell) return setActiveState('canBeAttackedBySpell');
      else return setActiveState(null);
    },
    []
  );

  useEffect(() => {
    handleActiveStateCallback(
      canBeAttackedByMinion,
      canBeAttackedByOnPlay,
      canBeAttackedByPlayer,
      canBeAttackedBySpell
    );
  }, [
    handleActiveStateCallback,
    canBeAttackedByMinion,
    canBeAttackedByOnPlay,
    canBeAttackedByPlayer,
    canBeAttackedBySpell
  ]);

  const handleAnimationCallback = useCallback(() => {
    setTimeout(() => {
      resetAttackedMinionIndex();
      resetMinionIsAttacking(selectedMinionIndex[currentPlayer]);
      resetMinionIsAttackingPlayer(selectedMinionIndex[currentPlayer]);
    }, 250);
  }, [
    currentPlayer,
    resetMinionIsAttacking,
    resetMinionIsAttackingPlayer,
    selectedMinionIndex,
    resetAttackedMinionIndex
  ]);

  const handleInteractionClick = useCallback(
    state => {
      if (state === 'canBeAttackedByMinion') {
        attackPlayerWithMinion();
        return handleAnimationCallback();
      }
    },
    [attackPlayerWithMinion, handleAnimationCallback]
  );

  return (
    <StyledComponent data-component="OpponentInteractionLayer">
      {/* <OpponentCanBeAttackedByMinion
        activeState={activeState === 'canBeAttackedByMinion' ? true : false}
        onClick={() => handleInteractionClick(activeState)}
      />
      <OpponentCanBeAttackedByOnPlay
        activeState={activeState === 'canBeAttackedByOnPlay' ? true : false}
        onClick={() => console.log('canBeAttackedByOnPlay')}
      />
      <OpponentCanBeAttackedByPlayer
        activeState={activeState === 'canBeAttackedByPlayer' ? true : false}
        onClick={() => console.log('canBeAttackedByPlayer')}
      />
      <OpponentCanBeAttackedBySpell
        activeState={activeState === 'canBeAttackedBySpell' ? true : false}
        onClick={() => console.log('canBeAttackedBySpell')}
      /> */}
    </StyledComponent>
  );
};

const StyledComponent = styled.div`
  background: transparent;
  display: block;
  height: 100%;
  outline: none;
  position: absolute;
  width: 100%;
  z-index: calc(var(--zIndex-Hero) - 1);

  & + [data-component='Hero'] {
    pointer-events: none;
  }

  @media (min-width: 960px) {
    left: 0;
    right: 0;
    max-width: 1025px;
    margin: 0 auto;
  }

  @media (min-width: 1100px) {
    max-width: 1025px;
  }
`;

OpponentInteractionLayer.propTypes = {
  canBeAttackedByMinion: PropTypes.bool,
  canBeAttackedByOnPlay: PropTypes.bool,
  canBeAttackedByPlayer: PropTypes.bool,
  canBeAttackedBySpell: PropTypes.bool
};

OpponentInteractionLayer.defaultProps = {
  canBeAttackedByMinion: false,
  canBeAttackedByOnPlay: false,
  canBeAttackedByPlayer: false,
  canBeAttackedBySpell: false
};

export default OpponentInteractionLayer;
