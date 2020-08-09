import styled from 'styled-components';

export const Component = styled.div`
  align-items: center;
  border-radius: 50%;
  display: flex;
  flex-flow: column nowrap;
  font-size: 42px;
  font-weight: bold;
  justify-content: center;
  pointer-events: none;
  /* height: ${props => props.orbSize};
  width: ${props => props.orbSize}; */
  z-index: 0;
  position: relative;
  margin-right: calc(var(--class-skill-button-size) / -4.375);
  top: ${props => (props.parentComponent === 'Player' ? '-50px' : '50px')};

  .player__health__orb__value {
    font-family: var(--font-family-card);
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    line-height: 1;
    color: white;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  .player__health__orb__image {
    margin: 0;
    height: ${props => `calc(${props.orbSize} + 30px)`};
    image-rendering: pixelated;
  }
`;

export const PlayerHealthOrb = styled.div`
  @media (min-width: 960px) {
    position: fixed;
    bottom: -100px;
    right: 0;

    [data-component='HealthOrb'] {
      font-size: 60px;
    }

    [data-component='HealthOrb'] .progress {
      height: 200px;
      width: 200px;
    }

    [data-component='HealthOrb'] .inner {
      width: 190px;
      height: 190px;
    }
  }
`;
