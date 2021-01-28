# FROM node:14
# FROM keymetrics/pm2:latest-alpine

FROM node:14.15.4-alpine3.12

# Installs latest Chromium (85) package.
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

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

COPY . .

CMD [ "pm2-runtime", "start", "pm2.json" ]