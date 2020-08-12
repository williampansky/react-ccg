import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';
import {
  getCardBaseImage,
  getCardFlairImage,
  replaceConstant,
  getMechanicShortDescription
} from '@ccg/utils';

const SlotCardTooltip = props => {
  const {
    index,
    showTooltip,
    slotObject: {
      isBuffed,
      isDisabled,
      minionData: {
        active,
        artist,
        attack,
        collectible,
        cost,
        elite,
        entourage,
        flavor,
        health,
        howToEarn,
        howToEarnGolden,
        id,
        isGolden,
        mechanics,
        name,
        numberOvercharge,
        numberPrimary,
        numberRNG,
        numberSecondary,
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
      },
      willExpire,
      willExpireIn
    },
    tooltipSide
  } = props;

  const showList = useCallback(() => {
    if (mechanics && mechanics.length) return true;
    else if (isBuffed) return true;
    else if (isDisabled) return true;
    else if (willExpire) return true;
    else return false;
  }, [mechanics, isBuffed, isDisabled, willExpire]);

  return (
    <Styled.SlotCardTooltip
      className={[
        showTooltip ? 'uk-animation-scale-up' : '',
        tooltipSide === 'left'
          ? 'uk-transform-origin-bottom-right'
          : 'uk-transform-origin-bottom-left'
      ].join(' ')}
      data-component="SlotCardTooltip"
      id={`${id}--${index}`}
      showTooltip={showTooltip}
      tooltipSide={tooltipSide}
    >
      {/* <Card
        active={active}
        artist={artist}
        attack={attack}
        collectible={collectible}
        cost={cost}
        deckBuilder={false}
        elite={elite}
        entourage={entourage}
        flavor={flavor}
        health={health}
        howToEarn={howToEarn}
        howToEarnGolden={howToEarnGolden}
        id={id}
        imageBaseSrc={getCardBaseImage(rarity, type)}
        imageFlairSrc={getCardFlairImage(id, set, isGolden)}
        isGolden={isGolden}
        mechanics={mechanics}
        name={name}
        numberOvercharge={numberOvercharge}
        numberPrimary={numberPrimary}
        numberRNG={numberRNG}
        numberSecondary={numberSecondary}
        onClick={() => {}}
        playContext={playContext}
        playRequirements={playRequirements}
        playType={playType}
        race={race}
        rarity={rarity}
        set={set}
        sounds={sounds}
        targetingArrowText={targetingArrowText}
        text={text}
        type={type}
      /> */}

      {showList ? (
        <ul>
          {mechanics.map(m => {
            return (
              <li className="mechanic__item" key={m}>
                <div className="mechanic__item-title">{replaceConstant(m)}</div>
                <div className="mechanic__item-description">
                  {getMechanicShortDescription(m)}
                </div>
              </li>
            );
          })}

          {isDisabled && (
            <li className="mechanic__item is--debuff">
              <div className="mechanic__item-title">
                {replaceConstant('%DISABLE%')}
              </div>
              <div className="mechanic__item-description">
                {getMechanicShortDescription('%DISABLE%')}
              </div>
            </li>
          )}

          {willExpire && (
            <li className="mechanic__item is--debuff">
              <div className="mechanic__item-title">
                {replaceConstant('%EXPIRATION%')}
              </div>
              <div className="mechanic__item-description">
                {getMechanicShortDescription('%EXPIRATION%')}
                <span>{` `}</span>
                <span>Will activate in {willExpireIn} turn(s).</span>
              </div>
            </li>
          )}
        </ul>
      ) : null}
    </Styled.SlotCardTooltip>
  );
};

SlotCardTooltip.propTypes = {
  minionRace: PropTypes.string
};

export default SlotCardTooltip;
