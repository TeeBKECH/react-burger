import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ModalSwitch } from '../modal-switch/modal-switch';

const App = () => {
  
  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}

export default App;