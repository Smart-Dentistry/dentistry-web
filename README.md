# Dentistry Web UI

This is a web UI implemented using [React][] and [Ant Design][] which goal is to help dentists manage their clinics.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

It is assumed you have installed [Git][] and [Docker][] in your machine.

### Cloning repository

Clone this repo and navigate inside its root directory:

```bash
git clone https://github.com/Smart-Dentistry/dentistry-web.git && cd dentistry-web
```

### Building containers

Build containers:

```bash
docker-compose build
```

### Starting containers

Start containers:

```bash
docker-compose up
```

You are all set 🎉. Navigate to http://localhost:3000/ to see the project's home page.

## Docker commands

This is a compilation of some useful Docker commands.

### Containers commands

#### Build containers

```bash
docker-compose build
```

#### Start containers

```bash
docker-compose up
```

#### Stop containers

```bash
docker-compose stop
```

#### Remove containers

```bash
docker-compose rm
```

#### Destroy containers and volumes

```bash
docker-compose down -v
```

### Images commands

#### List images

```bash
docker image ls
```

#### Remove image

```bash
docker image rm <image_id>
```

### web service

#### Start sh session

```bash
docker-compose exec web sh
```

#### Run tests

```bash
docker-compose exec web yarn test
```

#### Format files using standard

[Standard JS][] is used for styling code:

```bash
docker-compose exec web yarn lint:fix
```


[Ant Design]: https://ant.design/
[Docker]: https://docs.docker.com/get-docker/
[Git]: https://git-scm.com/downloads
[React]: https://reactjs.org/
[Standard JS]: https://standardjs.com/
