import React, { useMemo } from 'react';
import { WalletProvider } from '@rentfuse-labs/neo-wallet-adapter-react';
// import { WalletAdapterNetwork } from '@rentfuse-labs/neo-wallet-adapter-base';
import { getNeoLineWallet } from '@rentfuse-labs/neo-wallet-adapter-wallets';
// import {
// 	WalletModalProvider,
// 	WalletDisconnectButton,
// 	WalletMultiButton,
// } from '@rentfuse-labs/neo-wallet-adapter-react-ui';

require('@rentfuse-labs/neo-wallet-adapter-react-ui/styles.css');

export const WalletConnectionProvider = React.memo(function WalletConnectionProvider({children}) {
    // @rentfuse-labs/neo-wallet-adapter-wallets includes all the adapters but supports tree shaking --
    // Only the wallets you configure here will be compiled into your application
    const wallets = useMemo(
      () => [
        getNeoLineWallet(),
      ],
      [],
    );
  
    return (
      <WalletProvider wallets={wallets} autoConnect={true}>
        {children}
      </WalletProvider>
    );
  });