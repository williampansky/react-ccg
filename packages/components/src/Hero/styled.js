import styled from 'styled-components';

export const Component = styled.div`
  align-items: stretch;
  background: ${props => (props.isDesktop ? 'slategrey' : '#111')};
  border-bottom: ${props =>
    props.parentComponent === 'Player'
      ? '0'
      : '1px solid rgba(255, 255, 255, 0.465)'};
  border-top: ${props =>
    props.parentComponent === 'Player'
      ? '1px solid rgba(255, 255, 255, 0.465)'
      : '0'};
  box-sizing: content-box;
  display: flex;
  flex-flow: row nowrap;
  height: ${props => props.sizeH};
  justify-content: flex-start;
  position: relative;
  transition: 600ms var(--animation-transition-cubic);
  transition-property: filter, opacity, transform;
  width: 100vw;
  z-index: var(--zIndex-Hero);

  @media (min-width: 960px) {
    max-width: 860px;
    margin: 0 auto;
  }

  @media (min-width: 1100px) {
    max-width: 1025px;
  }

  .player__info,
  .player__desktop__bar {
    padding-bottom: ${props => `calc(${props.sizeH} / 15)`};
    padding-left: ${props => `calc(${props.sizeH} / 10)`};
    padding-right: ${props => `calc(${props.sizeH} / 10)`};
    padding-top: ${props => `calc(${props.sizeH} / 15)`};
    width: 100%;
    flex: 1 1;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: space-evenly;

    @media (min-width: 960px) {
      flex: 0;
    }
  }

  .player__health {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    position: relative;

    /* div[data-component='PlayerHealthOrb'] {
      margin-right: calc(var(--class-skill-button-size) / -4.375);
    } */
  }

  .player__fab {
    position: absolute;
    top: 0;
    left: 45%;
    right: auto;
    bottom: auto;
    transform: translateY(calc(var(--player-fab-size) / -1.458));
    z-index: 1;
  }

  .player__stats {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;

    @media (min-width: 960px) {
      margin-bottom: calc(var(--hero-height) / 3.5);
      width: 70px;
    }
  }

  .player__desktop__bar {
    flex: 1 1;
    align-items: center;
    justify-content: center;
  }
`;
