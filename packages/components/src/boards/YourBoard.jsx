import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  PLAYER_BOARDS,
  YOUR_INTERACTION_KEYS as intKeys,
  TYPE
} from '@ccg/enums';
import { BoardDropArea, BoardSlot } from '@ccg/components';

const YourBoard = props => {
  const {
    G,
    G: {
      selectedCardObject,
      hoveringTargetIndex,
      hoveringTargetObject,
      selectedMinionObject,
      selectedMinionIndex,
      spellObject,
      playerSpellDamage
    },
    ctx,
    moves,
    cardIsLocked,
    cardIsSelected,
    interactionImages,
    mechanicImages,
    minionIsSelected,
    uiTooltipSrc,
    theirBoardLength,
    yourBoard,
    yourID
  } = props;

  const {
    deselectMinion,
    playMinionCard,
    selectMinion,
    targetMinionWithSpell
  } = moves;

  const handleDropAreaClick = useCallback(
    slotIndexClicked => {
      return playMinionCard(slotIndexClicked);
    },
    [playMinionCard]
  );

  return (
    <div
      className={[
        'player__board',
        'your__board',
        cardIsLocked ? 'board--is-active' : ''
      ].join(' ')}
      data-board={PLAYER_BOARDS[1]}
      data-board-id={yourID}
      data-board-length={yourBoard.length}
      data-your-board-length={yourBoard.length}
      data-their-board-length={theirBoardLength}
      data-component="YourBoard"
    >
      <div className="play__area">
        <div className="board__slot__spacer" />

        {yourBoard.length <= 6 ? (
          <BoardDropArea
            index={0}
            boardIsActive={
              cardIsLocked ||
              (selectedCardObject[yourID] &&
                selectedCardObject[yourID].type === TYPE['MINION'])
            }
            areaIsAlone={yourBoard.length === 0}
            onClick={() => handleDropAreaClick(0)}
          />
        ) : null}

        {yourBoard.map((object, index) => {
          return (
            <Fragment key={`fragment_${index}`}>
              <BoardSlot
                board={PLAYER_BOARDS[1]}
                ctx={ctx}
                moves={moves}
                boardLength={yourBoard.length}
                hoveringTargetIndex={hoveringTargetIndex}
                hoveringTargetObject={hoveringTargetObject}
                index={index}
                interactionImages={interactionImages}
                key={`slot_${index}`}
                mechanicImages={mechanicImages}
                playerID={yourID}
                playerSpellDamage={playerSpellDamage[yourID]}
                selectedMinionIndex={selectedMinionIndex}
                selectedMinionObject={selectedMinionObject}
                slotObject={object}
                spellObject={spellObject[yourID]}
                uiTooltipSrc={uiTooltipSrc}
                yourID={yourID}
              />

              <BoardDropArea
                index={index + 1}
                boardIsActive={
                  cardIsLocked ||
                  (selectedCardObject[yourID] &&
                    selectedCardObject[yourID].type === TYPE['MINION'])
                }
                cantDropMinion={yourBoard.length >= 7}
                onClick={() => handleDropAreaClick(index + 1)}
              />
            </Fragment>
          );
        })}

        <div className="board__slot__spacer" />
      </div>
    </div>
  );
};

YourBoard.propTypes = {
  yourID: PropTypes.string.isRequired,
  yourBoard: PropTypes.array,
  handleDropAreaClick: PropTypes.func,
  cardIsSelected: PropTypes.bool
};

YourBoard.defaultProps = {
  yourBoard: [],
  handleDropAreaClick: () => {},
  cardIsSelected: false,
  cardIsLocked: false
};

export default YourBoard;
