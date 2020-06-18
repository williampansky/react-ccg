import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { getMechanicImage, getMinionFlairImage } from '@ccg/utils';
import { Minion, BulwarkForeground, BulwarkBackground } from '@ccg/components';

const BoardSlot = props => {
  const {
    index,
    playerID,
    slotObject,
    slotObject: {
      currentAttack,
      currentHealth,
      hasBulwark,
      minionData: {
        active,
        artist,
        attack,
        collectible,
        cost,
        elite,
        entourage,
        flavor,
        hasCurse,
        hasEnergyShield,
        hasEventListener,
        hasOnslaught,
        hasPoison,
        health,
        howToEarn,
        howToEarnGolden,
        id,
        isAttacking,
        isGolden,
        mechanics,
        name,
        numberPrimary,
        playContext,
        playRequirements,
        playType,
        race,
        rarity,
        set,
        slot,
        sounds,
        targetingArrowText,
        text,
        type
      },
      totalHealth
    }
  } = props;

  return (
    <div
      className={styles['board__slot']}
      data-component="BoardSlot"
      data-is-empty={slotObject === null}
      data-slot={index}
    >
      {/* mechanics (above minion) */}
      {slotObject && hasBulwark && (
        <BulwarkForeground
          imgSrc={getMechanicImage('BULWARK_FOREGROUND.png')}
        />
      )}

      {/* visible minion component */}
      <Minion
        active={active}
        artist={artist}
        attack={attack}
        collectible={collectible}
        cost={cost}
        currentAttack={currentAttack}
        currentHealth={currentHealth}
        elite={elite}
        entourage={entourage}
        flavor={flavor}
        hasCurse={hasCurse}
        hasEnergyShield={hasEnergyShield}
        hasEventListener={hasEventListener}
        hasOnslaught={hasOnslaught}
        hasPoison={hasPoison}
        health={health}
        howToEarn={howToEarn}
        howToEarnGolden={howToEarnGolden}
        id={id}
        imageFlairSrc={getMinionFlairImage(id, set, isGolden)}
        isAttacking={isAttacking}
        isGolden={isGolden}
        mechanics={mechanics}
        name={name}
        numberPrimary={numberPrimary}
        playContext={playContext}
        playRequirements={playRequirements}
        playType={playType}
        race={race}
        rarity={rarity}
        set={set}
        slot={slot}
        sounds={sounds}
        targetingArrowText={targetingArrowText}
        text={text}
        totalHealth={totalHealth}
        type={type}
      />

      {/* mechanics (behind minion) */}
      {slotObject && hasBulwark && (
        <BulwarkBackground
          imgSrc={getMechanicImage('BULWARK_BACKGROUND.png')}
          race={race}
        />
      )}
    </div>
  );
};

BoardSlot.propTypes = {
  playerID: PropTypes.string.isRequired,
  slotObject: PropTypes.object.isRequired
};

BoardSlot.defaultProps = {};

export default BoardSlot;