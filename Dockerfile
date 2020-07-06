FROM node:alpine
WORKDIR /app
COPY . /app/
RUN npm install
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
