[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / HubEventsApiListEventsRequest

# Interface: HubEventsApiListEventsRequest

[openapi](../modules/openapi.md).HubEventsApiListEventsRequest

Request parameters for listEvents operation in HubEventsApi.

**`Export`**

HubEventsApiListEventsRequest

## Table of contents

### Properties

- [fromEventId](openapi.HubEventsApiListEventsRequest.md#fromeventid)

## Properties

### fromEventId

• `Optional` `Readonly` **fromEventId**: `number`

An optional Hub Id to start getting events from. This is also returned from the API as nextPageEventId, which can be used to page through all the Hub events. Set it to 0 to start from the first event

**`Memberof`**

HubEventsApiListEvents

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/hub-events-api.ts:198](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/hub-events-api.ts#L198)
