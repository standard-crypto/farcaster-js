sed 's/File/Buffer/g' src/openapi/generated/apis/submit-message-api.ts > src/openapi/generated/apis/submit-message-api-temp.ts
rm src/openapi/generated/apis/submit-message-api.ts
mv src/openapi/generated/apis/submit-message-api-temp.ts src/openapi/generated/apis/submit-message-api.ts
