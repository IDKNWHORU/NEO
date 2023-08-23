import { useState } from 'react';
import './App.css';
import { NeolineSignleton } from './NeolineSingleton';
import { initDapi } from './neoline';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserDataLoading, setIsUserDataLoading] = useState(false);
  const [message, setMessage] = useState('NeoLine 데이터를 불러오는 중입니다.');
  const [address, setAddress] = useState('');
  const [asset, setAsset] = useState([]);
  const [addressScriptHash, setAddressScriptHash] = useState('');

  const [targetAddress, setTargetAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [symbol, setSymbol] = useState('');

  const getUserData = _ => {
    NeolineSignleton.neolineN3.getBalance().then(result => {
      if(!isUserDataLoading) {
        NeolineSignleton.neolineN3.AddressToScriptHash({ address: Object.keys(result)[0] }).then(({ scriptHash }) => { setAddressScriptHash(scriptHash) });
        setIsUserDataLoading(true);
        setAddress(Object.keys(result)[0]);
        setAsset(result[Object.keys(result)[0]]);
      }
      setSymbol(result[Object.keys(result)[0]][0].symbol);
    })
    .catch(err => {
      toastMessage(err.toString());
    })
  }

  const toastMessage = message => {
    setMessage(message);
    setTimeout(() => { setMessage('') }, 2000);
  }

  const send = _ => {
    switch (symbol) {
      case 'NEO': case 'GAS':
        NeolineSignleton.neolineN3.send({
          fromAddress: address,
          toAddress: targetAddress,
          asset: symbol,
          amount,
        }).then(getUserData)
          .catch(({ description }) => {
            toastMessage(description);
          });
        break;
      case 'LUDIUM':
        NeolineSignleton.neolineN3.invoke({
          scriptHash: 'ca3d9ddbc153c11dbd1abc0ff55e25b9fdcdbce3',
          operation: 'transfer',
          args: [
            { type: 'Address', value: address },
            { type: 'Address', value: targetAddress },
            { type: 'Integer', value: amount * 100000000 },
            { type: 'Any', value: null }
          ],
          signers: [{ account: addressScriptHash, scopes: 1 }]
        }).then(getUserData)
          .catch(({ description }) => {
            toastMessage(description);
          });
        break;
    }
  }

  const putAddress = ({ target }) => {
    setTargetAddress(target.value)
  }

  const putAmount = ({ target }) => {
    setAmount(target.value)
  }

  const changeSymbol = ({ target }) => {
    setSymbol(target.value);
  }

  const Balances = asset.map(({ amount, symbol }) => (
    <li key={symbol}>{symbol}: {amount}</li>
  ));

  if (isLoading) {
    initDapi(setIsLoading, setMessage);
  } else {
    if(!isUserDataLoading) getUserData();
  }

  return (
    <>
      {isLoading ? <p>{message}</p> : <div>
        {message === '' ? null : <><p>{message}</p> <hr /></>}
        <button onClick={getUserData}>데이터 불러오기</button>
        <p>{address}</p>
        <details open={asset.length > 0}>
          <summary>자산 목록</summary>
          <ul>
            {Balances}
          </ul>
        </details>
        <hr />
        <details open={asset.length > 0}>
          <summary>내 자산 보내기</summary>
          <ul>
            <li>
              <label htmlFor="address" style={{ marginRight: 30 }}>보내는 주소</label>
              <input type="text" id="address" onChange={putAddress} />
            </li>
            <li>
              <label htmlFor="quantity" style={{ marginRight: 78 }}>금액</label>
              <input type="number" id="quantity" onChange={putAmount} style={{ textAlign: 'end' }} />
              <select onChange={changeSymbol}>
                {asset.map(({ symbol }) => <option key={symbol} value={symbol}>{symbol}</option>)}
              </select>
            </li>
            <button onClick={send} style={{ width: 365, marginTop: 15 }}>send</button>
          </ul>
        </details>
      </div>
      }
    </>
  );
}

export default App;
