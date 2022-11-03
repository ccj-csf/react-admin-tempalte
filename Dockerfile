#FROM circleci/node:latest-browsers as builder

# WORKDIR /usr/src/app/
# USER root
# COPY package.json ./
# RUN yarn

# COPY ./ ./

# RUN npm run test:e2e

# RUN npm run fetch:blocks

# RUN yarn build:prod
# change test

FROM nginx

WORKDIR /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY dist/  /usr/share/nginx/html/guard-admin/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
