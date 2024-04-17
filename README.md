# TODO Draggable

![todo-draggable](https://github.com/filho-flavio/ToDoFullStack/assets/113551879/44edde66-e594-49ef-a48c-3c3d159d03b7)

O objetivo deste projeto foi aplicar os conhecimentos adquiridos ao longo da minha jornada como desenvolvedor FullStack, iniciada em fevereiro de 2022.
Desenvolvi um aplicativo de lista de tarefas (lista de tarefas) abrangente, que incluísse recursos avançados. Além de estabelecer uma comunicação eficaz entre o frontend e o backend para garantir a integração completa do sistema.

[todo-draggable](https://github.com/filho-flavio/ToDoFullStack/assets/113551879/fe33bb62-2205-4076-aa28-5999137f9210)

## :rocket: Tecnologias

- [x] [Node.js](https://nodejs.org)
- [x] [Express.js](https://expressjs.com/pt-br/)
- [x] [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [x] [TypeScript](https://www.typescriptlang.org)
- [x] [React.js](https://react.dev/)
- [x] [React-Router](https://reactrouter.com/en/main)
- [x] [React-Icons](https://react-icons.github.io/react-icons/)
- [x] [JWT](https://jwt.io/)
- [x] [MySQL](https://www.mysql.com/)

## Fluxo da aplicação

Nesse fluxo é apresentado as etapas de execução e a comunicação entre os sistemas.

Existem 2 sistemas o `Frontend` e o `Backend/ API`.

![ToDo Draggable](https://github.com/filho-flavio/ToDoFullStack/assets/113551879/2f7a49a8-00d2-4a91-b378-1cf187bfbd84)


  ## MER - Modelo Entidade Relacionamento
  Modelo conceitual usado para representar as relações entre entidades em um banco de dados.
  
  ![ToDo Draggable](https://github.com/filho-flavio/ToDoFullStack/assets/113551879/9c3b6c0c-9bdc-4e9e-b637-6ab6e0eb3145)

<details>
  <summary>Criando Banco de Dados</summary>
  
  ## Criando Banco de Dados

  ```
    create database todo;
  ```

  ### Criando tabelas do banco
  São três tabelas.
  Tabela tasks:
   ```
    CREATE TABLE tasks (
      id INT NOT NULL AUTO_INCREMENT,
      text TEXT,
      data_abertura DATETIME,
      schedule DATETIME,
      user_owner INT,
      assigned_to INT,
      list_id INT NOT NULL,
      position INT,
      PRIMARY KEY (id),
      INDEX fk_user_owner (user_owner),
      INDEX fk_assigned_to (assigned_to),
      CONSTRAINT fk_user_owner FOREIGN KEY (user_owner) REFERENCES users (id),
      CONSTRAINT fk_assigned_to FOREIGN KEY (assigned_to) REFERENCES users (id),
      CONSTRAINT fk_list_id FOREIGN KEY (list_id) REFERENCES tasks_list (list_id)
);
  ```

  Tabela tasks_list:
  ```
    CREATE TABLE tasks_list (
      list_id INT NOT NULL AUTO_INCREMENT,
      list_title VARCHAR(100) NOT NULL,
      qtd_tasks INT,
      list_user_owner INT,
      PRIMARY KEY (list_id),
      INDEX fk_list_user_owner (list_user_owner),
      CONSTRAINT fk_list_user_owner FOREIGN KEY (list_user_owner) REFERENCES users (id)
);
  ```

Tabela users:
 ```
  CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    fullName VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255),
    gender VARCHAR(255),
    profilePic VARCHAR(255),
    backgroundColor VARCHAR(255),
    PRIMARY KEY (id)
);

 ```
</details>
