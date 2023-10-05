#!/bin/bash

yarn openapi-generator-cli generate \
    -i src/hub-rest-client/swagger/swagger.yaml \
    -g typescript-axios \
    -o src/hub-rest-client/swagger/ \
    --skip-validate-spec \
    --config openapi-generator-config.json
