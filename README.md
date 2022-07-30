# BACK-END-PRACTICE

A seguir, tem-se uma breve descrição das funcionalidades desenvolvidas neste teste prático, em conjuto com todas informações necessárias.

## Banco de Dados

```
> Foi utilizado o Postgres 14.1 
> Porta 5432
> username:postgres
> password: root
> database: bridgehub
```

Após a conexão ser validada, execute os seguintes comandos (migrations):

```
**Com Yarn:**

yarn typeorm migration:run 

```



## yarn typeorm migration:run

## Rotas da Apliação

O servidor está sendo executado na porta 3333.

-> /users -> Lista os usuários
-> /add_user-> Cria um usuárrio
-> /edit_user/id -> Edita o usuário
-> /users/id -> Lista um usuário
-> /delete_user/id -> Delete um usuário
-> /send_email/id -> Envia email ao usuário
