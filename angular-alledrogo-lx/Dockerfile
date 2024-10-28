FROM node:20 AS build
WORKDIR /app
COPY . .
EXPOSE 80
EXPOSE 443
RUN npm install
RUN npm run build

FROM nginx:latest AS ngi
# Najpierw utworzenie katalogu SSL
RUN mkdir -p /etc/nginx/ssl

# Następnie kopiowanie certyfikatów
COPY --from=build /app/ssl/certificate.crt /etc/nginx/ssl/certificate.crt
COPY --from=build /app/ssl/private.key /etc/nginx/ssl/private.key
COPY --from=build /app/dist/angular-alledrogo-lx/browser /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
COPY ./docker-entrypoint.sh /docker-entrypoint.sh

# Ustawienie odpowiednich uprawnień
RUN chmod 600 /etc/nginx/ssl/private.key
RUN chmod 644 /etc/nginx/ssl/certificate.crt

ENTRYPOINT [ "/docker-entrypoint.sh" ]