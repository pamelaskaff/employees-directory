FROM node:10 AS ui-build
WORKDIR /usr/src/app
COPY react-app/ ./react-app/
RUN cd react-app && npm install && npm run build

FROM node:10 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/react-app/build ./react-app/build
COPY nodejs-app/package*.json ./nodejs-app/
RUN cd nodejs-app && npm install
COPY nodejs-app/server.js ./nodejs-app/

EXPOSE 3080

CMD ["node", "./nodejs-app/server.js"]
