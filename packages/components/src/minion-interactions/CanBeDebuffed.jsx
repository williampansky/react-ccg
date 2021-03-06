import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { INTERACTIONS } from '@ccg/images';
import { RACE } from '@ccg/enums/src';
import { getMinionInteractionImage } from '@ccg/utils/src';

export default function CanBeDebuffed(props) {
  const {
    activeState,
    onClick,
    race,
    hasBulwark,
    canBeAttackedSrc,
    canBeAttackedBulwarkSrc,
    canBeAttackedLocSrc,
    canBeAttackedLocBulwarkSrc,
    canSetHoverTarget,
    handleHoverTargetFunction,
    index,
    slotObject,
    interactionImages: {
      canBeDebuffedLocBulwarkSrc,
      canBeDebuffedLocSrc,
      canBeDebuffedBulwarkSrc,
      canBeDebuffedSrc
    }
  } = props;

  const [styles, set, stop] = useSpring(() => ({
    opacity: 0,
    pointerEvents: 'none'
  }));

  const handleStyleSet = useCallback(
    bool => {
      set({
        opacity: bool ? 1 : 0,
        pointerEvents: bool ? 'auto' : 'none'
      });
    },
    [set]
  );

  useEffect(() => {
    handleStyleSet(activeState);
    return () => stop();
  }, [handleStyleSet, activeState, stop]);

  return (
    <animated.div
      className="minion__interaction minion__interaction--can-be-debuffed"
      data-file="minion-interactions/CanBeDebuffed"
      onClick={onClick}
      onKeyPress={onClick}
      role="button"
      tabIndex={0}
      style={styles}
      onMouseOverCapture={() => handleHoverTargetFunction(slotObject, index)}
      onMouseOutCapture={() => handleHoverTargetFunction(null, null)}
    >
      {race === RACE['LOCATION'] ? (
        hasBulwark ? (
          <img alt="" role="presentation" src={canBeDebuffedLocBulwarkSrc} />
        ) : (
          <img alt="" role="presentation" src={canBeDebuffedLocSrc} />
        )
      ) : hasBulwark ? (
        <img alt="" role="presentation" src={canBeDebuffedBulwarkSrc} />
      ) : (
        <img alt="" role="presentation" src={canBeDebuffedSrc} />
      )}
    </animated.div>
  );
}

CanBeDebuffed.propTypes = {};
