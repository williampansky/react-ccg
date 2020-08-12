import React from 'react';
import PropTypes from 'prop-types';
import { PLAYER_BOARDS, PLAY_TYPE, TYPE } from '@ccg/enums';
import { TheirBoard, YourBoard } from '@ccg/components';
import * as Styled from './styled';
import {
  getMechanicImage as gMI,
  getMinionInteractionImage as gII,
  getUiImage
} from '@ccg/utils';

const Board = props => {
  const {
    G,
    G: {
      boards,
      selectedCardPlayType,
      selectedCardType,
      selectedMinionObject,
      selectedCardObject
    },
    ctx,
    moves,
    moves: { playGlobalSpellCard },
    theirID,
    yourID,
    cardIsSelected,
    cardIsLocked,
    mechanicImages
  } = props;

  const handleCardPlay = () => {
    if (selectedCardObject[yourID] === null) return;
    const { cost, id, set, uuid } = selectedCardObject[yourID];
    return playGlobalSpellCard(cost, id, set, uuid);
  };

  const mechImages = {
    boonSrc: gMI('BOON.png'),
    bubbleSrc: gMI('BUBBLE.png'),
    disabledSrc: gMI('DISABLED.png'),
    doubleAttackSrc: gMI('DOUBLE_ATTACK.png'),
    eventListenerSrc: gMI('EVENT.png'),
    onDeathSrc: gMI('ON_DEATH.png'),
    poisonSrc: gMI('POISON.png'),
    isHiddenSrc: gMI('HIDDEN.png')
  };

  const intImages = {
    canAttack: gII('CanAttack--Default.png'),
    canAttackBulwark: gII('CanAttack--Bulwark.png'),
    canBeAttacked: gII('CanBeAttacked--Default.png'),
    canBeAttackedBulwark: gII('CanBeAttacked--Default--Bulwark.png'),
    canBeAttackedLocation: gII('CanBeAttacked--Location.png'),
    canBeAttackedLocationBulwark: gII('CanBeAttacked--Location--Bulwark.png'),
    canBeBuffed: gII('CanBeBuffed--Default.png'),
    canBeBuffedBulwark: gII('CanBeBuffed--Bulwark.png'),
    canBeBuffedLocation: gII('CanBeBuffed--Location.png'),
    canBeBuffedLocationBulwark: gII('CanBeBuffed--Location--Bulwark.png'),
    canBeDebuffed: gII('CanBeDebuffed--Default.png'),
    canBeDebuffedBulwark: gII('CanBeDebuffed--Default--Bulwark.png'),
    canBeDebuffedLocation: gII('CanBeDebuffed--Location.png'),
    canBeDebuffedLocationBulwark: gII('CanBeDebuffed--Location--Bulwark.png'),
    isAttacking: gII('IsAttacking--Default.png'),
    isAttackingBulwark: gII('IsAttacking--Bulwark.png'),
    willDieOverlayTheirs: gII('WillDie-TheirBoard.png'),
    willDieOverlayYours: gII('WillDie-YourBoard.png')
  };

  const uiTooltipImage = getUiImage('UI_Tooltip.png');

  return (
    <Styled.Component data-component="Board">
      <TheirBoard
        G={G}
        ctx={ctx}
        moves={moves}
        playerBoard={PLAYER_BOARDS[2]}
        theirBoard={boards[theirID]}
        theirBoardLength={boards[theirID].length}
        theirID={theirID}
        uiTooltipSrc={uiTooltipImage}
        yourID={yourID}
      />

      <YourBoard
        G={G}
        ctx={ctx}
        moves={moves}
        cardIsLocked={cardIsLocked}
        cardIsSelected={cardIsSelected}
        minionIsSelected={selectedMinionObject[yourID] ? true : false}
        playerBoard={PLAYER_BOARDS[1]}
        theirBoardLength={boards[theirID].length}
        uiTooltipSrc={uiTooltipImage}
        yourBoard={boards[yourID]}
        yourID={yourID}
      />

      {/* <CardPlayArea
        active={
          selectedCardPlayType[yourID] === PLAY_TYPE['GLOBAL'] &&
          selectedCardType[yourID] !== TYPE['MINION']
        }
        onMouseUp={() => handleCardPlay()}
      /> */}
    </Styled.Component>
  );
};

Board.propTypes = {
  theirID: PropTypes.string.isRequired,
  theirBoard: PropTypes.array,
  yourID: PropTypes.string.isRequired,
  yourBoard: PropTypes.array
};

Board.defaultProps = {
  theirBoard: [],
  yourBoard: [],
  cardIsSelected: false
};

export default Board;
