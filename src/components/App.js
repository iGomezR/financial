import React from 'react';

import { Header } from './header/index';
import AppRoutes from '../routes/AppRoutes';

function App() {

  // const [risk, setRisk] = useState(0);
  return (
    <div className="react-root">
          <Header color='primary' />
          <AppRoutes />
    </div>
  );
}

export default App;
