import { CONFIG } from '@ccg/config';
import createBoardSlotObject from '../creators/create-board-slot-object';

const summonEntourageMinion = (G, ctx, cardId, entourageArray) => {
  const { turnOrder } = G;
  const { currentPlayer, random } = ctx;
  const otherPlayer = turnOrder.find(p => p !== currentPlayer);

  /**
   * Summons the single Entourage minion for the card.
   */
  const summonSingleEntourageMinion = (G, player, entourageId) => {
    if (G.boards[player].length === 7) return; // max minions
    G.boards[player].push(createBoardSlotObject(`${entourageId}`));
  };

  /**
   * Summons a random minion from the card's Entourage array.
   */
  const summonRandomEntourageMinion = (G, player, array) => {
    if (G.boards[player].length === 7) return; // max minions
    const randomEntourageID = random.Shuffle(array);
    const randomEntourage = createBoardSlotObject(randomEntourageID[0]);
    G.boards[player].push(randomEntourage);
  };

  switch (cardId) {
    case 'CORE_012':
    case 'CORE_025':
      entourageArray.forEach(id =>
        summonSingleEntourageMinion(G, currentPlayer, id)
      );
      break;

    case 'CORE_020':
      summonRandomEntourageMinion(G, currentPlayer, entourageArray);
      break;

    default:
      break; // eject
  }

  // if (CONFIG.DEBUG_DATA_CONFIG.enableMechanics)
  // initCardMechanics(G, ctx, slotObject, index);
};

export default summonEntourageMinion;
