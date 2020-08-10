import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

const BoardDropArea = props => {
  const { areaIsAlone, cantDropMinion, boardIsActive, index, onClick } = props;
  return (
    <Styled.Component
      areaIndex={index}
      areaIsAlone={areaIsAlone}
      boardIsActive={boardIsActive}
      cantDropMinion={cantDropMinion}
      data-component="BoardDropArea"
      data-index={index}
      onMouseUp={onClick}
      role="button"
      tabIndex={0}
    />
  );
};

BoardDropArea.propTypes = {
  areaIsAlone: PropTypes.bool.isRequired,
  cantDropMinion: PropTypes.bool.isRequired,
  boardIsActive: PropTypes.bool.isRequired,
  index: PropTypes.number,
  onClick: PropTypes.func
};

BoardDropArea.defaultProps = {
  onClick: () => {}
};

export default BoardDropArea;
