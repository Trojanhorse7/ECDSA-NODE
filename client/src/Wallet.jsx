import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1';
import {keccak256} from "ethereum-cryptography/keccak";
import {toHex} from 'ethereum-cryptography/utils'

function Wallet({ address, setAddress, balance, setBalance, pvtKey, setPvtKey }) {
  async function onChange(evt) {
    const pvtKey = evt.target.value;
    setPvtKey(pvtKey);
    const address = toHex(secp.secp256k1.getPublicKey(pvtKey));
    setAddress(address);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(() => balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Input your Private Key" value={pvtKey} onChange={onChange}></input>
      </label>

      <div className="balance">Address: {address}</div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
