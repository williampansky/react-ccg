import styled from 'styled-components';

export const Component = styled.div`
  /* prettier-ignore */
  @media (max-width: 639px) { --minion-height: 120px; }
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  height: 50%;
  justify-content: center;
  max-width: 100vw;
  min-width: 100vw;
  width: 100vw;
  position: relative;

  /* used to add left and right space on mobile devices */
  .board__slot__spacer {
    opacity: 0;
    pointer-events: none;
    transition: all 200ms ease-in-out;
    height: 100%;
    min-width: 0;

    @media (min-width: 960px) {
      display: none;

      /* on desktops to align minions correctly when your board is full */
      [data-board-length='7'] & {
        display: block;
        width: 2.5%;
      }
    }
  }
`;
