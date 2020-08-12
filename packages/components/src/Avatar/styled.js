import styled from 'styled-components';
import { CONFIG } from '@ccg/config';

export const Component = styled.div`
  display: block;
  height: ${props => `calc(${props.sizeH} - ${props.offsetCalc})`};
  width: ${props => `calc(${props.sizeH} / ${props.ratioCalc})`};
  position: relative;

  @media (min-width: ${CONFIG.BREAKPOINTS_CONFIG.medium}px) {
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

    @media (min-width: ${CONFIG.BREAKPOINTS_CONFIG.medium}px) {
      height: ${props => props.sizeDesktop};
      width: ${props => props.sizeDesktop};
    }
  }

  .avatar__image__wrapper {
    border-radius: 50%;
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-flow: ${props =>
      props.parentComponent === 'Player'
        ? 'column nowrap'
        : 'column-reverse nowrap'};
    align-items: center;
    justify-content: center;

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

      @media (min-width: ${CONFIG.BREAKPOINTS_CONFIG.medium}px) {
        border-radius: 50%;
      }
    }

    &:before {
      border-top: ${props =>
        props.parentComponent === 'Player'
          ? '1px solid rgba(255, 255, 255, 0.165)'
          : '1px solid rgba(0, 0, 0, 0.275)'};
    }

    &:after {
      border-bottom: ${props =>
        props.parentComponent === 'Player'
          ? '1px solid rgba(0, 0, 0, 0.275)'
          : '1px solid rgba(255, 255, 255, 0.165)'};
    }

    @media (min-width: ${CONFIG.BREAKPOINTS_CONFIG.medium}px) {
      top: ${props => (props.parentComponent === 'Player' ? '-25px' : '25px')};
    }

    @media (min-width: ${CONFIG.BREAKPOINTS_CONFIG.large}px) {
      top: ${props => (props.parentComponent === 'Player' ? '-46px' : '25px')};
    }
  }

  .avatar__image {
    height: 100%;
    image-rendering: pixelated;
    object-fit: cover;
    width: 100%;
    position: relative;
    z-index: 1;

    @media (min-width: ${CONFIG.BREAKPOINTS_CONFIG.medium}px) {
      border-radius: 50%;
    }
  }
`;

export const PlayerAvatar = styled.div`
  @media (min-width: ${CONFIG.BREAKPOINTS_CONFIG.large}px) {
    [data-component='Avatar'] {
      position: absolute;
      bottom: -100px;
      left: 0;
      height: 200px;
      width: 200px;
    }
  }
`;
