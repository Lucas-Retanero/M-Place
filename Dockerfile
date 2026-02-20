# Usamos uma imagem oficial do OpenJDK
FROM eclipse-temurin:25-jdk-jammy

# Diretório dentro do container
WORKDIR /app

# Copia o jar gerado pelo Maven para dentro do container
COPY target/mplayce-0.0.1-SNAPSHOT.jar app.jar

# Expõe a porta que o Spring Boot usa
EXPOSE 8080

# Comando para rodar o app
ENTRYPOINT ["java","-jar","app.jar"]