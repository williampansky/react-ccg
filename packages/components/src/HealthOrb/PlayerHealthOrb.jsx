import React from 'react';
import { HealthOrb } from '@ccg/components';
import * as Styled from './styled';

const PlayerHealthOrb = props => {
  return (
    <Styled.PlayerHealthOrb
      data-component="PlayerHealthOrb"
      orbSize={'var(--player-health-size)'}
    >
      <HealthOrb {...props} />
    </Styled.PlayerHealthOrb>
  );
};

export default PlayerHealthOrb;
