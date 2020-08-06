import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getHeroImage, getHeroName } from '@ccg/utils';
import { useResponsive } from '@ccg/hooks';
import { Avatar } from '@ccg/components';

const OpponentHero = props => {
  const {
    G: { playerHero },
    theirID,

    abilitiesImageBase,
    abilitiesImageClose,
    avatarPlaceholderImageSrc,
    cardIsSelected,
    cardsInDeck,
    cardsInHand,
    costGemImageSrc,
    actionPointsCurrent,
    actionPointsTotal,
    heroAbilities,
    heroSymbol,
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
    <StyledComponent
      data-component="OpponentHero"
      ratioCalc={1.333333333}
      sizeH={'var(--hero-height)'}
      sizeW={'150px'}
    >
      <Avatar
        handlePlayerInteractionClick={e => console.log(e)}
        heroImageSrc={getHeroImage(playerHero[theirID], 'AVATAR')}
        heroName={getHeroName(playerHero[theirID])}
        parentComponent={parentComponent}
        placeholderImageSrc={avatarPlaceholderImageSrc}
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

      {isDesktop ? (
        <div className={'player__desktop__bar'}>Desktop Bar</div>
      ) : null}

      {/* <footer className={'player__health'}>
        {parentComponent === 'Opponent' ? (
          <OpponentSkillsAroundOrb
            costImageSrc={costGemImageSrc}
            heroAbilities={heroAbilities}
            heroSymbol={heroSymbol}
          />
        ) : null}
        <PlayerHealthOrb
          armorPoints={playerArmorPoints}
          currentHealth={playerHealthCurrent}
          totalHealth={playerHealthTotal}
        />
      </footer> */}
    </StyledComponent>
  );
};

const StyledComponent = styled.div`
  align-items: stretch;
  background: #111;
  border-top: 1px solid rgba(255, 255, 255, 0.465);
  box-sizing: content-box;
  display: flex;
  flex-flow: row nowrap;
  height: ${props => props.sizeH};
  justify-content: flex-start;
  position: relative;
  transition: 600ms var(--animation-transition-cubic);
  transition-property: filter, opacity, transform;
  width: 100vw;
  z-index: var(--zIndex-Hero);

  @media (min-width: 960px) {
    max-width: 860px;
    margin: 0 auto;
  }

  @media (min-width: 1100px) {
    max-width: 1025px;
  }

  .player__info,
  .player__desktop__bar {
    padding-bottom: ${props => `calc(${props.sizeH} / 15)`};
    padding-left: ${props => `calc(${props.sizeH} / 10)`};
    padding-right: ${props => `calc(${props.sizeH} / 10)`};
    padding-top: ${props => `calc(${props.sizeH} / 15)`};
    width: 100%;
    flex: 1 1;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: space-evenly;

    @media (min-width: 960px) {
      flex: 0;
    }
  }

  .player__health {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    position: relative;

    div[data-component='PlayerHealthOrb'] {
      margin-right: calc(var(--class-skill-button-size) / -4.375);
    }
  }

  .player__fab {
    position: absolute;
    top: 0;
    left: 45%;
    right: auto;
    bottom: auto;
    transform: translateY(calc(var(--player-fab-size) / -1.458));
    z-index: 1;
  }

  .player__stats {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;

    @media (min-width: 960px) {
      margin-bottom: calc(var(--hero-height) / 3.5);
      width: 70px;
    }
  }

  .player__desktop__bar {
    flex: 1 1;
    align-items: center;
    justify-content: center;
  }
`;

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
