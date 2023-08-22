import './App.css';
import React from 'react';
import {WalletConnectionProvider} from './components/Wallet'
import {
	WalletModalProvider,
} from '@rentfuse-labs/neo-wallet-adapter-react-ui';
import { Page } from './Page';

require('@rentfuse-labs/neo-wallet-adapter-react-ui/styles.css');

function App() {
  return (
    <div className="App">
      <WalletConnectionProvider>
        <WalletModalProvider>
				  <Page />
			  </WalletModalProvider>
      </WalletConnectionProvider>
    </div>
  );
}

export default App;