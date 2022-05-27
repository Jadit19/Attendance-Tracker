# Installing requirements

```bash
cd client && npm i
```
> CMake should be installed before installing face-recognition python library: 
```bash
sudo apt install cmake
```
```bash
cd server_flask && pip install -r "requirements.txt"
```

```bash
cd server_node && npm i
```

# Setting up the workspace

Create a `.env` file in 3 directories:

1. In `./client/src/.env`, write the following:
```
FLASK_PORT=5000
NODE_PORT=8000
```

2. In `./server_flask/.env`, write the following:
```
FLASK_PORT=5000
```

3. In `./server_node/.env`, write the following:
```
NODE_SERVER_PORT=8000
PASSWORD=$2a$12$6hqeh0NwbceH3EwCWD7jgOlCBwuwgGM5fTlRqnkN.to/LIL9ZJs.O
```
> The above hash corresponds to "1234". You may replace it with a hash of your choice.

# Running

### Running NodeJS Server on port 8000

```bash
cd server_node && npm start
```

### Running Flask Server on port 5000

```bash
cd server_flask && python3 server.py
```

### Running ReactJS Frontend on port 3000

```bash
cd client && npm start
```

<br/>

>**Note:** Tried and Tested on **Ubuntu 20.04**