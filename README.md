# Minacademy Backend
[![Maintainability](https://api.codeclimate.com/v1/badges/7e9dd952c8498b2ecdf8/maintainability)](https://codeclimate.com/github/fga-eps-mds/2020.1-Minacademy-BackEnd/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/7e9dd952c8498b2ecdf8/test_coverage)](https://codeclimate.com/github/fga-eps-mds/2020.1-Minacademy-BackEnd/test_coverage)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2020.1-Minacademy-BackEnd&metric=alert_status)](https://sonarcloud.io/dashboard?id=fga-eps-mds_2020.1-Minacademy-BackEnd) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2020.1-Minacademy-BackEnd&metric=code_smells)](https://sonarcloud.io/dashboard?id=fga-eps-mds_2020.1-Minacademy-BackEnd) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2020.1-Minacademy-BackEnd&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=fga-eps-mds_2020.1-Minacademy-BackEnd) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2020.1-Minacademy-BackEnd&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=fga-eps-mds_2020.1-Minacademy-BackEnd) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2020.1-Minacademy-BackEnd&metric=security_rating)](https://sonarcloud.io/dashboard?id=fga-eps-mds_2020.1-Minacademy-BackEnd)

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2020.1-Minacademy-BackEnd&metric=ncloc)](https://sonarcloud.io/dashboard?id=fga-eps-mds_2020.1-Minacademy-BackEnd) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2020.1-Minacademy-BackEnd&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=fga-eps-mds_2020.1-Minacademy-BackEnd)

Repositório do BackEnd do projeto [Minacademy](https://github.com/fga-eps-mds/2020.1-Grupo4).

## Executando o projeto

- Instale o [Docker](http://docs.docker.com/get-docker/) e o [Compose](http://docs.docker.com/compose/install/#install-compose) no seu computador

- Baixe este repositório e entre na pasta baixada

- Se essa é a primeira vez que está rodando o projeto, execute `make build`

- Se já rodou o projeto antes, execute `make run`

- Rode o frontend do projeto. Saiba mais [aqui](https://github.com/fga-eps-mds/2020.1-Grupo4-Frontend)

- Se você fez os passos acima e não houve nenhum erro, o projeto já está rodando em [localhost:3000](localhost:3000) =D

## Instalação de Pacotes

Se você deseja instalar um pacote utilizando npm, leia as instruções a seguir:

- Execute o comando `make npm pacote=<nome-do-pacote>`
- Se for uma dependência apenas para desenvolvimento execute `make npm-dev pacote=<nome-do-pacote>`

## Comandos Úteis

| Comando                                                 | Descrição                                   |
| ------------------------------------------------------- | ------------------------------------------- |
| `make start`                                            | Inicia o container quando este está pausado |
| `make stop`                                             | Pausa a execução do container               |
| `make list`                                             | Lista os containers em execução             |
| `docker-compose exec server <comando>` | Executa um comando dentro do container      |

## Seeds
O projeto já está configurado para popular o banco assim que o container é iniciado. Caso queira popular novas models, crie um arquivo *.json* dentro da pasta *seeds/* que popula a nova model. Utilize o arquivo *users.json* como exemplo e faça um arquivo por model.


## Documentação

A documentação desse projeto pode ser acessada [aqui](https://fga-eps-mds.github.io/2020.1-Grupo4/).

