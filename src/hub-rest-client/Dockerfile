FROM golang:1.21

# ARG GNOSTIC_VERSION=0.7.0
ARG HUBBLE_VERSION="@farcaster/hubble@1.5.6"
ARG PROTOC_GEN_OPENAPI_VERSION="v2.18.0"

RUN apt-get update && \
    apt-get install -y wget protobuf-compiler

WORKDIR /farcaster

# RUN wget https://github.com/google/gnostic/archive/refs/tags/v${GNOSTIC_VERSION}.tar.gz && \
#     tar -xvf v${GNOSTIC_VERSION}.tar.gz && \
#     cd gnostic-${GNOSTIC_VERSION} && \
#     make

RUN go install github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2@${PROTOC_GEN_OPENAPI_VERSION}

RUN mkdir schema && \
    cd schema && \
    wget https://raw.githubusercontent.com/farcasterxyz/hub-monorepo/${HUBBLE_VERSION}/protobufs/schemas/rpc.proto && \
    wget https://raw.githubusercontent.com/farcasterxyz/hub-monorepo/${HUBBLE_VERSION}/protobufs/schemas/message.proto && \
    wget https://raw.githubusercontent.com/farcasterxyz/hub-monorepo/${HUBBLE_VERSION}/protobufs/schemas/hub_event.proto && \
    wget https://raw.githubusercontent.com/farcasterxyz/hub-monorepo/${HUBBLE_VERSION}/protobufs/schemas/request_response.proto && \
    wget https://raw.githubusercontent.com/farcasterxyz/hub-monorepo/${HUBBLE_VERSION}/protobufs/schemas/username_proof.proto && \
    wget https://raw.githubusercontent.com/farcasterxyz/hub-monorepo/${HUBBLE_VERSION}/protobufs/schemas/onchain_event.proto

ENTRYPOINT protoc --proto_path=./schema --openapiv2_out /generated \
    --openapiv2_opt logtostderr=true \
    --openapiv2_opt=Musername_proof.proto=example.com/project/protos/fizz \
    --openapiv2_opt=Mmessage.proto=example.com/project/protos/fizz \
    --openapiv2_opt=Monchain_event.proto=example.com/project/protos/fizz \
    --openapiv2_opt=Mhub_event.proto=example.com/project/protos/fizz \
    --openapiv2_opt=Mrequest_response.proto=example.com/project/protos/fizz \
    --openapiv2_opt=Mrpc.proto=example.com/project/protos/fizz \
    --openapiv2_opt generate_unbound_methods=true \
    ./schema/rpc.proto
