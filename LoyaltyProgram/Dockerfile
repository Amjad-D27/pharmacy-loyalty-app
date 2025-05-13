
FROM node:20.15.1 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
COPY . .
RUN npm run build -- --base-href=/


FROM nginx:stable
COPY default.conf /etc/nginx/conf.d
COPY --from=builder /app/dist/loyalty-program/browser/ /usr/share/nginx/html/
EXPOSE 8080
 
