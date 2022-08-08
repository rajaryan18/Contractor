import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink
} from 'react-router-dom';
// import { DAppProvider, ChainId, Kovan } from '@usedapp/core';

import Auth from './pages/Auth';
import Home from './pages/Home';
import NewContract from './pages/NewContract';
import Profile from './pages/Profile';

const INFURA_ID = '0e1704ef2122495bbe12277cce5e46c9';

function App() {
  // const auth = useContext(AuthContext);
  // const { account } = useAccount();

  return (
    // <DAppProvider config={{
    //   supportedChains: [ChainId.Kovan],
    //   readOnlyUrls: {
    //     [Kovan.chainId]: `https://kovan.infura.io/v3/${INFURA_ID}`
    //   },
    //   notifications: {
    //     expirationPeriod: 1000,
    //     checkInterval: 1000
    //   }
      
    // }}>
    //   <AuthContext.Provider value={{
    //     acc: account
    //   }}>
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/home/contract" exact element={<NewContract />} />
          <Route path="/home/profile" element={<Profile />} />
          <Route path="/" element={<NavLink to="/home" />} />
        </Routes>
      </Router>
    </div>
    //   </AuthContext.Provider>
    // </DAppProvider>
  );
}

export default App;