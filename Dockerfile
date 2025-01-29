FROM node:22.12.0 as build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY tsconfig.json .
COPY src src

RUN npm run build

# Now build a super small deployment image!
FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/package*.json /app/tsconfig.json .
RUN npm install --omit=dev

COPY .sequelizerc .env.example .

RUN mkdir -p /app/src/config ; mkdir -p /app/src/database/seeders ; mkdir -p /app/src/database/migrations ; mkdir -p /app/src/models

COPY --from=build /app/src/config/sequelize.js /app/src/config
COPY --from=build /app/src/database/seeders/* /app/src/database/seeders
COPY --from=build /app/src/database/migrations/* /app/src/database/migrations
COPY --from=build /app/src/models /app/src
COPY --from=build /app/dist dist

CMD ["npm", "run", "prod-run"]
