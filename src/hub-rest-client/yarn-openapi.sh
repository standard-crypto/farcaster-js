#!/bin/bash

yarn openapi-generator-cli version-manager set 6.6.0

yarn openapi-generator-cli generate \
    -i src/hub-rest-client/openapi/spec.yaml \
    -g typescript-axios \
    -o src/hub-rest-client/openapi/ \
    --config openapi-generator-config.json

yarn openapi-typescript \
    src/hub-rest-client/openapi/spec.yaml \
    -o src/hub-rest-client/openapi/schema.d.ts
