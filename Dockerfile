FROM node:20.13.1-alpine3.19 AS build
RUN npm i -g pnpm

WORKDIR /app/src
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . ./
RUN npm run build

FROM node:20.13.1-alpine3.19
RUN addgroup -S exampleusergroup && adduser -S exampleuser -G exampleusergroup
USER exampleuser
WORKDIR /usr/app
COPY --from=build /app/src/dist/tv-show-scores/ ./
CMD ["node", "server/server.mjs"]
EXPOSE 4000
