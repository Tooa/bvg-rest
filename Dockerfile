FROM node:alpine

WORKDIR /app
ADD . /app

RUN apk add --update git bash && \
	npm install --production && \
	apk del git && \
	rm -rf /tmp/* /var/cache/apk/*

EXPOSE 3000

ENV HOSTNAME v5.bvg.transport.rest
ENV PORT 3000

RUN npm run build

CMD ["node", "index.js"]
