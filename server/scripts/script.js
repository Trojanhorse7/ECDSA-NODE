const { keccak256 } = require("ethereum-cryptography/keccak");
const secp = require('ethereum-cryptography/secp256k1')
const {toHex} = require('ethereum-cryptography/utils')

function createPublicPrivateandAddress() {

    const privateKey = secp.secp256k1.utils.randomPrivateKey();
    console.log(toHex(privateKey))
    const publicKey = secp.secp256k1.getPublicKey(privateKey)
    console.log(toHex(publicKey))

    //getting the publickey
    const cutKey = publicKey.slice(1)
    const hashed =  keccak256(cutKey)
    const address = toHex(hashed.slice(-20));
    return ("0x" + address)
}

createPublicPrivateandAddress()

module.exports = createPublicPrivateandAddress;