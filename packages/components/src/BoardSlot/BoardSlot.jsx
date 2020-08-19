import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { useHover, usePrevious } from '@ccg/hooks';
import { PLAYER_BOARDS } from '@ccg/enums';
import { CONFIG } from '@ccg/config';
import * as Styled from './styled';
import {
  getMechanicImage,
  getMinionFlairImage,
  replaceConstant,
  getMechanicShortDescription,
  getCardBaseImage,
  getCardFlairImage,
  formatCardText,
  createMarkup
} from '@ccg/utils';
import {
  Minion,
  Boon,
  Bubble,
  WillExpire,
  isHidden,
  BulwarkBackground,
  BulwarkForeground,
  Disabled,
  DoubleAttack,
  Elite,
  Hidden,
  Poison,
  Card,
  WillDieOverlay,
  YourMinionInteractions,
  TheirMinionInteractions
} from '@ccg/components';
import SlotCardTooltip from './SlotCardTooltip';
import SlotTargetingTooltip from './SlotTargetingTooltip';

// board slot react methods
import determineCardHoverSide from './determine-card-hover-side';

const BoardSlot = props => {
  const {
    GAME_AESTHETIC_CONFIG: { enableEntranceAnimations }
  } = CONFIG;
  const {
    ctx: { currentPlayer },
    board,
    boardLength,
    handleCanAttackFn,
    handleCanBeAttackedByMinionFn,
    handleCanBeAttackedBySpellFn,
    handleIsAttackingFn,
    hoveringTargetIndex,
    hoveringTargetObject,
    index,
    interactionImages,
    // interactionImages: { willDieTheirSrc, willDieYourSrc },
    // mechanicImages: {
    //   hasBoonSrc,
    //   hasBubbleSrc,
    //   hasDoubleAttackSrc,
    //   hasEventListenerSrc,
    //   hasOnDeathSrc,
    //   hasPoisonSrc,
    //   isDisabledSrc,
    //   isHiddenSrc
    // },
    moves: { hoverTarget, killMinion, setSlotIsNew: setSlotIsNewMove },
    playerID,
    playerSpellDamage,
    selectedMinionIndex,
    selectedMinionObject,
    spellObject,
    yourID,
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
      showTooltip,
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
        else if (hasBubble) return setWillDie(false);
        else {
          const { currentAttack: targetAttack } = targetObject;
          return targetAttack >= currentHealth
            ? setWillDie(true)
            : setWillDie(false);
        }
      }
    },
    [board, currentHealth, hasBubble, index, playerID, selectedMinionIndex]
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
        else if (targetObject.hasBubble) return setWillDie(false);
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
    if (isHovered && canBeAttackedByMinion) bool = false;
    if (isHovered && canBeAttackedByPlayer) bool = false;
    if (isHovered && canBeAttackedBySpell) bool = false;
    if (isHovered && canBeAttackedByOnPlay) bool = false;
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

  const killMinionCallback = useCallback(
    index => {
      setTimeout(() => {
        killMinion(playerID, slotObject, index);
      }, 400);
    },
    [playerID, slotObject, killMinion]
  );

  useEffect(() => {
    isDead && killMinionCallback(index);
  }, [index, isDead, killMinionCallback]);

  return (
    <Styled.Component
      canAttack={canAttack}
      canBeAttacked={handleCanBeAttackedAttr()}
      hasBulwark={hasBulwark}
      isAttacking={isAttacking}
      isAttackingMinionIndex={isAttackingMinionIndex}
      isAttackingPlayer={isAttackingPlayer}
      isDead={isDead}
      isEmpty={slotObject === null}
      isNew={enableEntranceAnimations && slotIsNew}
      minionClass={getMinionRaceClass(race)}
      willExpire={willExpire}
      data-can-attack={canAttack}
      data-is-attacking={isAttacking}
      data-can-be-attacked={handleCanBeAttackedAttr()}
      data-component="BoardSlot"
      data-for={`${id}--${index}`}
      data-has-boon={hasBoon}
      data-has-bulwark={hasBulwark}
      data-is-empty={slotObject === null}
      data-is-new={enableEntranceAnimations && slotIsNew}
      data-minion-race={replaceConstant(race)}
      data-slot={index}
      data-tip={spellObject ? true : false}
      data-will-expire={willExpire}
      ref={hoverRef}
      style={{ zIndex: isHovered ? '100' : '' }}
    >
      {/* debug is new state */}
      {/* {slotObject && debugSlotIsNew ? <Bubble /> : null} */}

      {/* mechanics (above minion) */}
      {slotObject && (
        <WillDieOverlay
          activeState={willDie}
          isAttacking={isAttacking}
          // willDieSrc={
          //   board === PLAYER_BOARDS[1] ? willDieYourSrc : willDieTheirSrc
          // }
        />
      )}
      {slotObject && hasBubble && <Bubble />}
      {slotObject && isHidden && <Hidden />}
      {slotObject && hasBulwark && (
        <BulwarkForeground
          imgSrc={getMechanicImage('BULWARK_FOREGROUND.png')}
        />
      )}
      {/* {slotObject && <Disabled active={isDisabled} src={isDisabledSrc} />} */}

      {/* minion interactions */}
      {board === PLAYER_BOARDS[1] ? (
        <YourMinionInteractions {...props} />
      ) : (
        <TheirMinionInteractions
          race={race}
          hasBulwark={hasBulwark}
          canBeAttackedByMinion={canBeAttackedByMinion}
          canBeAttackedBySpell={canBeAttackedBySpell}
          canBeAttackedByOnPlay={canBeAttackedByOnPlay}
          interactionImages={interactionImages}
          handleCanBeAttackedByMinionFunction={handleCanBeAttackedByMinionFn}
          handleCanBeAttackedBySpellFunction={handleCanBeAttackedBySpellFn}
          handleHoverTargetFunction={(obj, idx) =>
            handleHoveredWillDieState(obj, idx)
          }
          canSetHoverTarget={selectedMinionObject[playerID] ? true : false}
          index={index}
          slotObject={slotObject}
          {...props}
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
        hasBoon={hasBoon}
        // hasBoonSrc={hasBoonSrc}
        hasBubble={hasBubble}
        // hasBubbleSrc={hasBubbleSrc}
        hasDoubleAttack={hasDoubleAttack}
        // hasDoubleAttackSrc={hasDoubleAttackSrc}
        hasEventListener={hasEventListener}
        // hasEventListenerSrc={hasEventListenerSrc}
        hasOnDeath={hasOnDeath}
        // hasOnDeathSrc={hasOnDeathSrc}
        hasPoison={hasPoison}
        // hasPoisonSrc={hasPoisonSrc}
        health={health}
        howToEarn={howToEarn}
        howToEarnGolden={howToEarnGolden}
        id={id}
        imageFlairSrc={getMinionFlairImage(id, set, isGolden)}
        isAttacking={isAttacking}
        isDead={isDead}
        isHidden={isHidden}
        // isHiddenSrc={isHiddenSrc}
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
        willExpire={willExpire}
        willExpireIn={willExpireIn}
      />

      {/* mechanics (behind minion) */}
      {slotObject && hasBulwark && (
        <BulwarkBackground
          imgSrc={getMechanicImage('BULWARK_BACKGROUND.png')}
          race={race}
        />
      )}
      {slotObject && hasBoon && <Boon />}

      {/* card tooltip */}
      <SlotTargetingTooltip
        id={id}
        index={index}
        playerSpellDamage={playerSpellDamage}
        showTooltip={showTooltip}
        spellObject={spellObject}
      />

      {/* card tooltip */}
      <SlotCardTooltip
        index={index}
        slotObject={slotObject}
        showTooltip={determineIfCardHover()}
        tooltipSide={determineCardHoverSide(boardLength, index)}
      />
    </Styled.Component>
  );
};

BoardSlot.propTypes = {
  playerID: PropTypes.string.isRequired,
  slotObject: PropTypes.object.isRequired
};

BoardSlot.defaultProps = {};

export default BoardSlot;
