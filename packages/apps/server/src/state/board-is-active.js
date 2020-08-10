const boardIsActive = {
  __DATA_MODEL: {
    '0': false,
    '1': false
  },

  enable: (G, player) => {
    G.boardIsActive[player] = true;
  },

  disable: (G, player) => {
    G.boardIsActive[player] = false;
  }
};

export default boardIsActive;
