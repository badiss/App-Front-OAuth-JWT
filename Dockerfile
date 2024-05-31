
# Etape 1
FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app

RUN npm install

RUN npm run build

# Etape 2
FROM nginx:latest

COPY --from=build /usr/local/app/dist/FrontEnd_Angular/browser /usr/share/nginx/html

EXPOSE 80
