/* tslint:disable */
/* eslint-disable */
/**
 * Farcaster Hub REST API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { HubEventType } from './hub-event-type';
// May contain unused imports in some cases
// @ts-ignore
import { MergeMessageBody } from './merge-message-body';
// May contain unused imports in some cases
// @ts-ignore
import { MergeOnChainEventBody } from './merge-on-chain-event-body';
// May contain unused imports in some cases
// @ts-ignore
import { MergeUserNameProofBody } from './merge-user-name-proof-body';
// May contain unused imports in some cases
// @ts-ignore
import { PruneMessageBody } from './prune-message-body';
// May contain unused imports in some cases
// @ts-ignore
import { RevokeMessageBody } from './revoke-message-body';

/**
 * 
 * @export
 * @interface HubEvent
 */
export interface HubEvent {
    /**
     * 
     * @type {HubEventType}
     * @memberof HubEvent
     */
    'type'?: HubEventType;
    /**
     * 
     * @type {string}
     * @memberof HubEvent
     */
    'id'?: string;
    /**
     * 
     * @type {MergeMessageBody}
     * @memberof HubEvent
     */
    'mergeMessageBody'?: MergeMessageBody;
    /**
     * 
     * @type {PruneMessageBody}
     * @memberof HubEvent
     */
    'pruneMessageBody'?: PruneMessageBody;
    /**
     * 
     * @type {RevokeMessageBody}
     * @memberof HubEvent
     */
    'revokeMessageBody'?: RevokeMessageBody;
    /**
     * 
     * @type {MergeUserNameProofBody}
     * @memberof HubEvent
     */
    'mergeUsernameProofBody'?: MergeUserNameProofBody;
    /**
     * 
     * @type {MergeOnChainEventBody}
     * @memberof HubEvent
     */
    'mergeOnChainEventBody'?: MergeOnChainEventBody;
}



