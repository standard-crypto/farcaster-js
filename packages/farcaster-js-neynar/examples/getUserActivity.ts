import { NeynarAPIClient } from '@standard-crypto/farcaster-js-neynar';

const client = new NeynarAPIClient('apiKey');

const username = 'dwr';

const user = await client.v1.lookupUserByUsername(username);
if (user === null) throw new Error(`No user ${username} found.`);

const numCastsToFetch = 100;
let castsFetched = 0;
console.log('User Casts:');
for await (const cast of await client.v1.fetchCastsForUser(user.fid)) {
  console.log(cast.text);
  castsFetched++;
  if (castsFetched === numCastsToFetch) break;
}

const numLikesToFetch = 100;
let likesFetched = 0;
console.log('User Likes:');
for await (const like of await client.v1.fetchUserCastLikes(user.fid)) {
  console.log(`${like.cast_author?.username} : ${like.cast?.cast_text}`);
  likesFetched++;
  if (likesFetched === numLikesToFetch) break;
}
