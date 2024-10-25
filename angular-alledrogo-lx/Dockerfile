# FROM node:20 AS build
# EXPOSE 80
# WORKDIR /dist/src/app
# RUN npm cache clean --force
# COPY . .
# RUN npm install
# RUN npm run build

# FROM nginx:latest AS ngi
# COPY --from=build /dist/src/app/dist/angular-alledrogo-lx/browser /usr/share/nginx/html
# COPY /nginx.conf  /etc/nginx/conf.d/default.conf
# Etap 1: Budowanie aplikacji
FROM node:20 AS build
WORKDIR /app
COPY . .

# Instalacja zależności
RUN npm install

# Uruchomienie skryptu ustawiającego environment.ts
RUN node set-environment.js

# Budowanie aplikacji
RUN npm run build --prod

# Etap 2: Serwer Nginx
FROM nginx:latest AS ngi
COPY --from=build /app/dist/angular-alledrogo-lx/browser /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf

# Eksponowanie portu 80
EXPOSE 80
