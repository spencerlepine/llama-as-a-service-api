FROM node:16-alpine

RUN npm install artillery@2.0.0-20 --location=global
RUN apk update --no-cache -q
RUN apk add jq bc bash curl

VOLUME /artillery
WORKDIR /artillery

COPY ./entrypoint.sh ./bin/

RUN ["chmod", "+x", "./bin/entrypoint.sh"]
ENTRYPOINT ["./bin/entrypoint.sh"]
