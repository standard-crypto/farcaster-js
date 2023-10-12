#!/bin/bash

yarn openapi-generator-cli version-manager set 6.6.0

yarn openapi-generator-cli generate \
    -i src/neynarAPI/neynarV2API/openapi/spec.yaml \
    -g typescript-axios \
    -o src/neynarAPI/neynarV2API/openapi/ \
    --config openapi-generator-config.json

yarn openapi-typescript \
    src/neynarAPI/neynarV2API/openapi/spec.yaml \
    -o src/neynarAPI/neynarV2API/openapi/schema.d.ts
