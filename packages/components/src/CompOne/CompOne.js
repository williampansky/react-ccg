import React from 'react';
import './CompOne.css';
import { TYPE } from '@ccg/enums';

const CompOne = () => (
  <div className="Comp">
    <h3>
      <span role="img" aria-label="React Logo">
        ⚛️
      </span>
      {TYPE['SPELL']}
    </h3>
  </div>
);

export default CompOne;
