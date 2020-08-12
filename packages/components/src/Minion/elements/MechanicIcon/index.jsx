import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';

const MechanicIcon = props => {
  const { MECHANICS_IMAGES: img } = useSelector(s => s.images);
  const {
    hasBoon,
    hasBoonSrc,
    hasDoubleAttack,
    hasDoubleAttackSrc,
    hasEventListener,
    hasEventListenerSrc,
    hasOnDeath,
    hasOnDeathSrc,
    hasPoison,
    hasPoisonSrc,
    willExpire,
    willExpireIn
  } = props;

  if (willExpire) {
    return (
      <div
        className={[
          styles['minion__mechanics'],
          styles['minion__mechanics--will-expire']
        ].join(' ')}
      >
        <span className="text__value">{willExpireIn}</span>
      </div>
    );
  } else if (hasBoon) {
    return (
      <div className={styles['minion__mechanics']}>
        <img alt="hasBoon" src={img['BOON.png']} />
      </div>
    );
  } else if (hasOnDeath) {
    return (
      <div className={styles['minion__mechanics']}>
        <img alt="hasOnDeath" src={img['ON_DEATH.png']} />
      </div>
    );
  } else if (hasEventListener) {
    return (
      <div className={styles['minion__mechanics']}>
        <img alt="hasEventListener" src={img['EVENT.png']} />
      </div>
    );
  } else if (hasPoison) {
    return (
      <div className={styles['minion__mechanics']}>
        <img alt="hasPoison" src={img['POISON.png']} />
      </div>
    );
  } else if (hasDoubleAttack) {
    return (
      <div className={styles['minion__mechanics']}>
        <img alt="hasDoubleAttack" src={img['DOUBLE_ATTACK.png']} />
      </div>
    );
  } else {
    return null;
  }
};

MechanicIcon.propTypes = {
  hasBoon: PropTypes.bool,
  hasDoubleAttack: PropTypes.bool,
  hasEventListener: PropTypes.bool,
  hasOnDeath: PropTypes.bool,
  hasPoison: PropTypes.bool
};

MechanicIcon.defaultProps = {
  hasBoon: false,
  hasDoubleAttack: false,
  hasEventListener: false,
  hasOnDeath: false,
  hasPoison: false
};

export default MechanicIcon;
