import counts from '../../state/counts';
import getCardByID from '../../utils/get-card-by-id';
import handleCardPlayability from '../../utils/handle-card-playability';
import { CONFIG } from '@ccg/config';

/**
 * Handles various debug states set from the config.
 * @param {object} G
 * @param {string} player
 */
const handleDebugStates = (G, player) => {
  // debug card
  if (CONFIG.DEBUG_DATA_CONFIG.enableDebugCard === true) {
    if (G.players[player].hand.length >= 9) return;
    const debugCardID = CONFIG.DEBUG_DATA_CONFIG.debugCard;
    G.players[player].hand.push(getCardByID(debugCardID));
    counts.incrementHand(G, player);
    handleCardPlayability(G, player);
  }
};

export default handleDebugStates;
