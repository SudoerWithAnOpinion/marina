FROM node:18.13.0-alpine3.17 AS builder
RUN /sbin/apk --update add build-base libc6-compat gcompat curl
# RUN wget -qO- https://get.pnpm.io/install.sh | ENV="~/.shrc" SHELL="$(which sh)" sh -
RUN npm install -g pnpm
WORKDIR /marina
COPY ["database", "/marina/database/"]
COPY ["*.?s", "*.??s", "*.yaml", "*.json", ".sequelizerc", "/marina/"]

COPY ["static", "/marina/static/"]
COPY ["src", "/marina/src/"]
RUN pnpm install
RUN pnpm run build

# FROM node:18.13.0-alpine3.17 AS runtime
# COPY --from=builder /marina/ /marina/
EXPOSE 3000
ENTRYPOINT ["node", "build/"]