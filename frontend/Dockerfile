# 1) Builder con Node
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
# Copia el .env para que Vite tome VITE_API_URL
COPY .env.local .env.local
RUN npm ci

COPY . .
# Genera la build estática
RUN npm run build

# 2) Servir con Nginx
FROM nginx:1.25-alpine

# Limpia config default y copia tu build
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
