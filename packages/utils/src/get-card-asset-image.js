import { replaceConstant } from '@ccg/utils';

function getStringPrefix(primaryKey) {
  // prettier-ignore
  switch (primaryKey) {
    case 'cost':    return 'BADGE_GEM';
    case 'attack':  return 'BADGE_SWORD';
    case 'health':  return 'BADGE_SHIELD';
    case 'rarity':  return 'GEM_RARITY';
    default:        return;
  }
}

function constructString(primaryKey, variable, isElite, prefix) {
  // prettier-ignore
  switch (primaryKey) {
    case 'attack':
    case 'health':  return isElite ? `${prefix}-ALT.png` : `${prefix}.png`;
    case 'rarity':  return `${prefix}_${variable.toUpperCase()}.png`;
    default:        return `${prefix}.png`;
  }
}

function getImageObject(primaryKey, variable, isElite, images = {}) {
  const prefix = getStringPrefix(primaryKey, isElite);
  const string = constructString(primaryKey, variable, isElite, prefix);
  const imgMatch = Object.entries(images)
    .map(([key, value]) => {
      return {
        key,
        value
      };
    })
    .filter(obj => obj.key === string)
    .pop();

  return imgMatch;
}

const getCardAssetImage = (primaryKey, variable, isElite, images) => {
  try {
    const parsedVar = replaceConstant(variable);
    const imgObj = getImageObject(primaryKey, parsedVar, isElite, images);
    const { value } = imgObj;
    return value;
  } catch (error) {
    return console.error(error);
  }
};

export default getCardAssetImage;
