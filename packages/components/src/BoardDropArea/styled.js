import styled from 'styled-components';

export const Component = styled.div`
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 0px dashed rgba(255, 255, 255, 0.25);
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  min-width: 0;
  opacity: 0;
  pointer-events: none;
  position: relative;
  user-select: none;
  width: 0;
  overflow: hidden;
  height: 100%;
  transition: all 200ms ease-in-out;
  outline: none;

  &${props => props.areaIsAlone} {
    width: 100%;
    height: 80%;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    display: none;
  }

  @media (min-width: 960px) {
    width: 30px;
  }

  &${props => props.boardIsActive} {
    cursor: pointer;
    pointer-events: auto;
    width: 1%;
    margin: 0;
    opacity: 1;

    & + div,
    & + div [data-component*='minion-interactions'] {
      pointer-events: none;
    }

    &.area--is-alone {
      width: 100%;
      height: 80%;
      margin: 0;
      display: block;
    }

    @media (max-width: 959px) {
      background: rgba(255, 255, 255, 0.25);
      border: 1px dashed rgba(255, 255, 255, 0.925);
      min-width: 7.5%;
      width: 7.5%;
    }

    @media (min-width: 960px) {
      width: 30px;
      max-width: none;
      opacity: 0;
      z-index: 9000;

      &:not(.area--is-alone):hover {
        width: calc(calc(var(--minion-height) / 1.25) + 50px);
      }
    }

    @keyframes ants {
      to {
        background-position: 100%;
      }
    }
  }

  &${props => props.cantDropMinion} {
    cursor: default;
    pointer-events: none;
  }

  [data-your-board-length='7'] &${props => props.areaIndex} {
    display: none;
  }
`;
