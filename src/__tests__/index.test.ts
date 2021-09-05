import test from "ava";
import { Farcaster } from '../farcaster';
import { AddressActivity, AddressActivityBodyType, Directory, ReactionType } from '../types';

test("isValidDirectorySignature()", async (t) => {
  const address = '0xC6C0b79d0034A9A44c01c7695EaE26c9A7d23e40'
  const correctlySignedDirectory: Directory = {
    "body": {
      "addressActivityUrl": "https://guardian.farcaster.xyz/origin/address_activity/0xC6C0b79d0034A9A44c01c7695EaE26c9A7d23e40",
      "avatarUrl": "https://lh3.googleusercontent.com/MyUBL0xHzMeBu7DXQAqv0bM9y6s4i4qjnhcXz5fxZKS3gwWgtamxxmxzCJX7m2cuYeGalyseCA2Y6OBKDMR06TWg2uwknnhdkDA1AA",
      "displayName": "Dan Romero",
      "proofUrl": "https://guardian.farcaster.xyz/origin/proof/0xC6C0b79d0034A9A44c01c7695EaE26c9A7d23e40",
      "timestamp": 1630619056003,
      "version": 1
    },
    "merkleRoot": "0xb1661819a968f0bd4ea727add2d49f4799b43a5dd189ec7004de91263079577d",
    "signature": "0xfe487ba982022b39310708fc95af654ca45b708d72e3e4dc02d07fed904859920d7f4ff27ad8ac4a833e3df98ddfe5d4375a067f21a0462a37030122b0c637551c"
  };
  t.true(await Farcaster.isValidDirectorySignature(address, correctlySignedDirectory));
  t.false(await Farcaster.isValidDirectorySignature(address, { ...correctlySignedDirectory, signature: '0xda120282bf3ff6ffff7b079c27a9479d5ec7cf31e270d9700c1f1e2c0db5583b1a04ea324b6ff4bb6551b88b5176271f5db60727be63b434b0b5c31565a1e12d1c' }));
  t.false(await Farcaster.isValidDirectorySignature(address, { ...correctlySignedDirectory, merkleRoot: '0x2ef0c4ce20ce44d86b06418509135ac5a15b14e4a569bbd002d276c4596706ac' }));
});

test("isValidAddressActivitySignature()", async (t) => {
  const address = '0xC6C0b79d0034A9A44c01c7695EaE26c9A7d23e40';
  const correctlySignedActivity: AddressActivity = {
    "body": {
      "type": AddressActivityBodyType.TextShort,
      "publishedAt": 1630800202200,
      "sequence": 883,
      "username": "dwr",
      "address": "0xC6C0b79d0034A9A44c01c7695EaE26c9A7d23e40",
      "data": {
        "text": "DAOs as next gen clans or guilds. cc @gubsheep\n\nhttps://medium.com/dfdao/the-crypto-gaming-governance-thesis-39b85b371e4e"
      },
      "prevMerkleRoot": "0xd96926ed066a7e199877fe762f2d4eb5d8506905fb8cae07af1e39389212cbec"
    },
    "merkleRoot": "0x763b002ca8575a307368942abe0b5f84b8ee4e275fe4adff44127195e0b74e21",
    "signature": "0x6032cfb5675dbbe3fded24079ebd283b77eb891b702e16562bf221b107e6f16b12b5a0ab0c0efb2118885a0ee387af2353bced71ee8dfc1fe4bfbaaf0d5d4d2f1c",
    "meta": {
      "displayName": "Dan Romero",
      "avatar": "https://lh3.googleusercontent.com/MyUBL0xHzMeBu7DXQAqv0bM9y6s4i4qjnhcXz5fxZKS3gwWgtamxxmxzCJX7m2cuYeGalyseCA2Y6OBKDMR06TWg2uwknnhdkDA1AA",
      "isVerifiedAvatar": true,
      "numReplyChildren": 0,
      "reactions": {
        "count": 5,
        "type": ReactionType.Like,
        "self": false
      },
      "mentions": [
        {
          "address": "0x1c12A092Ed9f2AA6Ac1A01e118C5903881Bc70Db",
          "username": "gubsheep"
        }
      ]
    }
  };
  t.true(await Farcaster.isValidAddressActivitySignature(address, correctlySignedActivity));
  t.false(await Farcaster.isValidAddressActivitySignature(address, { ...correctlySignedActivity, signature: '0xfe487ba982022b39310708fc95af654ca45b708d72e3e4dc02d07fed904859920d7f4ff27ad8ac4a833e3df98ddfe5d4375a067f21a0462a37030122b0c637551c' }));
  t.false(await Farcaster.isValidAddressActivitySignature(address, { ...correctlySignedActivity, merkleRoot: '0xb1661819a968f0bd4ea727add2d49f4799b43a5dd189ec7004de91263079577d' }));
});
