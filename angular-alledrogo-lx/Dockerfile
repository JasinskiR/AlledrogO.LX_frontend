FROM node:20 AS build
WORKDIR /app
COPY . .
EXPOSE 80

RUN npm install
RUN npm run build

FROM nginx:latest AS ngi

COPY --from=build /app/dist/angular-alledrogo-lx/browser /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
COPY /docker-entrypoint.sh /docker-entrypoint.sh

# Ustawienie odpowiednich uprawnień
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT [ "/docker-entrypoint.sh" ]