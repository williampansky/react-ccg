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
    <Styled.TargetingTooltip
      data-component="TargetingTooltip"
      data-show-tooltip={showTooltip}
      showTooltip={showTooltip}
    >
      <ReactTooltip
        effect="solid"
        id={`${id}--${index}`}
        multiline={true}
        place="top"
        type="dark"
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

SlotTargetingTooltip.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number,
  playerSpellDamage: PropTypes.number,
  showTooltip: PropTypes.bool,
  spellObject: PropTypes.object
};

export default SlotTargetingTooltip;
