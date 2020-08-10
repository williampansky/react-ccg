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
