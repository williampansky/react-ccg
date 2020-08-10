import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { replaceConstant, formatCardText, createMarkup } from '@ccg/utils';
import * as Styled from './styled';

const SlotTargetingTooltip = props => {
  const { id, index, playerSpellDamage, showTooltip, spellObject } = props;

  const handleTargetingTooltip = useCallback(
    spellObj => {
      if (!spellObj) return;
      const { numberPrimary, numberSecondary, targetingArrowText } = spellObj;
      return replaceConstant(
        formatCardText(
          targetingArrowText,
          numberPrimary,
          numberSecondary,
          playerSpellDamage
        )
      );
    },
    [playerSpellDamage]
  );

  return (
    <Styled.TargetingTooltip showTooltip={showTooltip}>
      <ReactTooltip
        id={`${id}--${index}`}
        place="top"
        type="dark"
        effect="solid"
        multiline={true}
      >
        <p
          className="text__value"
          dangerouslySetInnerHTML={createMarkup(
            handleTargetingTooltip(spellObject)
          )}
        />
      </ReactTooltip>
    </Styled.TargetingTooltip>
  );
};

SlotTargetingTooltip.propTypes = {};

SlotTargetingTooltip.defaultProps = {};

export default SlotTargetingTooltip;
