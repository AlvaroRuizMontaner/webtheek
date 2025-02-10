#-------------------------------------------Comandos-------------------------------------------
# Nombre de imagen: registry.digitalocean.com/webtheek-container/app:1.0.0 .
# Crear la imagen: docker build -t <nombre de imagen> .
# Crear/correr contenedor basado en la imagen anterior: docker run -it -d <nombre de imagen>
# Crear/correr contenedor basado en la imagen anterior con puerto accesible: docker run -it -d -p 3000:3000 <nombre de imagen>
# El primer numero del -p es el puerto al que debe apuntar la maquina anfitriona y el segundo es el puerto del contenedor
# El puerto del expose debe coincidir con el segundo numero del -p
# El primer numero del -p puede ser cualquiera y no tiene por qué coincidir con los demas

# Ver que contenedores hay corriendo: docker ps
# Acceder a un contenedor en ejecucion: docker exec -it <CONTAINER_ID> sh
# Ver arquitectura usada: uname -m
# Ver el contenido del contenedor incluyendo archivos ocultos: ls -a
# Salir del contenedor: exit (o usar ctrl + D)
# Ver los logs del contenedor docker logs <id del contenedor>
# Detener contenedor: docker stop <id del contenedor>
# Borrar contenedor: docker rm <id del contenedor>

# Ver que images hay: docker images
# Borrar imagen: docker rmi <id de la imagen>

# Liberar espacio de viejos contenedores y cache: docker builder prune --all
# Limpiar cache npm: npm cache clean --force


#----------------------------------------- Configuracion Basica -----------------------------------------

# Usa una imagen base ligera de Node.js
#FROM node:20-alpine

# Establece el directorio de trabajo en /app (dentro del contenedor)
#WORKDIR /app

# Copia únicamente los archivos necesarios para instalar dependencias
#COPY package*.json ./

# Instala las dependencias
#RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
#COPY . .

# Declarar que el contenedor utiliza el puerto 3000 para su aplicación.
#EXPOSE 3000

## ENV ENV=local
#CMD ["npm", "run", "dev"]

# -------------------------------------------Configuracion Digital Ocean-------------------------------------------
# Crear un container registry en digital ocean
# Crear un token en la seccion API en digital ocean
# Seguir los pasos de https://docs.digitalocean.com/reference/doctl/how-to/install/ para instalar el doctl
# Conectarse a digital ocean con el token usando doctl auth init -t <token>
# Hacer login en digital ocean usando doctl registry login
# Crear la imagen usando versionado docker build -t app:1.0.0 .
# Cambiarle el nombre a la imagen usando el nombre del registro de digital ocean usando docker tag app:1.0.0 <nombre contenedor>/app:1.0.0
# hacer push con el nuevo nombre usando docker push <nombre contenedor>:1.0.0  



# En el app spec antes usaba este repo:
#github:
#    branch: master
#    deploy_on_push: true
#    repo: AlvaroRuizMontaner/webtheek

# Despues este para la imagen con despliegues manuales usando push de imagen
#image:
    #deploy_on_push:
      #enabled: true
    #registry_type: DOCR
    #repository: app
    #tag: 1.0.0


#------------------------------------------- Configuracion en etapas--------------------------------------------

#Etapa builder: Construir la aplicación
#FROM node:18-alpine AS builder
FROM node:18-slim AS builder
WORKDIR /app

# Declarar las variables de entorno públicas
ARG NEXT_PUBLIC_STRIPE_API_SECRET
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_ENV

ENV NEXT_PUBLIC_STRIPE_API_SECRET=$NEXT_PUBLIC_STRIPE_API_SECRET
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_ENV=$NEXT_PUBLIC_ENV

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build  # Asegurar que se genera .next/

# Instalar Cypress para pruebas
RUN npx cypress verify

# Etapa runner: Ejecutar la aplicación en producción
FROM node:18-alpine AS runner
WORKDIR /app

ENV NEXT_PUBLIC_STRIPE_API_SECRET=$NEXT_PUBLIC_STRIPE_API_SECRET
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_ENV=$NEXT_PUBLIC_ENV

# Copiar los archivos esenciales desde builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/package.json ./

EXPOSE 3000

CMD ["npm", "run", "start"]