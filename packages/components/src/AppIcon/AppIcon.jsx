import React from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import { getIcon } from '@ccg/utils';
import * as Styled from './styled';

/**
 * @param {string} color=white Color of the rendered icon
 * @param {string} fileName String of the icon file
 * @param {string} height=20px Height of the rendered icon
 * @param {string} width=20px Height of the rendered icon
 *
 * @requires react-svg
 * @see https://github.com/tanem/react-svg
 */
const AppIcon = ({ color, fileName, height, size, width }) => {
  return (
    <Styled.Component
      data-component="AppIcon"
      iconColor={color}
      iconHeight={height || size}
      iconWidth={width || size}
    >
      <ReactSVG className={'icon'} src={getIcon(fileName)} />
    </Styled.Component>
  );
};

AppIcon.propTypes = {
  color: PropTypes.string,
  fileName: PropTypes.string.isRequired,
  height: PropTypes.string,
  size: PropTypes.string,
  width: PropTypes.string
};

AppIcon.defaultProps = {
  color: 'white',
  size: '20px'
};

export default AppIcon;
