# NEIL Inhouse League

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Bem-vindo ao repositório da aplicação da NEIL Inhouse League! Esta é uma liga de Dota 2 na qual eu tenho participado desde a primeira temporada, e agora, na 13ª temporada, decidi criar esta aplicação como uma forma de retribuir o carinho da comunidade. Aqui, você encontrará todas as informações necessárias para entender e contribuir para este projeto.

## Sobre a NEIL Inhouse League

A NEIL Inhouse League é uma liga de Dota 2 formada por jogadores apaixonados pelo jogo. Ela foi criada com o objetivo de proporcionar um ambiente competitivo e amigável para os jogadores aprimorarem suas habilidades e se divertirem. Durante as várias temporadas da liga, fizemos amigos para a vida toda e construímos uma comunidade acolhedora.

## Objetivo da Aplicação

Esta aplicação tem como objetivo facilitar o gerenciamento e a interação dos jogadores com a NEIL Inhouse League. Ela oferece recursos para autenticação usando o OAuth da Faceit, além de fornecer informações sobre partidas, estatísticas e perfis dos jogadores. A aplicação é construída usando as seguintes tecnologias:

- **React**: Uma biblioteca JavaScript para construção de interfaces de usuário.
- **Next.js**: Um framework React que oferece recursos como renderização do lado do servidor (SSR) e geração de páginas estáticas.
- **Tailwind CSS**: Uma biblioteca de estilos utilitários altamente personalizável para desenvolvimento rápido.
- **Axios**: Uma biblioteca JavaScript para fazer requisições HTTP.
- **PostgreSQL**: Um sistema de gerenciamento de banco de dados relacional.
- **Prisma**: Um ORM (Object-Relational Mapping) para facilitar a interação com o banco de dados.
- **Chamadas a APIs**: A aplicação faz uso de chamadas a APIs da Faceit, Steam e OpenDota para obter informações relevantes para a liga.

## Configuração e Execução

Para executar a aplicação em seu ambiente local, siga as etapas abaixo:

1. Certifique-se de ter o Node.js instalado em sua máquina.
2. Clone este repositório para o seu ambiente local.
3. Navegue até o diretório raiz do projeto e execute o comando `npm install` para instalar as dependências.
4. Crie um banco de dados PostgreSQL e atualize as configurações de conexão no arquivo `.env` com as informações relevantes.
5. Execute o comando `npx prisma migrate dev` para aplicar as migrações do banco de dados.
6. Execute o comando `npm run dev` para iniciar o servidor de desenvolvimento.
7. Acesse a aplicação em seu navegador no endereço `http://localhost:3000`.

## Contribuição

Se você estiver interessado em contribuir para o desenvolvimento desta aplicação, ficaremos felizes em receber sua ajuda! Sinta-se à vontade para abrir uma issue para relatar bugs, sugerir melhorias ou enviar pull requests.

Antes de contribuir, recomendamos que leia as diretrizes de contribuição presentes no arquivo `CONTRIBUTING.md`.

## Licença

Este projeto está licenciado sob a Licença MIT. Para mais informações, consulte o arquivo `LICENSE`.
