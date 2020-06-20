import selectedCardIndex from '../state/selected-card-index';
import selectedCardObject from '../state/selected-card-object';

/**
 * Sets the `selectedCardIndex` and `selectedCardObject`
 * of the current player's card.
 *
 * @param {object} G
 * @param {object} ctx
 * @param {object} cardObject
 * @param {number} index
 */
const selectCard = (G, ctx, cardObject = null, index = null) => {
  const { turnOrder } = G;
  const { currentPlayer } = ctx;
  const otherPlayer = turnOrder.find(p => p !== currentPlayer);

  selectedCardIndex.set(G, currentPlayer, index);
  selectedCardObject.set(G, currentPlayer, cardObject);

  if (cardObject === null) return;
};

export default selectCard;
