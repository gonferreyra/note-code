# note-code api

This is a simple REST API for NoteCode. It's connected to a mongoDB database.

## Installation & Run

```bash
# Clone this project
https://github.com/gonferreyra/note-code.git
```

```bash
# Install dependencies
cd node-code
cd server
npm install
```

Before running API server, you need to:

- create a Database in mongoDb
- create a .env file ([dotenv
  ](https://www.npmjs.com/package/dotenv)) for your enviroment variables and set the following values.

## You need to put your own values on all fields.

```go

SERVER_PORT=3000
SERVER_HOSTNAME='localhost'

DATABASE=
DATABASE_PASSWORD=
DATABASE_USER=
```

To run the server:

```bash
# Run
npm run dev


# API Endpoint :
localhost:'process.env.PORT'
```
