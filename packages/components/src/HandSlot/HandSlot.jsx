import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { CardInteractionLayer } from '@ccg/components';

const HandSlot = props => {
  const {
    cardImageBaseSrc,
    cardImageFlairSrc,
    cardObject,
    cardUuid,
    handleCardInteractionClick,
    selectedCardUuid,
    slotIndex,
    isDesktop,
    isEnhanced,
    isPlayable
  } = props;

  return (
    <div
      className={[styles['hand__slot']].join(' ')}
      data-component="HandSlot"
      data-index={slotIndex}
    >
      <CardInteractionLayer
        card={cardObject}
        cardImageBaseSrc={cardImageBaseSrc}
        cardImageFlairSrc={cardImageFlairSrc}
        handleCardInteractionClick={handleCardInteractionClick}
        index={slotIndex}
        isPlayable={isPlayable}
        isSelected={selectedCardUuid === cardUuid ? true : false}
        isDesktop={isDesktop}
        {...props}
      />
    </div>
  );
};

HandSlot.propTypes = {
  cardImageBaseSrc: PropTypes.string.isRequired,
  cardImageFlairSrc: PropTypes.string.isRequired,
  cardObject: PropTypes.object.isRequired,
  cardUuid: PropTypes.string.isRequired,
  handleCardInteractionClick: PropTypes.func,
  selectedCardUuid: PropTypes.string,
  slotIndex: PropTypes.number.isRequired,
  trayIsExpanded: PropTypes.bool,
  isDesktop: PropTypes.bool.isRequired
};

HandSlot.defaultProps = {
  // handleCardInteractionClick: () => {
  //   console.error(
  //     'HandSlot: handleCardInteractionClick() provided as a defaultProp'
  //   );
  // },
  selectedCardUuid: null,
  trayIsExpanded: false,
  handleMouseEnter: () => {},
  handleMouseLeave: () => {}
};

export default HandSlot;
