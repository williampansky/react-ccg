const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace('./', '')] = require(next);
    return acc;
  }, {});

// all images
const IMAGES = importAll(require.context('.', true, /\.(png|jpe?g|svg)$/));

// card asset images
const CARD_ASSETS = importAll(
  require.context('./src/card-assets', true, /\.(png|jpe?g|svg)$/)
);

// minion mechanics
const MECHANICS = importAll(
  require.context('./src/mechanics', true, /\.(png|jpe?g|svg)$/)
);

// minion interactions
const INTERACTIONS = importAll(
  require.context('./src/interactions', true, /\.(png|jpe?g|svg)$/)
);

// abilities
const ABILITIES_ICON = importAll(
  require.context('./src/heros', false, /\.(png|jpe?g|svg)$/)
)['ABILITIES_ICON.jpg'];
const ABILITIES_ICON_CLOSE = importAll(
  require.context('./src/heros', false, /\.(png|jpe?g|svg)$/)
)['ABILITIES_ICON_CLOSE.jpg'];

// card cost gem
const COST_GEM_IMAGE = importAll(
  require.context('./src/card-assets', false, /\.(png|jpe?g|svg)$/)
)['BADGE_GEM.png'];

// card flair img placeholder
const PLACEHOLDER_IMAGE = importAll(
  require.context('./src/sets', false, /\.(png|jpe?g|svg)$/)
)['PLACEHOLDER.jpg'];

// basic card front
const PLACEHOLDER_BASE_IMAGE = importAll(
  require.context('./src/cards/front', false, /\.(png)$/)
)['NONE.png'];

const CARDS = importAll(require.context('./src/cards', true, /\.(png)$/));
const SETS = importAll(require.context('./src/sets', true, /\.(jpg)$/));
const HEROS = importAll(require.context('./src/heros', true, /\.(jpg)$/));
const ICONS = importAll(require.context('./src/icons', true, /\.(svg)$/));

// ui
const UI_IMAGES = importAll(
  require.context('./src/ui', true, /\.(png|jpe?g|svg)$/)
);
const UI_TOOLTIP = importAll(require.context('./src/ui', false, /\.(png)$/))[
  'UI_Tooltip.png'
];

export {
  ABILITIES_ICON_CLOSE,
  ABILITIES_ICON,
  CARD_ASSETS,
  CARDS,
  COST_GEM_IMAGE,
  HEROS,
  ICONS,
  INTERACTIONS,
  MECHANICS,
  PLACEHOLDER_BASE_IMAGE,
  PLACEHOLDER_IMAGE,
  SETS,
  UI_IMAGES,
  UI_TOOLTIP
};

export default IMAGES;
