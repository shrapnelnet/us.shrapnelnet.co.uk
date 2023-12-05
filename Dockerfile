FROM node:20
WORKDIR /usr/src/us
COPY package.json ./
RUN npm i
COPY . .
RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "preview"]