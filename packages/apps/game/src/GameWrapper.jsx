import React from 'react';
import { DatePicker } from 'antd';

import IMAGES from '@ccg/images';
// import { ABILITIES } from '@ccg/data';
// import { exists } from '@ccg/utils';
// import { CONFIG } from '@ccg/config';
// import { TYPE } from '@ccg/enums';
// import { CompOne, CompTwo } from '@ccg/components';

const GameWrapper = props => {
  console.log(IMAGES);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <a
            className="App-link"
            href="https://github.com/react-workspaces/cra-workspaces-playground"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>React</strong> Workspaces
          </a>
        </h1>
        <h2>Hot Reload Your Workspaces</h2>
        <div className="components">
          <DatePicker />
        </div>
      </header>
    </div>
  );
};

export default GameWrapper;
