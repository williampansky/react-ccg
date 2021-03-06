import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { PLAY_TYPE, RACE, RARITY, SET, TYPE } from '@ccg/enums';
import {
  CARD_ASSETS as ASSETS,
  PLACEHOLDER_BASE_IMAGE,
  PLACEHOLDER_IMAGE
} from '@ccg/images';
import {
  createMarkup,
  exists,
  fontSizeBasedOnCharacterLength,
  formatCardText,
  getCardAssetImage,
  replaceConstant
} from '@ccg/utils';

// child elements
import CardAttack from './elements/CardAttack';
import CardBaseImage from './elements/CardBaseImage';
import CardCost from './elements/CardCost';
import CardFlairImage from './elements/CardFlairImage';
import CardHealth from './elements/CardHealth';
import CardName from './elements/CardName';
import CardRarityGem from './elements/CardRarityGem';
import CardSubTypeBadge from './elements/CardSubTypeBadge';
import CardText from './elements/CardText';
import CardTypeBadge from './elements/CardTypeBadge';
import CardTypeLabel from './elements/CardTypeLabel';
import { useCallback } from 'react';

const Card = ({
  active,
  artist,
  attack,
  collectible,
  cost,
  deckBuilder,
  dev,
  elite,
  entourage,
  flavor,
  health,
  howToEarn,
  howToEarnGolden,
  id,
  imageBaseSrc,
  imageFlairSrc,
  imagePlaceholderSrc,
  isGolden,
  mechanics,
  name,
  numberOvercharge,
  numberPrimary,
  numberRNG,
  numberSecondary,
  onClick,
  playContext,
  playRequirements,
  playType,
  race,
  rarity,
  set,
  sounds,
  spellDmgBoon,
  targetingArrowText,
  text,
  type,
  uuid
}) => {
  const formattedCardText = useCallback(() => {
    return replaceConstant(
      formatCardText(text, numberPrimary, numberSecondary, spellDmgBoon)
    );
  }, [text, numberPrimary, numberSecondary, spellDmgBoon]);

  return (
    <div
      className={[
        styles['card'],
        styles[`card--type-${replaceConstant(type).toUpperCase()}`],
        dev ? styles['dev'] : ''
      ].join(' ')}
      data-component="Card"
      id={uuid}
      onClick={onClick}
      onKeyPress={onClick}
      role={deckBuilder ? 'button' : null}
      tabIndex={deckBuilder ? 0 : null}
    >
      <CardCost cost={cost} />

      {rarity !== RARITY['NONE'] && rarity !== RARITY['FREE'] ? (
        <CardRarityGem
          rarity={rarity}
          gemImgAlt={replaceConstant(rarity)}
          gemImgSrc={getCardAssetImage('rarity', rarity, elite, ASSETS)}
        />
      ) : null}

      {type !== TYPE['NONE'] ? (
        <CardTypeLabel
          formatter={replaceConstant}
          race={race}
          raceEnums={RACE}
          type={type}
          typeEnums={TYPE}
        />
      ) : null}

      <Suspense fallback={<div className={styles['loader']} />}>
        <CardFlairImage
          imageSrc={imageFlairSrc}
          name={name}
          placeholderSrc={imagePlaceholderSrc}
        />
      </Suspense>

      <CardName
        formatter={fontSizeBasedOnCharacterLength}
        name={replaceConstant(name)}
      />

      {type !== TYPE['NONE'] ? (
        <CardTypeBadge
          badgeImgSrc={getCardAssetImage('type', 'WRAPPER', elite, ASSETS)}
          typeIconAlt={replaceConstant(type)}
          typeImgSrc={getCardAssetImage('type', type, elite, ASSETS)}
        />
      ) : null}

      {exists(race) && race !== RACE['NONE'] && type === TYPE['MINION'] ? (
        <CardSubTypeBadge
          badgeImgSrc={getCardAssetImage('type', 'WRAPPER', elite, ASSETS)}
          subtypeIconAlt={replaceConstant(race)}
          subtypeImgSrc={getCardAssetImage('subtype', race, elite, ASSETS)}
        />
      ) : null}

      {text ? <CardText text={createMarkup(formattedCardText())} /> : null}

      {type === TYPE['MINION'] || type === TYPE['WEAPON'] ? (
        <React.Fragment>
          <CardAttack
            attack={attack}
            badgeImgSrc={getCardAssetImage('attack', null, elite, ASSETS)}
            elite={elite}
          />

          <CardHealth
            badgeImgSrc={getCardAssetImage('health', null, elite, ASSETS)}
            health={health}
            elite={elite}
          />
        </React.Fragment>
      ) : null}

      <Suspense fallback={<div className={styles['loader']} />}>
        <CardBaseImage
          imageAlt={replaceConstant(rarity)}
          imageSrc={imageBaseSrc}
          placeholderBaseSrc={PLACEHOLDER_BASE_IMAGE}
          useReactImage={true}
        />
      </Suspense>
    </div>
  );
};

Card.propTypes = {
  active: PropTypes.bool.isRequired,
  artist: PropTypes.string,
  attack: PropTypes.number,
  collectible: PropTypes.bool.isRequired,
  cost: PropTypes.number.isRequired,
  deckBuilder: PropTypes.bool,
  dev: PropTypes.bool,
  elite: PropTypes.bool.isRequired,
  entourage: PropTypes.array,
  flavor: PropTypes.string,
  health: PropTypes.number,
  howToEarn: PropTypes.string,
  howToEarnGolden: PropTypes.string,
  id: PropTypes.string.isRequired,
  imageBaseSrc: PropTypes.string.isRequired,
  imageFlairSrc: PropTypes.string.isRequired,
  imagePlaceholderSrc: PropTypes.string,
  isGolden: PropTypes.bool.isRequired,
  mechanics: PropTypes.array,
  name: PropTypes.string.isRequired,
  numberOvercharge: PropTypes.number,
  numberPrimary: PropTypes.number,
  numberRNG: PropTypes.number,
  numberSecondary: PropTypes.number,
  onClick: PropTypes.func,
  playContext: PropTypes.string,
  playRequirements: PropTypes.array,
  playType: PropTypes.string.isRequired,
  race: PropTypes.string,
  rarity: PropTypes.string.isRequired,
  set: PropTypes.string.isRequired,
  sounds: PropTypes.object,
  spellDmgBoon: PropTypes.number,
  targetingArrowText: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired
};

Card.defaultProps = {
  active: false,
  artist: null,
  attack: 0,
  collectible: false,
  cost: 0,
  deckBuilder: false,
  dev: false,
  elite: false,
  entourage: [],
  flavor: null,
  health: 1,
  howToEarn: null,
  howToEarnGolden: null,
  id: 'CARD_ID',
  imageBaseSrc: PLACEHOLDER_BASE_IMAGE,
  imageFlairSrc: null,
  imagePlaceholderSrc: PLACEHOLDER_IMAGE,
  isGolden: false,
  mechanics: [],
  name: 'CARD_NAME',
  numberOvercharge: 0,
  numberPrimary: 0,
  numberRNG: 0,
  numberSecondary: 0,
  onClick: () => {},
  playContext: null,
  playRequirements: [],
  playType: PLAY_TYPE['GLOBAL'],
  race: RACE['NONE'],
  rarity: RARITY['NONE'],
  set: SET[1],
  sounds: {},
  spellDmgBoon: 0,
  targetingArrowText: null,
  text: null,
  type: TYPE['NONE'],
  uuid: ''
};

export default Card;
