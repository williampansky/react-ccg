import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { useHover, usePrevious } from '@ccg/hooks';
import { PLAYER_BOARDS } from '@ccg/enums';
import { GAME_CONFIG } from '@ccg/config';
import {
  getMechanicImage,
  getMinionFlairImage,
  replaceConstant,
  getMechanicShortDescription,
  getCardBaseImage,
  getCardFlairImage
} from '@ccg/utils';
import {
  Minion,
  Boon,
  Bubble,
  BulwarkBackground,
  BulwarkForeground,
  Disabled,
  DoubleAttack,
  Elite,
  Poison,
  Card,
  WillDieOverlay,
  YourMinionInteractions,
  TheirMinionInteractions
} from '@ccg/components';

const BoardSlot = props => {
  const {
    gameAestheticConfig: { enableEntranceAnimations }
  } = GAME_CONFIG;
  const {
    G: {
      hoveringTargetIndex,
      hoveringTargetObject,
      selectedMinionObject,
      selectedMinionIndex
    },
    ctx: { currentPlayer },
    board,
    handleCanAttackFn,
    handleIsAttackingFn,
    handleCanBeAttackedByMinionFn,
    index,
    interactionImages,
    interactionImages: { willDieTheirSrc, willDieYourSrc },
    mechanicImages: {
      hasBoonSrc,
      hasBubbleSrc,
      hasDoubleAttackSrc,
      hasEventListenerSrc,
      hasOnDeathSrc,
      hasPoisonSrc,
      isDisabledSrc
    },
    moves: { hoverTarget, setSlotIsNew: setSlotIsNewMove },
    playerID,
    slotObject,
    slotObject: {
      canAttack,
      canBeAttackedByMinion,
      canBeAttackedByPlayer,
      canBeAttackedBySpell,
      canBeAttackedByOnPlay,
      canBeBuffed,
      canBeDebuffed,
      canBeDestroyed,
      canBeExpired,
      canBeHealed,
      canBeReturned,
      canBeStolen,
      canReceiveBubble,
      canReceiveBulwark,
      canReceiveDoubleAttack,
      canReceiveRush,
      currentAttack,
      currentHealth,
      hasAttacked,
      hasBoon,
      hasBubble,
      hasBulwark,
      hasCantTarget,
      hasDoubleAttack,
      hasDoubleAttackCount,
      hasEventListener,
      hasLifesteal,
      hasNoAttack,
      hasOnDeath,
      hasPoison,
      hasRush,
      hasSpellDamage,
      isAttacking,
      isAttackingMinionIndex,
      isAttackingPlayer,
      isBooned,
      isBuffed,
      isDead,
      isDebuffed,
      isDisabled,
      isDisabledFor,
      isHidden,
      isImmune,
      isSilenced,
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
        numberSecondary,
        numberRNG,
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
      totalAttack,
      totalHealth,
      uuid,
      willExpire,
      willExpireIn
    }
  } = props;

  const debugSlotIsNew = true;
  const showCardOnHover = true;
  const hoveringTimer =
    canBeAttackedByMinion ||
    canBeAttackedByOnPlay ||
    canBeAttackedByPlayer ||
    canBeAttackedBySpell
      ? 3000
      : 1400;

  const [hoverRef, isHovered] = useHover();
  const previousUuid = usePrevious(uuid);
  const [slotIsNew, setSlotIsNew] = useState(false);
  const [willDie, setWillDie] = useState(false);

  const handleSlotIsNew = useCallback(
    uniqueID => {
      if (enableEntranceAnimations) {
        setTimeout(() => {
          // setSlotIsNewMove(playerID, index, false);
          // uniqueID !== previousUuid ? setSlotIsNew(true) : setSlotIsNew(false);
        }, 600);
      }
    },
    [enableEntranceAnimations]
  );

  useEffect(() => {
    handleSlotIsNew(uuid);
  }, [handleSlotIsNew, uuid]);

  const handleSelectedWillDieState = useCallback(
    targetObject => {
      if (board === PLAYER_BOARDS[1]) {
        if (targetObject === null) return setWillDie(false);
        else if (selectedMinionIndex[playerID] !== index)
          return setWillDie(false);
        else {
          const { currentAttack: targetAttack } = targetObject;
          return targetAttack >= currentHealth
            ? setWillDie(true)
            : setWillDie(false);
        }
      }
    },
    [board, currentHealth, index, playerID, selectedMinionIndex]
  );

  useEffect(() => {
    handleSelectedWillDieState(hoveringTargetObject[playerID]);
  }, [handleSelectedWillDieState, hoveringTargetObject, playerID]);

  const handleHoveredWillDieState = useCallback(
    (targetObject, targetIndex) => {
      if (board === PLAYER_BOARDS[2]) {
        const currentPlayerID = playerID === '0' ? '1' : '0';

        // send to server
        hoverTarget(targetObject, targetIndex);

        // handle local target willDie state
        if (targetIndex === null || targetObject === null)
          return setWillDie(false);
        else if (index !== targetIndex) return setWillDie(false);
        else if (selectedMinionObject[currentPlayerID] === null)
          return setWillDie(false);
        else {
          const {
            currentAttack: selectedMinionCurrentAttack
          } = selectedMinionObject[currentPlayerID];
          return selectedMinionCurrentAttack >= currentHealth
            ? setWillDie(true)
            : setWillDie(false);
        }
      }
    },
    [board, hoverTarget, index, selectedMinionObject, playerID, currentHealth]
  );

  /**
   * Returns minion race in lower case format
   * @param {string} str
   */
  const getMinionRaceClass = useCallback(str => {
    if (!str) return;
    return `minion__race--${replaceConstant(str).toLowerCase()}`;
  }, []);

  const determineIfCardHover = () => {
    if (!showCardOnHover) return false;

    let bool = false;
    if (isHovered) bool = true;
    if (isAttacking) bool = false;
    if (isHovered && canBeAttackedByMinion) bool = true;
    if (isHovered && canBeAttackedByPlayer) bool = true;
    if (isHovered && canBeAttackedBySpell) bool = true;
    if (isHovered && canBeAttackedByOnPlay) bool = true;
    if (canBeBuffed) bool = false;
    if (canBeDebuffed) bool = false;
    if (canBeExpired) bool = false;
    if (canBeHealed) bool = false;
    if (canBeReturned) bool = false;
    // if (canBeSacrificed) bool = false;
    if (canBeStolen) bool = false;
    if (canReceiveBubble) bool = false;
    if (canReceiveBulwark) bool = false;
    if (canReceiveDoubleAttack) bool = false;

    return bool;
  };

  const handleCanBeAttackedAttr = () => {
    let bool = false;
    if (canBeAttackedByMinion) bool = true;
    if (canBeAttackedByPlayer) bool = true;
    if (canBeAttackedBySpell) bool = true;
    if (canBeAttackedByOnPlay) bool = true;
    return bool;
  };

  // const killMinionCallback = useCallback(
  //   index => {
  //     setTimeout(() => {
  //       killMinion(playerID, slotObject, index);
  //     }, 400);
  //   },
  //   [playerID, slotObject, killMinion]
  // );

  // useEffect(() => {
  //   isDead && killMinionCallback(index);
  // }, [index, isDead, killMinionCallback]);

  return (
    <div
      className={[
        styles['board__slot'],
        getMinionRaceClass(race),
        isAttacking ? 'board__slot--is-attacking' : ''
      ].join(' ')}
      data-component="BoardSlot"
      data-can-attack={canAttack}
      data-can-be-attacked={handleCanBeAttackedAttr()}
      data-has-bulwark={hasBulwark}
      data-is-empty={slotObject === null}
      data-is-new={enableEntranceAnimations && slotIsNew}
      data-slot={index}
      data-for={`${id}--${index}`}
      data-tip={true}
      ref={hoverRef}
      style={{ zIndex: isHovered ? '100' : '' }}
    >
      {/* debug is new state */}
      {/* {slotObject && debugSlotIsNew ? <Bubble /> : null} */}

      {/* mechanics (above minion) */}
      {slotObject && (
        <WillDieOverlay
          activeState={willDie}
          willDieSrc={
            board === PLAYER_BOARDS[1] ? willDieYourSrc : willDieTheirSrc
          }
        />
      )}
      {slotObject && hasBubble && <Bubble />}
      {slotObject && hasBoon && <Boon />}
      {slotObject && hasBulwark && (
        <BulwarkForeground
          imgSrc={getMechanicImage('BULWARK_FOREGROUND.png')}
        />
      )}
      {slotObject && <Disabled active={isDisabled} src={isDisabledSrc} />}

      {/* minion interactions */}
      {board === PLAYER_BOARDS[1] ? (
        <YourMinionInteractions
          race={race}
          hasBulwark={hasBulwark}
          canAttack={canAttack}
          isAttacking={isAttacking}
          handleCanAttackFunction={handleCanAttackFn}
          handleIsAttackingFunction={handleIsAttackingFn}
          interactionImages={interactionImages}
        />
      ) : (
        <TheirMinionInteractions
          race={race}
          hasBulwark={hasBulwark}
          canBeAttackedByMinion={canBeAttackedByMinion}
          interactionImages={interactionImages}
          handleCanBeAttackedByMinionFunction={handleCanBeAttackedByMinionFn}
          handleHoverTargetFunction={(obj, idx) =>
            handleHoveredWillDieState(obj, idx)
          }
          canSetHoverTarget={selectedMinionObject[playerID] ? true : false}
          index={index}
          slotObject={slotObject}
        />
      )}

      {/* minion box shadows */}
      {/* <div
        className={[
          'minion__shadows',
          slotObject && race ? getMinionRaceClass(race) : ''
        ].join(' ')}
        data-component="minion-shadows"
      /> */}

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
        hasBoon={hasBoon}
        hasBoonSrc={hasBoonSrc}
        hasBubble={hasBubble}
        hasBubbleSrc={hasBubbleSrc}
        hasDoubleAttack={hasDoubleAttack}
        hasDoubleAttackSrc={hasDoubleAttackSrc}
        hasEventListener={hasEventListener}
        hasEventListenerSrc={hasEventListenerSrc}
        hasOnDeath={hasOnDeath}
        hasOnDeathSrc={hasOnDeathSrc}
        hasPoison={hasPoison}
        hasPoisonSrc={hasPoisonSrc}
        health={health}
        howToEarn={howToEarn}
        howToEarnGolden={howToEarnGolden}
        id={id}
        imageFlairSrc={getMinionFlairImage(id, set, isGolden)}
        isAttacking={isAttacking}
        isDead={isDead}
        isGolden={isGolden}
        mechanics={mechanics}
        minionRaceClass={getMinionRaceClass(race)}
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
        totalAttack={totalAttack}
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

      {/* visible minion component */}
      {slotObject ? (
        <div
          className={[
            'board__slot--card-tooltip',
            index === 5 || index === 6
              ? 'show--left uk-transform-origin-bottom-right'
              : 'uk-transform-origin-bottom-left',
            determineIfCardHover() ? 'uk-animation-scale-up' : ''
          ].join(' ')}
          id={`${id}--${index}`}
        >
          <Card
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
          />
          {mechanics && mechanics.length ? (
            <div className="tooltip__mechanics__wrapper">
              {mechanics.map((m, i) => {
                return (
                  <div className="mechanic__item" key={m}>
                    <div className="mechanic__item-title">
                      {replaceConstant(m)}
                    </div>
                    <div className="mechanic__item-description">
                      {getMechanicShortDescription(m)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

BoardSlot.propTypes = {
  playerID: PropTypes.string.isRequired,
  slotObject: PropTypes.object.isRequired
};

BoardSlot.defaultProps = {};

export default BoardSlot;
