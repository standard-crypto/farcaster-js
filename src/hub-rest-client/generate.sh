#!/bin/bash

docker build -t generate-hub-swagger .
mkdir ./generated
docker run --rm -it -v ./generated:/generated generate-hub-swagger
