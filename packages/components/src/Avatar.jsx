import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Avatar = props => {
  const { heroImageSrc, heroName, placeholderImageSrc } = props;
  return (
    <StyledComponent
      data-component="Avatar"
      offsetCalc={'20px'}
      ratioCalc={1.333333333}
      sizeDesktop={'150px'}
      sizeH={'120px'}
    >
      <div className={'avatar__position__block'} />
      <picture className={'avatar__image__wrapper'} data-component="Avatar">
        <img
          alt={heroName}
          className={'avatar__image'}
          src={heroImageSrc}
          role="presentation"
        />
      </picture>
    </StyledComponent>
  );
};

const StyledComponent = styled.div`
  display: block;
  height: ${props => props.sizeH - props.offsetCalc};
  width: ${props => props.sizeH - props.ratioCalc};
  position: relative;

  @media (min-width: 960px) {
    border-radius: 50%;
    height: ${props => props.sizeDesktop};
    width: ${props => props.sizeDesktop};
    margin-left: calc(var(--class-skill-button-size) / -4.375);
  }

  @media (min-width: 1140px) {
    margin-left: calc(var(--class-skill-button-size) / -6.375);
  }

  .avatar__position__block {
    height: ${props => props.sizeH - props.offsetCalc};
    width: ${props => props.sizeH - props.ratioCalc};

    @media (min-width: 960px) {
      height: ${props => props.sizeDesktop};
      width: ${props => props.sizeDesktop};
    }
  }

  .avatar__image__wrapper {
    background: #111;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2;

      @media (min-width: 960px) {
        border-radius: 50%;
      }
    }

    &:before {
      border-top: 1px solid rgba(255, 255, 255, 0.165);
    }

    &:after {
      border-bottom: 1px solid rgba(0, 0, 0, 0.275);
    }

    @media (min-width: 960px) {
      top: -25px;
    }
  }

  .avatar__image {
    height: 100%;
    image-rendering: pixelated;
    object-fit: cover;
    width: 100%;
    position: relative;
    z-index: 1;

    @media (min-width: 960px) {
      border-radius: 50%;
    }
  }
`;

Avatar.propTypes = {
  heroImageSrc: PropTypes.string.isRequired,
  heroName: PropTypes.string.isRequired,
  placeholderImageSrc: PropTypes.string
};

export default Avatar;
