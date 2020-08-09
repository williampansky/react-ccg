import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import { getPercentageChange } from '@ccg/utils';
import { usePrevious } from '@ccg/hooks';
import * as Styled from './styled';

/**
 * @see https://codepen.io/junebug12851/pen/mJZNqN
 */
const HealthOrb = props => {
  const { armorPoints, currentHealth, parentComponent, totalHealth } = props;
  const [healthState, setHealthState] = useState(totalHealth);
  const previousHealth = usePrevious(healthState);
  const [colorClass, setColorClass] = useState('green');
  const [waterPercent, setWaterPercent] = useState(0);
  const progressRef = useRef();
  const waterRef = useRef();
  const colorIncrement = totalHealth / 3;
  const colorClasses = {
    1: 'green',
    2: 'orange',
    3: 'red'
  };

  useEffect(() => {
    currentHealth !== previousHealth && setHealthState(currentHealth);
  }, [currentHealth, previousHealth]);

  useEffect(() => {
    setWaterPercent(getPercentageChange(totalHealth, currentHealth));
  }, [totalHealth, currentHealth]);

  const setColorClassCallback = useCallback(
    value => {
      if (value <= totalHealth && value >= 0) {
        if (healthState < colorIncrement * 1)
          return setColorClass(colorClasses[3]);
        else if (healthState < colorIncrement * 2)
          return setColorClass(colorClasses[2]);
        else return setColorClass(colorClasses[1]);
      } else {
        return setColorClass(colorClasses[1]);
      }
    },
    [colorClasses, colorIncrement, healthState, totalHealth]
  );

  useEffect(() => {
    setColorClassCallback(healthState);
  }, [setColorClassCallback, healthState]);

  return (
    <Styled.Component
      data-component="HealthOrb"
      orbSize={'var(--player-health-size)'}
      parentComponent={parentComponent}
    >
      <div className={colorClass}>
        <div className="progress" ref={progressRef}>
          <div className="inner">
            <div className={'player__health__orb__value'}>
              <span className="text__value">
                <CountUp start={previousHealth} end={healthState} />
              </span>
            </div>
            <div
              className="water"
              ref={waterRef}
              style={{ top: `${waterPercent}%` }}
            />
            <div className="glare" />
            <ul
              className="css__bubbles"
              style={{ top: `${waterPercent + 5}%` }}
            >
              {Array.from(Array(6)).map((_, idx) => (
                <li key={idx}>
                  <span className={`css__bubble css__bubble--${idx}`} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Styled.Component>
  );
};

HealthOrb.propTypes = {
  armorPoints: PropTypes.number,
  currentHealth: PropTypes.number,
  totalHealth: PropTypes.number
};

HealthOrb.defaultProps = {
  armorPoints: 0,
  currentHealth: 30,
  totalHealth: 30
};

export default HealthOrb;
