# ChatFlow

<h1 align="center">
    <img alt="ChatFlow Logo" title="ChatFlow" src="./public/logo.webp" width="200px" />
</h1>

<p align="center">🚀 ChatFlow é um aplicativo de chat em tempo real construído com React.js e Firebase, oferecendo uma experiência de comunicação dinâmica e interativa.</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellowgreen" alt="Status: Em Desenvolvimento">
</p>

## Tabela de Conteúdos

- [ChatFlow](#chatflow)
  - [Tabela de Conteúdos](#tabela-de-conteúdos)
  - [Sobre](#sobre)
  - [Estrutura do Projeto](#estrutura-do-projeto)
    - [src/](#src)
  - [Funcionalidades](#funcionalidades)
  - [Demonstração da Aplicação](#demonstração-da-aplicação)
  - [Como Rodar o Projeto](#como-rodar-o-projeto)
    - [Pré-requisitos](#pré-requisitos)
    - [Instalando e Executando](#instalando-e-executando)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Como Contribuir](#como-contribuir)
  - [Autor](#autor)
  - [Licença](#licença)

## Sobre

<p align="center">ChatFlow é projetado para fornecer uma plataforma de comunicação eficaz e envolvente, permitindo aos usuários se registrar, acessar diferentes salas de chat e interagir através de mensagens em tempo real.</p>

## Estrutura do Projeto

O projeto "ChatFlow" segue os princípios da Clean Architecture, garantindo a separação de preocupações e a independência das camadas. A estrutura de pastas é organizada da seguinte forma:

### src/

A pasta `src/` contém todos os arquivos necessários para a aplicação, divididos nas seguintes subpastas:

- **data/:** Representa a camada de dados da Clean Architecture, contendo as implementações das regras de negócio declaradas no domínio.
- **domain/:** Camada do domínio, a mais interna da aplicação, contendo as regras de negócio sem dependências de outras camadas.
- **infra/:** Implementações referentes ao protocolo HTTP e ao cache, além de bibliotecas externas.
- **main/:** Camada principal, onde as interfaces desenvolvidas na camada de apresentação são integradas com as regras de negócio das camadas internas, utilizando padrões de design como Factory Method, Composite e Builder.
- **presentation/:** Contém a parte visual da aplicação, utilizando a abordagem Atomic Design para organizar os componentes em `atoms/`, `molecules/`, `organisms/`, `templates/` e `pages/`.
- **requirements/:** Documentação dos requisitos do sistema.
- **validation/:** Implementações das validações usadas nos campos.

## Funcionalidades

- [x] Cadastro e autenticação de usuários
- [x] Criação e gestão de salas de chat
- [ ] Envio e recebimento de mensagens em tempo real
- [ ] Pesquisa e participação em salas existentes

## Demonstração da Aplicação

<p align="center">🚧 Em construção... 🚧</p>

## Como Rodar o Projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). Além disso, é bom ter um editor para trabalhar com o código, como o [VSCode](https://code.visualstudio.com/).

### Instalando e Executando

```bash
# Clone este repositório
$ git clone <https://github.com/seu-usuario/chatflow-app>

# Acesse a pasta do projeto no terminal
$ cd chatflow-app

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm start

# O servidor iniciará na porta:3000 - acesse <http://localhost:3000>
```

## Tecnologias Utilizadas

As seguintes ferramentas foram usadas na construção do projeto:

- [React.js](https://pt-br.reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Material UI](https://mui.com/)
- [React Query](https://react-query.tanstack.com/)
- [Axios](https://axios-http.com/)

## Como Contribuir

Para contribuir com ChatFlow, siga estas etapas:

1. Bifurque este repositório.
2. Crie uma branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para a branch original: `git push origin <nome_do_projeto> / <local>`
5. Crie a solicitação de pull.

Alternativamente, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/articles/creating-a-pull-request/).

## Autor

👤 **Seu Nome**

- GitHub: [@victorgois07](https://github.com/victorgois07)
- LinkedIn: [Victor Gois Vieira](https://www.linkedin.com/in/victor-gois-26403a28/)

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
