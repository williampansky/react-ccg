import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';
import { useSelector } from 'react-redux';
import { getHeroName, removeSymbols } from '@ccg/utils';

const Avatar = props => {
  const { playerHero } = props;
  const images = useSelector(s => s.images);
  const { HERO_IMAGES } = images;

  return (
    <Styled.Component
      data-component="Avatar"
      offsetCalc={'20px'}
      ratioCalc={1.333333333}
      sizeDesktop={'150px'}
      sizeH={'120px'}
    >
      <div className={'avatar__position__block'} />
      <picture className={'avatar__image__wrapper'} data-component="Avatar">
        <img
          alt={getHeroName(playerHero)}
          className={'avatar__image'}
          src={HERO_IMAGES[`${removeSymbols(playerHero)}/AVATAR.jpg`]}
          role="presentation"
        />
      </picture>
    </Styled.Component>
  );
};

Avatar.propTypes = {
  playerHero: PropTypes.string.isRequired
};

export default Avatar;
