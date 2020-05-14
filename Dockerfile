FROM mhart/alpine-node:12
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# add app
COPY . .
# install app dependencies
RUN yarn install
# start app
CMD ["yarn", "start"]
