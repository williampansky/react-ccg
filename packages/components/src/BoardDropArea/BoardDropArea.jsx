import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

const BoardDropArea = props => {
  const { areaIsAlone, cantDropMinion, boardIsActive, index, onClick } = props;
  return (
    <Styled.Component
      data-component="BoardDropArea"
      data-area-is-alone={areaIsAlone}
      data-board-is-active={boardIsActive}
      data-cant-drop-minion={cantDropMinion}
      data-index={index}
      onMouseUp={onClick}
      role="button"
      tabIndex={0}
    />
  );
};

BoardDropArea.propTypes = {
  areaIsAlone: PropTypes.bool,
  cantDropMinion: PropTypes.bool,
  boardIsActive: PropTypes.bool,
  index: PropTypes.number,
  onClick: PropTypes.func
};

BoardDropArea.defaultProps = {
  onClick: () => {}
};

export default BoardDropArea;
