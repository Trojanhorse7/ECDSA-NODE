const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { keccak256 } = require("ethereum-cryptography/keccak");
const secp = require('ethereum-cryptography/secp256k1')

app.use(cors());
app.use(express.json());

// 30af21ff7cb486f24eb18c9bc7dc6ae50811fdd09c49213c486717cfcc201f4e
// 029c82574d0d001e040dfe683cc5a0811f4c0d0c7554a96a189179504f55fa50ab

// f232b64b4c6d09d8a1ce8885a602877efd67f3ef0bfc0c183d9e5a73e7470c41
// 037d9d3af9f3755b03fd2a2ad5f1775d53f492762601f8272c1e1dd47185b19c58

// c37f8af022dbf1abd3324a5b975986e907544726ec12b5b3ff50d1d8a50366aa
// 03162606f5d8f4eca41244474d49a32c58eaba4cd848fcf213bc42dad3b3c5cba9

const balances = {
  "029c82574d0d001e040dfe683cc5a0811f4c0d0c7554a96a189179504f55fa50ab": 100,
  "037d9d3af9f3755b03fd2a2ad5f1775d53f492762601f8272c1e1dd47185b19c58": 50,
  "03162606f5d8f4eca41244474d49a32c58eaba4cd848fcf213bc42dad3b3c5cba9": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  address
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, sig:sigStringed, msg } = req.body;
  const { recipient, amount } = msg;

  // convert stringified bigints back to bigints
  const sig = {
    ...sigStringed,
    r: BigInt(sigStringed.r),
    s: BigInt(sigStringed.s)
  }

  const hashMessage = (message) => keccak256(Uint8Array.from(message));

  const isValid = secp.secp256k1.verify(sig, hashMessage(msg), sender) === true;
  
  if(!isValid) {
    res.status(400).send({ message: "Bad signature!"});
  } else {
    setInitialBalance(sender);
    setInitialBalance(recipient);
  
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
