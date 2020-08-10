import styled from 'styled-components';

export const Component = styled.div`
  width: ${props => props.iconWidth};
  height: ${props => props.iconHeight};

  .icon {
    display: inline-block;
    color: ${props => props.iconColor};
    width: 100%;
    height: 100%;
  }

  .icon > div {
    pointer-events: none;
    width: 100%;
    height: 100%;
  }

  svg {
    display: block;
    pointer-events: none;
    width: 100%;
    height: 100%;
  }

  svg,
  svg g,
  svg path,
  svg line {
    fill: currentColor;
    stroke: currentColor;
  }
`;
