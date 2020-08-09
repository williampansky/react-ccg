import React from 'react';
import { Avatar } from '@ccg/components';
import * as Styled from './styled';

const PlayerAvatar = props => {
  return (
    <Styled.PlayerAvatar data-component="PlayerAvatar">
      <Avatar {...props} />
    </Styled.PlayerAvatar>
  );
};

export default PlayerAvatar;
