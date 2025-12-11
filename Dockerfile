# Building based on node:xx-alpine (#1 Stage)
FROM node:18-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
# Building production version of the app
RUN npm run build

# Serving the app with Nginx (#2 Stage)
FROM nginx:alpine

# Copying built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Config for Nginx to serve the SPA correctly
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
