import AIRTABLE_CONFIG from './airtable.config';

const CONFIG = {
  AIRTABLE_CONFIG,
  DEBUG_DATA_CONFIG: {
    debugCard: 'CORE_041',
    enableDebugCard: false,
    enableAttack: true,
    enableCost: false,
    enableHealth: true,
    enableMechanics: true,
    enableRemoveCardFromHand: true,
    enableSet: true,
    enableSpellType: true,
    enableText: true
  },
  DEV_CONFIG: {
    autoCloseDebugPanel: true
  },
  GAME_AESTHETIC_CONFIG: {
    enableEntranceAnimations: false
  },
  MATCH_CONFIG: {
    enableInitHandsStage: false,
    enableRandomTurnOrder: false
  }
};

export default CONFIG;
