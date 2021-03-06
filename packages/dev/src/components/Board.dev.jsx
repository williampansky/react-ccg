/* eslint-disable no-unused-vars */
import React, { useState, useLayoutEffect } from 'react';
import Fullscreen from 'react-full-screen';
import {
  Board,
  Opponent,
  Player,
  SelectedCardMobileModal
} from '@ccg/components';
import { ABILITIES, CARDS_DATABASE } from '@ccg/data';
import { CARDS, SETS } from '@ccg/images';
import { getCardByID, replaceConstant } from '@ccg/utils';
import { TYPE } from '@ccg/enums';
import {
  ABILITIES_ICON,
  ABILITIES_ICON_CLOSE,
  COST_GEM_IMAGE,
  PLACEHOLDER_IMAGE
} from '@ccg/images';
import { useCallback } from 'react';

const CARD_01 = getCardByID('CORE_001');
const CARD_02 = getCardByID('CORE_069');
const CARD_03 = getCardByID('CORE_003');
const CARD_04 = getCardByID('CORE_076');
const CARD_05 = getCardByID('CORE_005');
const CARD_06 = getCardByID('CORE_087');
const CARD_07 = getCardByID('CORE_007');
const CARD_08 = getCardByID('CORE_008');
const CARD_09 = getCardByID('CORE_009');
const CARD_10 = getCardByID('CORE_010');
const CARDS_ARRAY = [
  CARD_01,
  CARD_02,
  CARD_03,
  CARD_04,
  CARD_05,
  CARD_06
  // CARD_07,
  // CARD_08,
  // CARD_09,
  // CARD_10
];

const HERO = 'ZEUS';
const HERO_SYMBOL = `%HERO_${HERO}%`;
const PLAYER_DECK = [
  {
    ...CARDS_DATABASE['CORE_001'.replace(' ', '')],
    _id: 'CORE_001',
    _amount: 0
  },
  {
    ...CARDS_DATABASE['CORE_002'.replace(' ', '')],
    _id: 'CORE_002',
    _amount: 2
  },
  {
    ...CARDS_DATABASE['CORE_020'.replace(' ', '')],
    _id: 'CORE_020',
    _amount: 2
  },
  {
    ...CARDS_DATABASE['CORE_030'.replace(' ', '')],
    _id: 'CORE_030',
    _amount: 2
  },
  {
    ...CARDS_DATABASE['CORE_022'.replace(' ', '')],
    _id: 'CORE_022',
    _amount: 1
  },
  {
    ...CARDS_DATABASE['CORE_040'.replace(' ', '')],
    _id: 'CORE_040',
    _amount: 2
  },
  {
    ...CARDS_DATABASE['CORE_080'.replace(' ', '')],
    _id: 'CORE_080',
    _amount: 2
  },
  {
    ...CARDS_DATABASE['CORE_044'.replace(' ', '')],
    _id: 'CORE_044',
    _amount: 2
  }
].sort((a, b) => a.cost - b.cost);
const HERO_ABILITIES = [
  {
    ...ABILITIES[`HERO_${HERO}_001`],
    abilityLocked: false,
    cooldownInEffect: false
  },
  {
    ...ABILITIES[`HERO_${HERO}_002`],
    abilityLocked: false,
    cooldownInEffect: false
  },
  {
    ...ABILITIES[`HERO_${HERO}_003`],
    abilityLocked: false,
    cooldownInEffect: false
  }
];

const OPPO = 'EXILE';
const OPPO_SYMBOL = `%HERO_${OPPO}%`;
const OPPO_DECK = [
  {
    ...CARDS_DATABASE['CORE_001'.replace(' ', '')],
    _id: 'CORE_001',
    _amount: 0
  },
  {
    ...CARDS_DATABASE['CORE_002'.replace(' ', '')],
    _id: 'CORE_002',
    _amount: 2
  },
  {
    ...CARDS_DATABASE['CORE_020'.replace(' ', '')],
    _id: 'CORE_020',
    _amount: 2
  },
  {
    ...CARDS_DATABASE['CORE_030'.replace(' ', '')],
    _id: 'CORE_030',
    _amount: 2
  },
  {
    ...CARDS_DATABASE['CORE_022'.replace(' ', '')],
    _id: 'CORE_022',
    _amount: 1
  },
  {
    ...CARDS_DATABASE['CORE_040'.replace(' ', '')],
    _id: 'CORE_040',
    _amount: 2
  },
  {
    ...CARDS_DATABASE['CORE_080'.replace(' ', '')],
    _id: 'CORE_080',
    _amount: 2
  },
  {
    ...CARDS_DATABASE['CORE_044'.replace(' ', '')],
    _id: 'CORE_044',
    _amount: 2
  }
].sort((a, b) => a.cost - b.cost);
const OPPO_ABILITIES = [
  {
    ...ABILITIES[`HERO_${OPPO}_001`],
    abilityLocked: false,
    cooldownInEffect: false
  },
  {
    ...ABILITIES[`HERO_${OPPO}_002`],
    abilityLocked: false,
    cooldownInEffect: false
  },
  {
    ...ABILITIES[`HERO_${OPPO}_003`],
    abilityLocked: false,
    cooldownInEffect: false
  }
];

const OPPO_CARDS_ARRAY = [
  CARD_01,
  CARD_02,
  CARD_03,
  CARD_04,
  CARD_05,
  CARD_06,
  CARD_07,
  CARD_08,
  CARD_09
  // CARD_10
];

const TEMP_CARD = {
  active: true,
  artist:
    '<a href="https://graphicriver.net/user/rexard" rel="noopener noreferrer" target="_blank">Rexard</a>',
  attack: 1,
  cardClass: '%CLASS_NONE%',
  collectible: true,
  cost: 1,
  elite: false,
  entourage: [],
  health: 2,
  howToEarn: 'Provided to all players.',
  mechanics: ['%BULWARK%'],
  id: 'CORE_002',
  name: 'Rookie Lancer',
  race: '%RACE_NONE%',
  rarity: '%RARITY_FREE%',
  set: '%SET_002%',
  text: '<strong>%BULWARK%</strong>',
  type: '%TYPE_MINION%',
  key: 'CORE_002',
  value: 'Rookie Lancer',
  uuid: 'ba11dd5f-0c50-4851-a776-36ead9020712'
};

const handleContextActions = cardObject => {
  try {
    const { type } = cardObject;
    switch (type) {
      case TYPE['ITEM']:
        return Array({
          label: 'Use',
          value: '%ITEM%'
        });

      case TYPE['MINION']:
        return Array({
          label: 'Play',
          value: '%SUMMON%'
        });

      case TYPE['SPELL']:
        return Array({
          label: 'Cast',
          value: '%SPELL%'
        });

      case TYPE['WEAPON']:
        return Array({
          label: 'Equip',
          value: '%WEAPON%'
        });

      default:
        return;
    }
  } catch (error) {
    return;
  }
};

const YOUR_BOARD_SLOTS = [];

export default function BoardDev() {
  const [selectedCardObject, setSelectedCardObject] = useState(null);
  const [selectedCardContext, setSelectedCardContext] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleDropAreaClick = useCallback(index => {
    console.log(index);
  }, []);

  return (
    <Fullscreen
      enabled={isFullScreen}
      onChange={isFull => setIsFullScreen(isFull)}
    >
      <div id="app" style={{ justifyContent: 'flex-end' }}>
        <Opponent
          avatarPlaceholderImageSrc={PLACEHOLDER_IMAGE}
          cardIsSelected={selectedCardObject ? true : false}
          cardsInDeckCount={OPPO_DECK.length}
          cardsInHandCount={OPPO_CARDS_ARRAY.length}
          costGemImageSrc={COST_GEM_IMAGE}
          energyCurrent={1}
          energyTotal={4}
          heroAbilities={OPPO_ABILITIES}
          heroSymbol={OPPO_SYMBOL}
          playerHealthCurrent={30}
          playerHealthTotal={30}
          playerName="someDumbPlayerGuy"
          theirId={'1'}
          selectedCardContext={selectedCardContext}
        />

        <Board
          // theirBoard={THEIR_BOARD_SLOTS}
          theirId={'1'}
          yourBoard={YOUR_BOARD_SLOTS}
          yourId={'0'}
          cardIsSelected={selectedCardObject ? true : false}
          handleDropAreaClick={handleDropAreaClick}
        />

        <Player
          abilitiesImageBase={ABILITIES_ICON}
          abilitiesImageClose={ABILITIES_ICON_CLOSE}
          avatarPlaceholderImageSrc={PLACEHOLDER_IMAGE}
          cardsInDeckCount={PLAYER_DECK.length}
          cardsInHandArray={CARDS_ARRAY}
          cardsInHandCount={CARDS_ARRAY.length}
          costGemImageSrc={COST_GEM_IMAGE}
          deselectCardFunction={() => setSelectedCardObject(null)}
          energyCurrent={1}
          energyTotal={4}
          heroAbilities={HERO_ABILITIES}
          heroSymbol={HERO_SYMBOL}
          imagesDataCards={CARDS}
          imagesDataSets={SETS}
          playerDeck={PLAYER_DECK}
          playerHealthCurrent={30}
          playerHealthTotal={30}
          playerName="pantsme"
          selectCardFunction={obj => setSelectedCardObject(obj)}
          selectedCardObject={selectedCardObject}
          selectedCardUuid={selectedCardObject && selectedCardObject.uuid}
          yourId={'0'}
          selectedCardContext={selectedCardContext}
        />

        <SelectedCardMobileModal
          card={selectedCardObject}
          contextActions={handleContextActions(selectedCardObject)}
          deselectCardFunction={() => setSelectedCardObject(null)}
          imagesDataCards={CARDS}
          imagesDataSets={SETS}
          selectCardContextFunction={str => setSelectedCardContext(str)}
          selectedCardContext={selectedCardContext}
          selectedCardUuid={selectedCardObject && selectedCardObject.uuid}
        />
      </div>
    </Fullscreen>
  );
}
