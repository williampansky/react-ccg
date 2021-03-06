import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { MECHANICS, PLAY_CONTEXT, PLAY_TYPE } from '@ccg/enums';
import { getHeroImage, removeSymbols } from '@ccg/utils';
import { AppIcon } from '@ccg/components';

/**
 * @requires AppIcon
 */
const HeroAbilityButton = props => {
  const {
    abilityLocked,
    cooldown,
    cooldownCurrentCount,
    cooldownInEffect,
    cost,
    costImageSrc,
    heroSymbol,
    index,
    mechanics,
    name,
    playContext,
    playType,
    ultimate
  } = props;

  const handleAbilityIcon = useCallback(
    (cardMechanics, playType, playContext) => {
      if (playType === PLAY_TYPE['TARGETED']) return 'TARGET';
      else if (playContext === PLAY_CONTEXT['SUMMON']) return 'SUMMON';
      else if (cardMechanics.includes(MECHANICS['AOE'])) return 'AOE';
      else if (cardMechanics.includes(MECHANICS['DAMAGE'])) return 'DAMAGE';
    },
    []
  );

  return (
    <Fragment>
      {abilityLocked ? (
        <div
          className={[
            styles['overlay'],
            styles['locked__overlay'],
            styles['overlay--in-effect']
          ].join(' ')}
        >
          <AppIcon color="white" fileName="icon-uikit-lock" size="32px" />
        </div>
      ) : null}

      {!abilityLocked ? (
        <div
          className={[
            styles['overlay'],
            cooldownInEffect ? styles['overlay--in-effect'] : ''
          ].join(' ')}
        >
          <div className="text__value">{cooldownCurrentCount}</div>
        </div>
      ) : null}

      {!abilityLocked ? (
        <div
          className={[
            styles['main__button__cost'],
            cooldownInEffect ? styles['overlay--in-effect'] : ''
          ].join(' ')}
        >
          <div className={styles['main__button__cost--gem']}>
            <div className="text__value">{cost}</div>
            <img alt="" role="presentation" src={costImageSrc} />
          </div>
          <div className={styles['main__button__cost--cooldown']}>
            <div>
              <div className="text__value">{ultimate ? 'Ult' : cooldown}</div>
            </div>
            <AppIcon fileName="icon-uikit-refresh" />
          </div>
        </div>
      ) : null}

      {!abilityLocked ? (
        <div
          className={[
            styles['main__button__spell__type'],
            cooldownInEffect ? styles['overlay--in-effect'] : ''
          ].join(' ')}
        >
          <AppIcon
            color="white"
            fileName={handleAbilityIcon(mechanics, playType, playContext)}
          />
        </div>
      ) : null}

      <img
        alt={name}
        className={styles['main__button__icon']}
        role="presentation"
        src={getHeroImage(
          heroSymbol,
          `${removeSymbols(heroSymbol)}_00${index}`
        )}
      />
    </Fragment>
  );
};

HeroAbilityButton.propTypes = {
  abilityLocked: PropTypes.bool,
  cooldown: PropTypes.number,
  cooldownCurrentCount: PropTypes.number,
  cooldownInEffect: PropTypes.bool,
  cost: PropTypes.number,
  costImageSrc: PropTypes.string,
  heroSymbol: PropTypes.string,
  index: PropTypes.number,
  mechanics: PropTypes.array,
  name: PropTypes.string,
  playContext: PropTypes.string,
  playType: PropTypes.string,
  ultimate: PropTypes.bool
};

export default HeroAbilityButton;
