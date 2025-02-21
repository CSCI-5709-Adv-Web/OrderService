## ```.env``` file content

```.env
DB_URL=URL_OF_DB
APP_PORT=9002
CLIENT_ID=order-service
GROUP_ID=order-service-group
BROKER_1=localhost:9092
AUTH_SERVICE_BASE_URL=auth_service_url
```

## ```docker-compose.yml``` file content

you have to run ```docker-compose.yml``` file in order to enable kafka

```.yml
version: "2"

services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
    ports:
      - "2181:2181"

  kafka:
    image: confluentinc/cp-kafka:latest
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: "zookeeper:2181"
      KAFKA_LISTENERS: "PLAINTEXT://0.0.0.0:9092"
      KAFKA_ADVERTISED_LISTENERS: "PLAINTEXT://localhost:9092"
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    ports:
      - "9092:9092"

```


command to run this docker compose file is:

```

docker compose up

```

