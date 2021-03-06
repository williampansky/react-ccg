/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { TARGET_CONTEXT } from '@ccg/enums';

export default function CanBeStolen({ moves, index }) {
  const { castTargetedSpell } = moves;
  return (
    <div
      className="minion--can-be-debuffed"
      data-file="interactions/minions/CanBeStolen"
      onClick={() => castTargetedSpell(TARGET_CONTEXT['OPPONENT'], index)}
      role="button"
      tabIndex={0}
    />
  );
}

CanBeStolen.propTypes = {
  moves: PropTypes.object,
  index: PropTypes.number
};
