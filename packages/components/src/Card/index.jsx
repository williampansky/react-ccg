import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { PLAY_TYPE, RACE, RARITY, SET, TYPE } from '@ccg/enums';
import {
  CARD_ASSETS,
  PLACEHOLDER_BASE_IMAGE,
  PLACEHOLDER_IMAGE
} from '@ccg/images';
import {
  createMarkup,
  exists,
  fontSizeBasedOnCharacterLength,
  formatCardText,
  getCardAssetImage,
  removeSymbols,
  replaceConstant
} from '@ccg/utils';

// child elements
import CardAttack from './elements/card-attack';
import CardBaseImage from './elements/card-base-image';
import CardCost from './elements/card-cost';
import CardFlairImage from './elements/card-flair-image';
import CardHealth from './elements/card-health';
import CardRarityGem from './elements/card-rarity-gem';

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
  targetingArrowText,
  text,
  type
}) => {
  return (
    <div
      className={[
        styles['card'],
        styles[`card--type-${replaceConstant(type).toUpperCase()}`],
        dev ? styles['dev'] : ''
      ].join(' ')}
      onClick={onClick}
      onKeyPress={onClick}
      role={deckBuilder ? 'button' : null}
      tabIndex={deckBuilder ? 0 : null}
    >
      <CardCost cost={cost} />
      <CardRarityGem
        rarity={rarity}
        gemImgSrc={getCardAssetImage('rarity', rarity, elite, CARD_ASSETS)}
        rarityEnums={RARITY}
      />
      <CardFlairImage
        imageSrc={imageFlairSrc}
        name={name}
        placeholderSrc={imagePlaceholderSrc}
      />
      <CardBaseImage imageSrc={imageBaseSrc} />
      <CardAttack
        attack={attack}
        badgeImgSrc={getCardAssetImage('attack', null, elite, CARD_ASSETS)}
        elite={elite}
        type={type}
        typeEnums={TYPE}
      />
      <CardHealth
        badgeImgSrc={getCardAssetImage('health', null, elite, CARD_ASSETS)}
        health={health}
        elite={elite}
        type={type}
        typeEnums={TYPE}
      />

      {/* 
      {name ? (
        <div className={'card__name'}>
          <div
            className={'text__value'}
            style={{ fontSize: `${fontSizeBasedOnCharacterLength(NAME)}em` }}
          >
            {NAME}
          </div>
        </div>
      ) : null}

      {text ? (
        <div className={'card__text'}>
          <p
            className={'text__value'}
            dangerouslySetInnerHTML={createMarkup(
              formatCardText(
                text,
                numberPrimary,
                numberSecondary,
                dynamicSpellDamageText
              )
            )}
          />
        </div>
      ) : null}

      {IS_MINION ? (
        race !== RACE[0] ? (
          <div className={'card__type'}>
            <div>{replaceConstant(race)}</div>
          </div>
        ) : (
          <div className={'card__type'}>
            <div>{replaceConstant(type)}</div>
          </div>
        )
      ) : (
        <div className={'card__type'}>
          <div>{replaceConstant(type)}</div>
        </div>
      )}

      {rarity !== RARITY[0] && rarity !== RARITY[1] ? (
        <img
          alt=""
          className={`card__rarity__gem`}
          data-rarity={rarity.toUpperCase()}
          src={`/images/gems/Gem_Rarity_${replaceConstant(
            rarity
          ).toUpperCase()}.png`}
        />
      ) : null}

      {type ? (
        <div className={`card__type__image__wrapper`}>
          <div className={`card__type__image__icon__wrapper`}>
            <img
              alt=""
              className={`card__type__image`}
              src={`/images/card-assets/TYPE_${replaceConstant(
                type
              ).toUpperCase()}.png`}
            />
          </div>
          {IS_WEAPON || playContext === '%DAMAGE%' ? (
            <img
              alt=""
              className={`card__type__image__badge`}
              src={`/images/card-assets/Card_Type_Board.png`}
            />
          ) : (
            <img
              alt=""
              className={`card__type__image__badge`}
              src={`/images/card-assets/Card_Type_Board.png`}
            />
          )}
        </div>
      ) : null}

      {exists(race) && race !== RACE[0] && IS_MINION ? (
        <div className={`card__subtype__image__wrapper`}>
          <div className={`card__subtype__image__icon__wrapper`}>
            <img
              alt=""
              className={`card__subtype__image`}
              src={`/images/card-assets/SUBTYPE_${removeSymbols(
                race
              ).toUpperCase()}.png`}
            />
          </div>
          {IS_WEAPON || playContext === '%DAMAGE%' ? (
            <img
              alt=""
              className={`card__subtype__image__badge`}
              src={`/images/card-assets/Card_Type_Board.png`}
            />
          ) : (
            <img
              alt=""
              className={`card__subtype__image__badge`}
              src={`/images/card-assets/Card_Type_Board.png`}
            />
          )}
        </div>
      ) : null}

      {IS_MINION || IS_WEAPON ? (
        <img
          alt=""
          className={`card__base__image`}
          src={`/images/cards/front/${replaceConstant(
            rarity
          ).toUpperCase()}.png`}
        />
      ) : (
        <img
          alt=""
          className={`card__base__image`}
          src={`/images/cards/front/${replaceConstant(
            rarity
          ).toUpperCase()}-ALT.png`}
        />
      )} */}
    </div>
  );
};

Card.propTypes = {
  active: PropTypes.bool,
  artist: PropTypes.string,
  attack: PropTypes.number,
  collectible: PropTypes.bool,
  cost: PropTypes.number,
  deckBuilder: PropTypes.bool,
  dev: PropTypes.bool,
  elite: PropTypes.bool,
  entourage: PropTypes.array,
  flavor: PropTypes.string,
  health: PropTypes.number,
  howToEarn: PropTypes.string,
  howToEarnGolden: PropTypes.string,
  id: PropTypes.string,
  imageBaseSrc: PropTypes.string,
  imageFlairSrc: PropTypes.string,
  imagePlaceholderSrc: PropTypes.string,
  isGolden: PropTypes.bool,
  mechanics: PropTypes.array,
  name: PropTypes.string,
  numberOvercharge: PropTypes.number,
  numberPrimary: PropTypes.number,
  numberRNG: PropTypes.number,
  numberSecondary: PropTypes.number,
  onClick: PropTypes.func,
  playContext: PropTypes.string,
  playRequirements: PropTypes.array,
  playType: PropTypes.string,
  race: PropTypes.string,
  rarity: PropTypes.string,
  set: PropTypes.string,
  sounds: PropTypes.object,
  targetingArrowText: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string
};

Card.defaultProps = {
  active: false,
  artist: '',
  attack: 0,
  collectible: false,
  cost: 0,
  deckBuilder: false,
  dev: false,
  elite: false,
  entourage: [],
  flavor: '',
  health: 1,
  howToEarn: '',
  howToEarnGolden: '',
  id: 'CARD_ID',
  imageBaseSrc: PLACEHOLDER_BASE_IMAGE,
  imageFlairSrc: '',
  imagePlaceholderSrc: PLACEHOLDER_IMAGE,
  isGolden: false,
  mechanics: [],
  name: 'CARD_NAME',
  numberOvercharge: 0,
  numberPrimary: 0,
  numberRNG: 0,
  numberSecondary: 0,
  onClick: () => {},
  playContext: '',
  playRequirements: [],
  playType: PLAY_TYPE['GLOBAL'],
  race: RACE['NONE'],
  rarity: RARITY['NONE'],
  set: SET[1],
  sounds: {},
  targetingArrowText: '',
  text: '',
  type: TYPE['NONE']
};

export default Card;
