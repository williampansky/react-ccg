import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { getHeroImage, getHeroName } from '@ccg/utils';
import { useResponsive } from '@ccg/hooks';
import { PlayerAvatar, PlayerHealthOrb } from '@ccg/components';
import * as Styled from './styled';

const PlayerHero = props => {
  const {
    G: { playerHero, playerName },
    yourID,
    parentComponent,
    playerArmorPoints,
    playerHealthCurrent,
    playerHealthTotal
  } = props;

  const { isDesktop } = useResponsive();
  const [deckMenuOpen, setDeckMenuOpen] = useState(false);

  const handleDeckIconClick = useCallback(
    event => {
      event.preventDefault();
      if (isDesktop) return setDeckMenuOpen(true);
      !deckMenuOpen ? setDeckMenuOpen(true) : setDeckMenuOpen(false);
    },
    [deckMenuOpen, isDesktop, setDeckMenuOpen]
  );

  return (
    <Styled.Component
      data-component="PlayerHero"
      isDesktop={isDesktop}
      parentComponent={parentComponent}
      ratioCalc={1.333333333}
      sizeH={'var(--hero-height)'}
      sizeW={'150px'}
    >
      <PlayerAvatar
        parentComponent={parentComponent}
        playerHero={playerHero[yourID]}
        playerName={playerName[yourID]}
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
        <PlayerHealthOrb
          armorPoints={playerArmorPoints}
          currentHealth={playerHealthCurrent}
          totalHealth={playerHealthTotal}
          parentComponent={parentComponent}
        />
      </footer>
    </Styled.Component>
  );
};

PlayerHero.propTypes = {};

PlayerHero.defaultProps = {
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

export default PlayerHero;