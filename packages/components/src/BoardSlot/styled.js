import styled from 'styled-components';

export const Component = styled.div`
  align-items: center;
  border-radius: var(--minion-border-radius);
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  margin: 0 5.25%;
  min-width: 5%;
  opacity: 0;
  pointer-events: none;
  position: relative;
  transition-property: margin, min-width, transform, width;
  transition: 400ms cubic-bezier(0.19, 1, 0.22, 1);
  user-select: none;
  width: auto;

  @media (min-width: 640px) {
    margin: 0 2.25%;
  }

  @media (min-width: 960px) {
    overflow: visible;
    margin: 0;
  }

  &[data-is-empty='false'] {
    border-color: transparent;
    min-width: fit-content;
    opacity: 1;
    pointer-events: auto;
  }

  &[data-is-new='true'] {
    animation: scaleIn 600ms var(--animation-transition-cubic) forwards;

    @keyframes scaleIn {
      0% {
        opacity: 0;
        transform: scale(5);
      }

      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
`;

export const TargetingTooltip = styled.div`
  opacity: ${props => (props.showTooltip ? '1' : '0')};
`;

/* prettier-ignore */
export const SlotCardTooltip = styled.div`
                               --card-height: 250px;
  @media (min-width: 1200px) { --card-height: 300px; }
  @media (min-width: 1920px) { --card-height: 350px; }

  align-items: flex-start;
  animation-delay: 1200ms;
  animation-duration: 200ms;
  cursor: default;
  display: none;
  @media (min-width: 960px) { display: flex; }
  flex-flow: column nowrap;
  font-size: 10px;
  @media (min-width: 1100px) { font-size: 11px; }
  @media (min-width: 1200px) { font-size: 12px; }
  @media (min-width: 1360px) { font-size: 13px; }
  justify-content: flex-start;
  left: ${props => props.tooltipSide === 'left'
    ? 'calc(var(--card-height) * -0.6)'
    : 'auto'
  };
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: ${props => props.tooltipSide === 'left'
    ? 'auto'
    : 'calc(var(--card-height) * -0.6)'
  };
  top: calc(var(--card-height) * -0.8);
  @media (min-width: 1200px) { top: calc(var(--card-height) * -0.7); }
  z-index: 1000;

  ul {
    left: ${props => props.tooltipSide === 'left' ? '0' : 'auto'};
    list-style-type: none;
    margin-bottom: 0;
    margin-left: ${props => props.tooltipSide === 'left'
      ? 'calc(calc(var(--card-height) / 1.715) * -1)'
      : 'calc(var(--card-height) / 1.315)'
    };
    margin-right: ${props => props.tooltipSide === 'left' ? 'auto' : '0'};
    margin-top: calc(var(--card-height) / 40);
    max-width: calc(var(--card-height) / 1.8263249);
    padding: 0;
    position: absolute;
    right: ${props => props.tooltipSide === 'left' ? 'auto' : '0'};
    width: 100%;
  }
`;
