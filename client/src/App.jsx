import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [pvtKey, setPvtKey] = useState("30af21ff7cb486f24eb18c9bc7dc6ae50811fdd09c49213c486717cfcc201f4e");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        pvtKey={pvtKey}
        setPvtKey={setPvtKey}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} privateKey={pvtKey} />
    </div>
  );
}

export default App;
