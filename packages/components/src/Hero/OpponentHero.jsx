import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getHeroImage, getHeroName } from '@ccg/utils';
import { useResponsive } from '@ccg/hooks';
import { Avatar, HealthOrb } from '@ccg/components';
import * as Styled from './styled';

const OpponentHero = props => {
  const {
    G: { playerHero },
    theirID,
    parentComponent,
    playerArmorPoints,
    playerDeck,
    playerHealthCurrent,
    playerHealthTotal,
    playerName,
    playerId,
    selectedCardInteractionContext
  } = props;

  const { isDesktop } = useResponsive();

  return (
    <Styled.Component
      data-component="OpponentHero"
      isDesktop={isDesktop}
      parentComponent={parentComponent}
      ratioCalc={1.333333333}
      sizeH={'var(--hero-height)'}
      sizeW={'150px'}
    >
      <Avatar
        parentComponent={parentComponent}
        playerHero={playerHero[theirID]}
      />

      {/* {!isDesktop ? (
        <header className={'player__info'}>
          <div className={'player__stats'}>
            <PlayerStatIcon
              iconColor="#ccc"
              icon="HAND"
              statColor="white"
              statLabel="Cards in Hand"
              statValue={cardsInHand}
            />
            <PlayerStatIcon
              cursor="pointer"
              iconColor="#ccc"
              icon="DECK"
              onClick={e => handleDeckIconClick(e)}
              statColor="white"
              statLabel="Cards in Deck"
              statValue={cardsInDeck}
            />
            <PlayerStatEnergy
              iconColor="#ccc"
              statColor="white"
              statLabel="Cards in Deck"
              statValue={actionPointsCurrent}
              totalEnergy={actionPointsTotal}
            />
          </div>
          <PlayerName id={playerId} name={playerName} />
        </header>
      ) : null} */}

      {isDesktop ? <div className={'player__desktop__bar'}></div> : null}

      <footer className={'player__health'}>
        {/* <OpponentSkillsAroundOrb
            costImageSrc={costGemImageSrc}
            heroAbilities={heroAbilities}
            heroSymbol={heroSymbol}
          /> */}
        <HealthOrb
          armorPoints={playerArmorPoints}
          currentHealth={playerHealthCurrent}
          totalHealth={playerHealthTotal}
          parentComponent={parentComponent}
        />
      </footer>
    </Styled.Component>
  );
};

OpponentHero.propTypes = {};

OpponentHero.defaultProps = {
  cardIsSelected: false,
  cardsInDeck: 0,
  cardsInHand: 0,
  energyCurrent: 0,
  energyTotal: 0,
  heroAbilities: [],
  playerDeck: [],
  playerArmorPoints: 0,
  playerHealthCurrent: 30,
  playerHealthTotal: 30
};

export default OpponentHero;
