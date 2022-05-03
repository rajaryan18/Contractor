import Home from './pages/Home';
import { DAppProvider, ChainId } from '@usedapp/core';

function App() {
  return (
    <DAppProvider config={{
      supportedChains: [ChainId.Kovan],
      notifications: {
        expirationPeriod: 1000,
        checkInterval: 1000
      }
    }}>
      <div className="App">
        <Home />
      </div>
    </DAppProvider>
  );
}

export default App;