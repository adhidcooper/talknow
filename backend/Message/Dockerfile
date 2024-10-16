# Build Stage
FROM maven:3.8.5-openjdk-17 AS build
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
WORKDIR /usr/src/app
RUN mvn clean package

# Runtime Stage
FROM openjdk:17-jdk-slim
COPY --from=build /usr/src/app/target/message-0.0.1-SNAPSHOT.jar message-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "message-0.0.1-SNAPSHOT.jar"]
