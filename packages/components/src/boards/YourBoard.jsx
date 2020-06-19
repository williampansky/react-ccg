import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { PLAYER_BOARDS } from '@ccg/enums';
import { BoardDropArea, BoardSlot } from '@ccg/components';

const YourBoard = props => {
  const {
    G,
    ctx,
    moves,
    yourBoard,
    yourID,
    cardIsSelected,
    handleDropAreaClick
  } = props;

  return (
    <div
      className="player__board your__board"
      data-board={PLAYER_BOARDS[1]}
      data-board-id={yourID}
      data-component="YourBoard"
    >
      <div className="play__area">
        {yourBoard.length <= 6 ? (
          <BoardDropArea
            index={0}
            boardIsActive={cardIsSelected}
            areaIsAlone={cardIsSelected && yourBoard.length === 0}
            onClick={() => handleDropAreaClick(0)}
          />
        ) : null}
        {yourBoard.map((object, index) => {
          index = index + 1;
          return (
            <Fragment key={`fragment_${index}`}>
              <BoardSlot
                G={G}
                ctx={ctx}
                moves={moves}
                key={`slot_${index}`}
                board={PLAYER_BOARDS[1]}
                slotObject={object}
                index={index}
                playerID={yourID}
                // onClick={() => handleClick(index)}
              />
              {yourBoard.length <= 6 ? (
                <BoardDropArea
                  index={index + 1}
                  // boardIsActive={BOARD_IS_ACTIVE}
                  // onClick={() => dropMinion(index + 1)}
                />
              ) : null}
            </Fragment>
          );
        })}
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
  cardIsSelected: false
};

export default YourBoard;
