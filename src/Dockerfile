### STAGE 1: Build ###
FROM node:10 AS builder
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.13.12-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
# RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
#     chmod -R 770 /var/cache/nginx /var/run /var/log/nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
