import React, { Fragment, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { getHeroImage, getHeroName } from '@ccg/utils';
import { useResponsive } from '@ccg/hooks';
import {
  Avatar,
  HeroAbilityFAB,
  OpponentSkillsAroundOrb,
  PlayerDeck,
  PlayerHealthOrb,
  PlayerName,
  PlayerStatEnergy,
  PlayerStatIcon,
  ReactBurgerMenu
} from '@ccg/components';

const Hero = props => {
  const {
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

  // This keeps the deckMenuOpen state in sync
  const handleDeckMenuStateChange = state => {
    const { isOpen } = state;
    return setDeckMenuOpen(isOpen);
  };

  return (
    <Fragment>
      <article
        className={[
          styles['hero'],
          cardIsSelected && !selectedCardInteractionContext
            ? styles['card--is-selected']
            : ''
        ].join(' ')}
        data-component="Hero"
        data-player={parentComponent}
      >
        <Avatar
          handlePlayerInteractionClick={e => console.log(e)}
          heroImageSrc={getHeroImage(heroSymbol, 'AVATAR')}
          heroName={getHeroName(heroSymbol)}
          parentComponent={parentComponent}
          placeholderImageSrc={avatarPlaceholderImageSrc}
        />

        {!isDesktop ? (
          <header className={styles['player__info']}>
            <div className={styles['player__stats']}>
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
        ) : null}

        {parentComponent === 'Player' && !isDesktop ? (
          <div className={styles['player__fab']}>
            <HeroAbilityFAB
              abilitiesImageBase={abilitiesImageBase}
              abilitiesImageClose={abilitiesImageClose}
              costImageSrc={costGemImageSrc}
              heroAbilities={heroAbilities}
              heroSymbol={heroSymbol}
            />
          </div>
        ) : null}

        {isDesktop ? (
          <div className={styles['player__desktop__bar']}>Desktop Bar</div>
        ) : null}

        <footer className={styles['player__health']}>
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
        </footer>
      </article>

      {parentComponent === 'Player' ? (
        <ReactBurgerMenu
          isDesktop={isDesktop}
          isOpen={deckMenuOpen}
          onStateChange={state => handleDeckMenuStateChange(state)}
          side="right"
        >
          <PlayerDeck costImageSrc={costGemImageSrc} playerDeck={playerDeck} />
        </ReactBurgerMenu>
      ) : null}
    </Fragment>
  );
};

Hero.propTypes = {
  abilitiesImageBase: PropTypes.string,
  abilitiesImageClose: PropTypes.string,
  avatarPlaceholderImageSrc: PropTypes.string.isRequired,
  cardIsSelected: PropTypes.bool,
  cardsInDeck: PropTypes.number,
  cardsInHand: PropTypes.number,
  costGemImageSrc: PropTypes.string,
  energyCurrent: PropTypes.number,
  energyTotal: PropTypes.number,
  heroAbilities: PropTypes.array,
  heroSymbol: PropTypes.string.isRequired,
  playerArmorPoints: PropTypes.number,
  playerDeck: PropTypes.array,
  playerHealthCurrent: PropTypes.number,
  playerHealthTotal: PropTypes.number,
  playerId: PropTypes.string,
  parentComponent: PropTypes.string,
  playerName: PropTypes.string
};

Hero.defaultProps = {
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

export default Hero;
