FROM node:13.7

# Create app directory
WORKDIR /src

EXPOSE 3000

CMD ["node","index.js"]