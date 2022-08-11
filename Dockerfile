### STAGE 1: Install ###
FROM node:16 as install
RUN mkdir /srv/app
WORKDIR /srv/app
COPY package.json yarn.lock /srv/app/
RUN yarn install
COPY . .

### STAGE 3: Build ###
FROM install as build
RUN yarn build

### STAGE 4: Production Environment ###
FROM nginx:1.23
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /srv/app/build /usr/share/nginx/html