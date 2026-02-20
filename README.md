# 🎮 Catálogo de Brinquedos - Projeto Disciplinar

Este projeto foi desenvolvido como parte da disciplina **Desenvolvimento Web III**. O objetivo é criar um sistema completo de **CRUD** para o gerenciamento de um **catálogo de brinquedos**, utilizando **Java com Spring Boot** no backend e **Vue.js** no frontend.

---

## 🔗 Acesso Online (Demo)

O projeto está disponível para visualização em tempo real através do link abaixo:

🚀 **[MPlayce - Catálogo de Brinquedos](https://m-place.onrender.com)**

> [!IMPORTANT]  
> **Aviso sobre o carregamento:** O projeto está hospedado na plataforma **Render** utilizando o plano gratuito. Por esse motivo, o serviço entra em estado de hibernação quando não está em uso. Ao abrir o link, **pode levar entre 30 a 50 segundos** para o servidor "acordar" e o site carregar completamente.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Java 17+**
- **Spring Boot**
- **Spring Data JPA**
- **MySQL**
- **Maven**
- **Postman** (para testes de API)

### Frontend
- **Vue.js 3**
- **HTML5 + CSS3**

---

## ⚙️ Funcionalidades

### Funcionalidades Gerais (Todos os usuários - comum, admin e admin master):

✅ Criar uma conta (cadastro)  
✅ Fazer login e log-out  
✅ Redefinir senha  
✅ Visualizar todos os brinquedos  
✅ Visualizar brinquedos por categoria  
✅ Ver detalhes de um brinquedo  
✅ Visualizar todas as categorias  

---

### Funcionalidades de Administrador (admin):

✅ Criar brinquedos e categorias  
✅ Editar brinquedos e categorias  
✅ Excluir brinquedos e categorias  

---

### Funcionalidades de Administrador Master (admin master):

✅ Todas as funcionalidades dos usuários comuns e admins  
✅ Listar todos os usuários do sistema  
✅ Alterar permissões de usuários (comum, admin ou admin master)  
✅ Excluir usuários do sistema  

---

## 🖥️ Rodando o projeto localmente

Caso deseje rodar o projeto em sua máquina local, será necessário configurar **seu próprio banco de dados local**, pois as credenciais do banco em produção estão armazenadas apenas como variáveis de ambiente no deploy e não ficam disponíveis no código.

---

### 1. Configuração do Backend

No arquivo:

```
src/main/resources/application.properties
```

Você encontrará as configurações de conexão:

```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

Para rodar localmente, substitua as variáveis `${...}` pelas suas credenciais do banco local. Exemplo:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/mplayce
spring.datasource.username=root
spring.datasource.password=suasenha
```

> ⚠️ As variáveis de ambiente usadas no deploy estão configuradas apenas no servidor de hospedagem e **não funcionam localmente**.

---

### 2. Configuração do Frontend (Importante)

Para que o frontend aponte para o seu servidor local em vez do servidor de produção, edite o arquivo:

```
src/main/resources/static/js/config.js
```

Altere a variável para:

```javascript
export const API_URL = "http://localhost:8080";
```

---

### 3. Execução

1. Abra o projeto em sua IDE (IntelliJ, Eclipse, VS Code).  
2. Certifique-se de estar usando o **Java 17** e o **Maven**.  
3. Rode a aplicação.  
4. Acesse no navegador:

```
http://localhost:8080/#/
```

---

### 🔐 Acesso Master

Para acessar todas as funcionalidades do site, utilize o e-mail:

```
adminMaster@gmail.com
```

Utilize a função **"esqueci minha senha"** na tela de login para definir uma nova senha para este acesso inicial.
