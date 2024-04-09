import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { expectDefinedNonNull } from '../utils.js';
import { Logger, silentLogger } from '../../src/logger.js';
import {
  Cast,
  PostCastResponseCast,
  EmbedUrl,
  ReactionType,
  NeynarV2APIClient,
} from '../../src/v2/index.js';
import { NeynarAPIClient } from '../../src/index.js';

chai.use(chaiAsPromised);

const apiKey = process.env.INTEGRATION_TEST_NEYNAR_API_KEY;
const signerUuid = process.env.INTEGRATION_TEST_NEYNAR_SIGNER_UUID;
const signerPublicKey = process.env.INTEGRATION_TEST_NEYNAR_SIGNER_PUBLIC_KEY;
const userBotFid = parseInt(process.env.INTEGRATION_TEST_NEYNAR_SIGNER_FID ?? '0');

const testLogger: Logger = {
  info: silentLogger.info,
  debug: silentLogger.debug,
  trace: silentLogger.trace,
  warn: silentLogger.warn,

  /* eslint-disable no-console */
  error: console.error,
  /* eslint-enable no-console */
};

const userDwrFid = 3;
const userGaviFid = 69; // @gavi
const invalidUserFid = 1111111111111111;

async function sleep(ms: number): Promise<void> {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

if (apiKey !== undefined && apiKey !== '') {
  describe('NeynarAPI', function() {
    this.timeout('30000');

    let client: NeynarAPIClient;

    before('create client', async function() {
      client = new NeynarAPIClient(apiKey, { logger: testLogger });
    });

    describe('v1 Client', function() {
      describe('Cast API', function() {
        describe('#fetchCastsInThread', function() {
          it('can fetch multiple pages of casts', async function() {
            const threadHash = '0xd02442da75c1a09c0b0a735f9d6fdfb0db287d89';
            const castSet = new Set();
            const castsInThread = await client.v1.fetchCastsInThread(threadHash);
            expectDefinedNonNull(castsInThread);
            for (const cast of castsInThread) {
              expectDefinedNonNull(cast.hash);
              expect(castSet).not.to.contain(cast.hash);
              castSet.add(cast.hash);
            }
            expect(castsInThread.length).to.be.greaterThan(10);
          });
          it('returns empty generator for an invalid cast hash', async function() {
            const threadHash = '0x0000000000000000000000000000000000000000';
            const castsInThread = await client.v1.fetchCastsInThread(threadHash);
            expect(castsInThread).to.be.empty;
          });
        });
        describe('#fetchCastsForUser', function() {
          it('can fetch at least one cast', async function() {
            let foundCast = false;
            // eslint-disable-next-line no-unreachable-loop
            for await (const cast of client.v1.fetchCastsForUser(
              userGaviFid,
            )) {
              foundCast = true;
              expect(cast.author.fid).to.eq(userGaviFid);
              expectDefinedNonNull(cast.timestamp);
              break;
            }
            expect(foundCast).to.be.true;
          });

          it('can fetch multiple pages worth of casts', async function() {
            let castCount = 0;
            const castSet = new Set();
            const castCountBiggerThanPageSize = 150;
            for await (const cast of client.v1.fetchCastsForUser(
              userDwrFid,
              {
                pageSize: 100,
              },
            )) {
              expect(castSet).not.to.contain(cast.hash);
              castSet.add(cast.hash);
              castCount++;
              if (castCount >= castCountBiggerThanPageSize) {
                break;
              }
            }
            expect(castCount).to.be.greaterThanOrEqual(
              castCountBiggerThanPageSize,
            );
          });

          it('returns empty generator for an invalid user', async function() {
            const casts = client.v1.fetchCastsForUser(invalidUserFid);
            expect(casts).to.be.empty;
          });
        });
        describe('#fetchRecentCasts', function() {
          it('can fetch multiple pages of casts', async function() {
            let castCount = 0;
            const castSet = new Set();
            for await (const cast of client.v1.fetchRecentCasts({
              pageSize: 5,
            })) {
              expectDefinedNonNull(cast);
              expectDefinedNonNull(cast.hash);
              expect(castSet).not.to.contain(cast.hash);
              castSet.add(cast.hash);
              castCount++;
              if (castCount === 10) break;
            }
            expect(castCount).to.eq(10);
          });
        });
      });
      describe('User API', function() {
        describe('#fetchRecentUsers', function() {
          it('can fetch multiple pages of users', async function() {
            let userCount = 0;
            const userSet = new Set();
            for await (const user of client.v1.fetchRecentUsers({
              pageSize: 5,
            })) {
              expectDefinedNonNull(user);
              expectDefinedNonNull(user.fid);
              expect(userSet).not.to.contain(user.fid);
              userSet.add(user.fid);
              userCount++;
              if (userCount === 10) break;
            }
            expect(userCount).to.eq(10);
          });
        });
        describe('#fetchUserCastLikes', function() {
          it('can fetch multiple pages of likes', async function() {
            let castCount = 0;
            const castSet = new Set();
            for await (const cast of client.v1.fetchUserCastLikes(
              userDwrFid,
              {
                pageSize: 5,
              },
            )) {
              expectDefinedNonNull(cast);
              expectDefinedNonNull(cast.reaction);
              expect(cast.reaction.reaction_type).to.eq('like');
              expect(castSet).not.to.contain(
                cast.reaction.reaction_target_hash,
              );
              castSet.add(cast.reaction.reaction_target_hash);
              castCount++;
              if (castCount === 10) break;
            }
            expect(castCount).to.eq(10);
          });
          it('can returns empty generator for an invalid user', async function() {
            const casts = client.v1.fetchUserCastLikes(invalidUserFid, {
              pageSize: 5,
            });
            expect(casts).to.be.empty;
          });
        });
        describe('#lookupUserByFid', function() {
          it('can find existing user', async function() {
            const user = await client.v1.lookupUserByFid(userGaviFid);
            expect(user?.username).to.eq('gavi');
          });

          it('returns null if user not found', async function() {
            const user = await client.v1.lookupUserByFid(
              invalidUserFid,
            );
            expect(user).to.be.null;
          });
        });
        describe('#lookupUserByUsername', function() {
          it('can find existing user', async function() {
            const user = await client.v1.lookupUserByUsername(
              'dwr.eth',
            );
            expect(user?.username).to.eq('dwr.eth');
          });
          // this test is timing out
          it.skip('returns null if user not found', async function() {
            const user = await client.v1.lookupUserByUsername(
              'nosuchusername11', // cSpell:disable-line
            );
            expect(user).to.be.null;
          });
        });
        describe('#fetchCustodyAddress', function() {
          it('can lookup by fid', async function() {
            const expectedCustodyAddr =
              '0x6b0bda3f2ffed5efc83fa8c024acff1dd45793f1';
            const custodyAddr =
              await client.v1.fetchCustodyAddressForUser(userDwrFid);
            expect(custodyAddr).to.eq(expectedCustodyAddr);
          });

          it('returns null if address not found', async function() {
            const user = await client.v1.fetchCustodyAddressForUser(
              invalidUserFid,
            );
            expect(user).to.be.null;
          });
        });
      });
      describe('Verifications API', function() {
        describe('#fetchUserVerifications', function() {
          it("can fetch a user's verifications", async function() {
            const verifications =
              await client.v1.fetchUserVerifications(userDwrFid);
            expect(verifications?.fid).eq(userDwrFid.toString());
            expect(verifications?.verifications.length).to.be.greaterThan(0);
          });
          it('returns empty generator for user with no verifications', async function() {
            const verifications =
              await client.v1.fetchUserVerifications(100);
            expectDefinedNonNull(verifications);
            expect(verifications.verifications).to.be.empty;
          });
        });
        describe('#lookupUserByVerification', function() {
          it('can find existing user', async function() {
            const user = await client.v1.lookupUserByVerification(
              '0x8fc5d6afe572fefc4ec153587b63ce543f6fa2ea',
            );
            expect(user?.fid).to.eq(userDwrFid);
          });
          it('returns null if address not found', async function() {
            const user = await client.v1.lookupUserByVerification(
              '0x0000000000000000000000000000000000000000',
            );
            expect(user).to.be.null;
          });
        });
      });
      describe('Notifications API', function() {
        describe('#fetchMentionAndReplyNotifications', function() {
          it('can fetch mention and reply notifications', async function() {
            let castCount = 0;
            const notificationSet = new Set();
            let notificationFound = false;
            for await (const notification of client.v1.fetchMentionAndReplyNotifications(
              userDwrFid,
              {
                pageSize: 5,
              },
            )) {
              expectDefinedNonNull(notification);
              expectDefinedNonNull(notification.hash);
              expectDefinedNonNull(notification.text);
              expect(notificationSet).not.to.contain(notification.hash);
              notificationSet.add(notification.hash);
              castCount++;
              notificationFound = true;
              if (castCount === 10) break;
            }
            expect(castCount).to.eq(10);
            expect(notificationFound).to.be.true;
          });
          it('returns empty generator for an invalid user', async function() {
            const notifications =
              client.v1.fetchMentionAndReplyNotifications(
                invalidUserFid,
              );
            expect(notifications).to.be.empty;
          });
        });
        describe('#fetchUserLikesAndRecasts', function() {
          it("can fetch a user's likes and recasts", async function() {
            let castCount = 0;
            let notificationFound = false;
            for await (const notification of client.v1.fetchUserLikesAndRecasts(
              userDwrFid,
              {
                pageSize: 5,
              },
            )) {
              expectDefinedNonNull(notification);
              expectDefinedNonNull(notification.hash);
              expectDefinedNonNull(notification.text);
              expectDefinedNonNull(notification.reactors);
              expectDefinedNonNull(notification.reactionType);
              castCount++;
              notificationFound = true;
              if (castCount === 10) break;
            }
            expect(castCount).to.eq(10);
            expect(notificationFound).to.be.true;
          });
          it('returns empty generator for an invalid user', async function() {
            const notifications =
              client.v1.fetchUserLikesAndRecasts(invalidUserFid);
            expect(notifications).to.be.empty;
          });
        });
      });
      describe('Reactions API', function() {
        describe('#fetchCastLikes', function() {
          it('can fetch cast likes', async function() {
            const existingCastHash =
              '0x8763f082e0fef632825a1bc655cd7808ee3bf934';
            let castCount = 0;
            const reactionSet = new Set();
            let reactionFound = false;
            for await (const observedReaction of client.v1.fetchCastLikes(
              existingCastHash,
              { pageSize: 5 },
            )) {
              expect(observedReaction.type).eq(ReactionType.Like);
              expect(reactionSet).not.to.contain(observedReaction.hash);
              reactionSet.add(observedReaction.hash);
              castCount++;
              reactionFound = true;
              if (castCount === 10) break;
            }
            expect(castCount).to.eq(10);
            expect(reactionFound).to.be.true;
          });
          it('can returns empty generator for an invalid cast hash', async function() {
            const invalidCastHash =
              '0x0000000000000000000000000000000000000000';
            const reactions = client.v1.fetchCastLikes(invalidCastHash);
            expect(reactions).to.be.empty;
          });
        });
        describe('#fetchCastReactions', function() {
          it('can fetch reactions to a cast', async function() {
            const existingCastHash =
              '0x8763f082e0fef632825a1bc655cd7808ee3bf934';
            let castCount = 0;
            const reactionSet = new Set();
            let reactionFound = false;
            for await (const observedReaction of client.v1.fetchCastReactions(
              existingCastHash,
              { pageSize: 5 },
            )) {
              expect(reactionSet).not.to.contain(observedReaction.hash);
              reactionSet.add(observedReaction.hash);
              castCount++;
              reactionFound = true;
              if (castCount === 10) break;
            }
            expect(castCount).to.eq(10);
            expect(reactionFound).to.be.true;
          });
          it('can returns empty generator for an invalid cast hash', async function() {
            const invalidCastHash =
              '0x0000000000000000000000000000000000000000';
            const reactions =
              client.v1.fetchCastReactions(invalidCastHash);
            expect(reactions).to.be.empty;
          });
        });
        describe('#fetchRecasters', function() {
          // TODO: fix timeouts
          it.skip('can fetch recasters of a cast', async function() {
            const existingCastHash =
              '0xc6764a88086279ccae9d0bc502e2554a92c48d94';
            let recasterCount = 0;
            const recasterSet = new Set();
            let recasterFound = false;
            for await (const recaster of client.v1.fetchRecasters(
              existingCastHash,
              { pageSize: 5 },
            )) {
              expect(recasterSet).not.to.contain(recaster.fid);
              recasterSet.add(recaster.fid);
              recasterCount++;
              recasterFound = true;
              if (recasterCount === 10) break;
            }
            expect(recasterCount).to.eq(10);
            expect(recasterFound).to.be.true;
          });
          it('can returns empty generator for an invalid cast hash', async function() {
            const invalidCastHash =
              '0x0000000000000000000000000000000000000000';
            const recasters = client.v1.fetchRecasters(invalidCastHash);
            expect(recasters).to.be.empty;
          });
        });
      });
      describe('Follows API', function() {
        describe('#fetchUserFollowers', function() {
          it('can fetch followers of a user', async function() {
            let followerFound = false;
            let followersFound = 0;
            const followersSet = new Set();
            const followers = await client.v1.fetchUserFollowers(
              userGaviFid,
            );
            for (const follower of followers) {
              expectDefinedNonNull(follower);
              expectDefinedNonNull(follower.fid);
              expect(followersSet).not.to.contain(follower.fid);
              followersSet.add(follower.fid);
              followerFound = true;
              followersFound++;
              if (followersFound === 25) break;
            }
            expect(followersFound).to.eq(25);
            expect(followerFound).to.be.true;
          });
          it('returns empty generator for an invalid user', async function() {
            const followers = await client.v1.fetchUserFollowers(
              invalidUserFid,
            );
            expect(followers).to.be.empty;
          });
        });
        describe('#fetchUserFollowing', function() {
          it('can fetch users followed by a user', async function() {
            let followingFound = false;
            let dwrFound = false;
            const followingSet = new Set();
            const following = await client.v1.fetchUserFollowing(
              userGaviFid,
            );
            for (const follow of following) {
              if (follow.fid === userDwrFid) {
                dwrFound = true;
                break;
              }
              expectDefinedNonNull(follow);
              expectDefinedNonNull(follow.fid);
              expect(followingSet).not.to.contain(follow.fid);
              followingSet.add(follow.fid);
              followingFound = true;
            }
            expect(followingFound).to.be.true;
            expect(dwrFound).to.be.true;
          });
          it('returns empty generator for an invalid user', async function() {
            const following = await client.v1.fetchUserFollowing(
              invalidUserFid,
            );
            expect(following).to.be.empty;
          });
        });
      });
    });
    if (
      signerUuid !== undefined &&
      signerUuid !== '' &&
      signerPublicKey !== undefined &&
      signerPublicKey !== '' &&
      userBotFid !== 0
    ) {
      describe('v2 Client', function() {
        describe('Signer API', function() {
          describe('#fetchSigner', function() {
            it('can fetch a signer', async function() {
              const fetchSigner = await client.v2.fetchSigner(
                signerUuid,
              );
              expectDefinedNonNull(fetchSigner);
              expect(fetchSigner.public_key).to.be.eq(signerPublicKey);
            });
          });
        });
        describe('Feed API', function() {
          describe('#fetchFeed', function() {
            it('can get a feed', async function() {
              const castSet = new Set();
              let castCount = 0;
              for await (const cast of client.v2.fetchFeed(userBotFid, {
                pageSize: 5,
              })) {
                expectDefinedNonNull(cast);
                expectDefinedNonNull(cast.hash);
                expectDefinedNonNull(cast.text);
                expect(castSet).not.to.contain(cast.hash);
                castSet.add(cast.hash);
                castCount++;
                if (castCount === 10) break;
              }
              expect(castCount).to.be.eq(10);
            });
          });
        });
        describe('Casts API', function() {
          describe('#fetchCast', function() {
            it('can fetch an existing cast', async function() {
              const existingCastHash =
                '0x0cac69b3162e2db93af22eb0156a1ecb6d2641e1';
              const cast = await client.v2.fetchCast(existingCastHash);
              expectDefinedNonNull(cast);
              expect(cast.hash).to.eq(existingCastHash);
            });

            it('returns null for nonexistent cast', async function() {
              const nonexistentCastHash =
                '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
              const cast = await client.v2.fetchCast(
                nonexistentCastHash,
              );
              expect(cast).to.be.null;
            });
          });
          describe('#fetchCasts', function() {
            it('can fetch multiple existing casts', async function() {
              const existingCastHashOne =
                '0x0cac69b3162e2db93af22eb0156a1ecb6d2641e1';
              const existingCastHashTwo =
                '0xd02442da75c1a09c0b0a735f9d6fdfb0db287d89';

              const casts = await client.v2.fetchCasts([
                existingCastHashOne,
                existingCastHashTwo,
              ]);
              expectDefinedNonNull(casts);
              expect(casts).to.have.length(2);
              expect(casts[0].hash).to.be.eq(existingCastHashOne);
              expect(casts[1].hash).to.be.eq(existingCastHashTwo);
            });
            it('can fetch multiple casts when an invalid hash is included', async function() {
              const existingCastHashOne =
                '0x0cac69b3162e2db93af22eb0156a1ecb6d2641e1';
              const existingCastHashTwo =
                '0xd02442da75c1a09c0b0a735f9d6fdfb0db287d89';
              const nonexistentCastHash =
                '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
              const casts = await client.v2.fetchCasts([
                existingCastHashOne,
                existingCastHashTwo,
                nonexistentCastHash,
              ]);
              expectDefinedNonNull(casts);
              expect(casts).to.have.length(2);
              expect(casts[0].hash).to.be.eq(existingCastHashOne);
              expect(casts[1].hash).to.be.eq(existingCastHashTwo);
            });
          });

          let publishedCast: PostCastResponseCast | null;
          let replyToCast: PostCastResponseCast | null;
          let replyToUrl: PostCastResponseCast | null;
          let urlEmbedCast: PostCastResponseCast | null;
          let imageEmbedCast: PostCastResponseCast | null;
          let multipleEmbedCast: PostCastResponseCast | null;
          describe('publishCast', function() {
            it('can publish a basic cast with no parent', async function() {
              const text = 'this is a test cast';
              publishedCast = await client.v2.publishCast(
                signerUuid,
                text,
              );
              expectDefinedNonNull(publishedCast);
              expect(publishedCast.text).to.eq(text);
            });
            it('can reply to an existing cast', async function() {
              const text = 'this is a reply to the test cast';
              expectDefinedNonNull(publishedCast);
              await sleep(1000);
              replyToCast = await client.v2.publishCast(
                signerUuid,
                text,
                {
                  replyTo: publishedCast.hash,
                },
              );
              expect(replyToCast.text).to.eq(text);
              await sleep(1000);
              const replyCast = await client.v2.fetchCast(
                replyToCast.hash,
              );
              expect(replyCast?.parent_hash).to.eq(publishedCast.hash);
            });
            it('can reply to a url', async function() {
              const text = 'this is a reply to the test cast';
              const replyUrl = 'https://www.farcaster.xyz/';
              await sleep(1000);
              replyToUrl = await client.v2.publishCast(
                signerUuid,
                text,
                {
                  replyTo: replyUrl,
                },
              );
              expect(replyToUrl.text).to.eq(text);
              await sleep(1000);
              const replyCast = await client.v2.fetchCast(
                replyToUrl.hash,
              );
              expect(replyCast?.parent_url).to.eq(replyUrl);
            });
            it('can publish a cast with URL embeds', async function() {
              const embedURL = 'https://www.farcaster.xyz/';
              const text = 'this is a cast testing URL embed functionality';
              urlEmbedCast = await client.v2.publishCast(
                signerUuid,
                text,
                {
                  embeds: [{ url: embedURL }],
                },
              );
              expectDefinedNonNull(urlEmbedCast);

              // Fetch the cast, the PostCastResponseCast does not contain the embeds
              await sleep(1000);
              const urlEmbedCastResp = await client.v2.fetchCast(
                urlEmbedCast.hash,
              );
              expectDefinedNonNull(urlEmbedCastResp);

              expectDefinedNonNull(urlEmbedCastResp.embeds);
              const urls = urlEmbedCastResp.embeds;
              expect(urls).to.have.length(1);
              const publishedEmbed: EmbedUrl = urls[0] as EmbedUrl;
              expect(publishedEmbed.url).to.be.eq(embedURL);
            });
            it('can publish a cast with image embeds', async function() {
              const embedURL = 'https://i.imgur.com/YPEZebo.png';
              const text = 'this is a cast testing image embed functionality';
              imageEmbedCast = await client.v2.publishCast(
                signerUuid,
                text,
                {
                  embeds: [{ url: embedURL }],
                },
              );
              expectDefinedNonNull(imageEmbedCast);

              // Fetch the cast, the PostCastResponseCast does not contain the embeds
              await sleep(1000);
              const imageEmbedCastResp = await client.v2.fetchCast(
                imageEmbedCast.hash,
              );
              expectDefinedNonNull(imageEmbedCastResp);

              expectDefinedNonNull(imageEmbedCastResp.embeds);
              const images = imageEmbedCastResp.embeds;
              expect(images).to.have.length(1);
              const publishedEmbed: EmbedUrl = images[0] as EmbedUrl;
              expect(publishedEmbed.url).to.be.eq(embedURL);
            });
            it('can publish a cast with multiple embeds', async function() {
              const embedURL = 'https://www.farcaster.xyz/';
              const imageURL = 'https://i.imgur.com/YPEZebo.png';
              const text = 'this is a cast testing URL embed functionality';
              multipleEmbedCast = await client.v2.publishCast(
                signerUuid,
                text,
                {
                  embeds: [{ url: embedURL }, { url: imageURL }],
                },
              );
              expectDefinedNonNull(multipleEmbedCast);

              // Fetch the cast, the PostCastResponseCast does not contain the embeds
              await sleep(1000);
              const multipleEmbedCastResp = await client.v2.fetchCast(
                multipleEmbedCast.hash,
              );
              expectDefinedNonNull(multipleEmbedCastResp);

              expectDefinedNonNull(multipleEmbedCastResp.embeds);
              const embeds = multipleEmbedCastResp.embeds;
              expect(embeds).to.have.length(2);
              const publishedUrlEmbed: EmbedUrl = embeds[0] as EmbedUrl;
              const publishedImageEmbed: EmbedUrl = embeds[1] as EmbedUrl;
              expect(publishedUrlEmbed.url).to.be.eq(embedURL);
              expect(publishedImageEmbed.url).to.be.eq(imageURL);
            });
          });
          describe('#deleteCast', function() {
            it('can delete casts', async function() {
              this.timeout('120s');
              // we get rate limited here
              // eslint-disable-next-line no-console
              console.log('sleeping 1 min for rate limit');
              await sleep(60000);
              expectDefinedNonNull(publishedCast);
              expectDefinedNonNull(replyToCast);
              expectDefinedNonNull(replyToUrl);
              expectDefinedNonNull(urlEmbedCast);
              expectDefinedNonNull(imageEmbedCast);
              expectDefinedNonNull(multipleEmbedCast);
              await sleep(1000);
              await client.v2.deleteCast(
                signerUuid,
                publishedCast.hash,
              );
              await client.v2.deleteCast(signerUuid, replyToCast.hash);
              await client.v2.deleteCast(signerUuid, replyToUrl.hash);
              await client.v2.deleteCast(signerUuid, urlEmbedCast.hash);
              await client.v2.deleteCast(
                signerUuid,
                imageEmbedCast.hash,
              );
              await client.v2.deleteCast(
                signerUuid,
                multipleEmbedCast.hash,
              );
            });
            // no error thrown at the moment
            it.skip('cannot delete a cast from a different author', async function() {
              let errorThrownAndParsedCorrectly = false;
              try {
                await client.v2.deleteCast(
                  signerUuid,
                  '0x0cac69b3162e2db93af22eb0156a1ecb6d2641e1',
                ); // a cast by @dwr
              } catch (error) {
                expect(NeynarV2APIClient.isApiErrorResponse(error)).is.true;
                if (NeynarV2APIClient.isApiErrorResponse(error)) {
                  // repeating the above just for the type inference
                  expect(error.response.status).to.eq(400);
                  expect(error.response.data.code).to.contain(
                    'Could not remove cast',
                  );
                  errorThrownAndParsedCorrectly = true;
                }
              }
              expect(errorThrownAndParsedCorrectly).to.be.true;
            });
          });
        });
        describe('User API', function() {
          // See https://github.com/standard-crypto/farcaster-js/issues/685
          describe.skip('#searchUsernames', function() {
            it('can find user for a username prefix', async function() {
              const users = await client.v2.searchUsernames(
                'a',
                userBotFid,
              );
              let foundUser = false;
              for (const user of users ?? []) {
                expectDefinedNonNull(user);
                expectDefinedNonNull(user.fid);
                foundUser = true;
              }
              expect(foundUser).to.be.true;
            });
            it('returns an empty array for an unused prefix', async function() {
              const users = await client.v2.searchUsernames(
                'accountdefinitelydoesnotexistwiththisprefix', // cSpell:disable-line
                userBotFid,
              );
              expect(users).to.be.empty;
            });
          });
          describe('#updateUserProfile', function() {
            it("can update a user's bio", async function() {
              const updatedBio =
                'this was updated during a test of @standard-crypto/farcaster-js';
              const userBeforeUpdate = await client.v1.lookupUserByFid(
                userBotFid,
              );
              expect(userBeforeUpdate?.profile.bio.text).not.to.be.eq(
                updatedBio,
              );
              const update = await client.v2.updateUserProfile(
                signerUuid,
                {
                  bio: updatedBio,
                },
              );
              expect(update?.success).to.be.true;
              await sleep(5000);
              const userAfterUpdate = await client.v1.lookupUserByFid(
                userBotFid,
              );
              expect(userAfterUpdate?.profile.bio.text).to.be.eq(updatedBio);
              const revert = await client.v2.updateUserProfile(
                signerUuid,
                {
                  bio: userBeforeUpdate?.profile.bio.text,
                },
              );
              expect(revert?.success).to.be.true;
              await sleep(1000);
              const userAfterRevert = await client.v1.lookupUserByFid(
                userBotFid,
              );
              expect(userAfterRevert?.profile.bio.text).to.be.eq(
                userBeforeUpdate?.profile.bio.text,
              );
            });
          });
        });
        describe('Reaction API', function() {
          let cast: Cast | null;
          describe('#reactToCast', function() {
            it('can react to a cast', async function() {
              const existingCastHash =
                '0x0cac69b3162e2db93af22eb0156a1ecb6d2641e1';
              cast = await client.v2.fetchCast(existingCastHash);
              expectDefinedNonNull(cast);
              const response = await client.v2.reactToCast(
                signerUuid,
                ReactionType.Like,
                cast.hash,
              );
              expect(response.success).to.be.true;
            });
          });
          describe('#removeReactionToCast', function() {
            it('can un-react to a cast', async function() {
              expectDefinedNonNull(cast);
              const response = await client.v2.removeReactionToCast(
                signerUuid,
                ReactionType.Like,
                cast.hash,
              );
              expect(response.success).to.be.true;
            });
          });
        });
        describe('Follow API', function() {
          describe('#followUsers', function() {
            it('can follow multiple users', async function() {
              const response = await client.v2.followUsers(signerUuid, [
                userDwrFid,
                userGaviFid,
              ]);
              expect(response.success).to.be.true;
              expect(response.details[0].success).to.be.true;
              expect(response.details[0].target_fid).to.be.eq(userDwrFid);
              expect(response.details[1].success).to.be.true;
              expect(response.details[1].target_fid).to.be.eq(userGaviFid);
            });
          });
          describe('#unfollowUsers', function() {
            it('can unfollow multiple users', async function() {
              const response = await client.v2.unfollowUsers(
                signerUuid,
                [userDwrFid, userGaviFid],
              );
              expect(response.success).to.be.true;
              expect(response.details[0].success).to.be.true;
              expect(response.details[0].target_fid).to.be.eq(userDwrFid);
              expect(response.details[1].success).to.be.true;
              expect(response.details[1].target_fid).to.be.eq(userGaviFid);
            });
          });
        });
      });
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        'Skipping NeynarV2API integration tests. Env vars INTEGRATION_TEST_USER_MNEMONIC, INTEGRATION_TEST_NEYNAR_SIGNER_UUID and INTEGRATION_TEST_NEYNAR_SIGNER_PUBLIC_KEY must be set.',
      );
    }
  });
} else {
  // eslint-disable-next-line no-console
  console.warn(
    'Skipping NeynarAPI integration tests. Env var INTEGRATION_TEST_NEYNAR_API_KEY is unset.',
  );
}
