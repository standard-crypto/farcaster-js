#!/bin/bash

yarn openapi-generator-cli generate \
    -i src/hub-rest-client/openapi/spec.yaml \
    -g typescript-axios \
    -o src/hub-rest-client/openapi/ \
    --skip-validate-spec \
    --config openapi-generator-config.json
