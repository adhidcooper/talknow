# Build Stage
FROM maven:3.8.5-openjdk-17 AS build
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
WORKDIR /usr/src/app
RUN mvn clean package -DskipTests

# Runtime Stage
FROM openjdk:17-jdk-slim
WORKDIR /usr/src/app

# Copy the built jar file from the build stage
COPY --from=build /usr/src/app/target/message-0.0.1-SNAPSHOT.jar message-0.0.1-SNAPSHOT.jar

# Expose the port
EXPOSE 5002

# Set up the entrypoint to run the jar
ENTRYPOINT ["java", "-jar", "/usr/src/app/message-0.0.1-SNAPSHOT.jar"]

# Define a volume for PostgreSQL persistence (optional, if you want to persist data)
# You can also manage this in your `docker-compose.yml` file if you're using it
VOLUME ["/usr/src/app/data"]
