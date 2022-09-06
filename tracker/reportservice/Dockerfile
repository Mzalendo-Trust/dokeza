# FROM node:14
# FROM keymetrics/pm2:latest-alpine

FROM node:16.15-alpine3.14

# Installs latest Chromium (85) package.
RUN apk add --no-cache \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nano \
    fish

WORKDIR /app

COPY /reports ./reports

COPY package.json ./

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN yarn install

# Install pm2
RUN yarn global add pm2

# Expose ports needed to use Keymetrics.io
# EXPOSE 80 443 43554

COPY . /app

CMD [ "pm2-runtime", "start", "pm2.json" ]
