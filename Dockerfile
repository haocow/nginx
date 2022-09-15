FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/
RUN yarn install
RUN yarn build

FROM nginx:latest
COPY --from=build /usr/local/app/dist /usr/share/nginx/html
# COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf
