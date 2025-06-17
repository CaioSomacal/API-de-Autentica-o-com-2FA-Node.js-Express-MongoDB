# API de Autenticação com 2FA (Node.js + Express + MongoDB)

Sistema robusto de autenticação de usuários com suporte a autenticação de dois fatores (2FA) via TOTP, compatível com apps como Google Authenticator e Authy.

---

## Funcionalidades

| Funcionalidade                          | Descrição                                            |
|---------------------------------------|-----------------------------------------------------|
| Registro e login seguros               | Validação segura de credenciais                      |
| Suporte a 2FA (TOTP)                  | Geração de QR Code para fácil configuração          |
| Autenticação baseada em JWT            | Sessões seguras e escaláveis                         |
| Login com código 2FA                   | Login secundário para usuários com 2FA ativado      |

---

## Tecnologias

| Categoria       | Tecnologias/Bibliotecas                      |
|-----------------|---------------------------------------------|
| Backend         | Node.js, Express                            |
| Banco de Dados  | MongoDB, Mongoose                           |
| Segurança       | bcryptjs, jsonwebtoken (JWT), speakeasy (TOTP) |
| Utilitários     | qrcode, dotenv                              |

---

## Estrutura do Projeto

| Caminho                 | Descrição                                   |
|-------------------------|---------------------------------------------|
| `src/app.js`            | Inicializa o servidor Express e middlewares |
| `src/models/User.js`    | Definição do modelo de usuário no MongoDB   |
| `src/routes/auth.js`    | Rotas de autenticação e gerenciamento de 2FA|
| `.env`                  | Variáveis de ambiente sensíveis              |
| `.gitignore`            | Arquivos e pastas ignorados pelo Git         |
| `package.json`          | Metadados do projeto e dependências          |
| `README.md`             | Documentação do projeto                       |

---

## Instalação e Execução

| Passo                             | Comando / Descrição                                                                                     |
|----------------------------------|--------------------------------------------------------------------------------------------------------|
| 1. Clonar o repositório           | `git clone https://github.com/seu-usuario/my-2fa-project.git` <br> `cd my-2fa-project`                   |
| 2. Instalar dependências          | `npm install`                                                                                          |
| 3. Criar arquivo `.env`           | Criar arquivo `.env` na raiz com as variáveis:                                                        |
|                                  | ```env<br>PORT=3000<br>JWT_SECRET=sua-chave-secreta-muito-segura-e-longa<br>MONGODB_URI=mongodb://localhost:27017/2fa-auth<br>``` |
| 4. Executar em modo desenvolvimento | `npm run dev` — reinício automático com nodemon                                                      |
| 5. Executar em modo produção      | `npm start`                                                                                           |
| 6. Acessar servidor               | Abrir `http://localhost:3000` (ou porta configurada no `.env`)                                         |

---

## Endpoints da API

| Método | Rota                     | Descrição                                        | Protegido por Token? |
|--------|--------------------------|-------------------------------------------------|---------------------|
| POST   | `/api/auth/register`     | Registra novo usuário com e-mail e senha        | Não                 |
| POST   | `/api/auth/login`        | Login e retorna token JWT (se 2FA não ativado)  | Não                 |
| POST   | `/api/auth/2fa/setup`    | Gera segredo TOTP e QR Code para configurar 2FA | Sim                 |
| POST   | `/api/auth/2fa/verify-setup` | Ativa 2FA após verificação do código TOTP    | Sim                 |
| POST   | `/api/auth/2fa/login`    | Login secundário com código TOTP para 2FA        | Não                 |

---

## Segurança

| Prática                      | Descrição                                                                                       |
|------------------------------|------------------------------------------------------------------------------------------------|
| Senhas Hashed                | Senhas armazenadas com hash seguro usando `bcryptjs`                                          |
| Autenticação com JWT         | Sessões autenticadas via tokens JWT assinados digitalmente                                     |
| Padrão TOTP (RFC 6238)      | Códigos 2FA gerados conforme padrão, expiram a cada 30 segundos                               |
| QR Codes para 2FA           | Facilita configuração da autenticação via apps autenticadores                                 |
| Proteção de rotas sensíveis | Rotas protegidas por autenticação JWT                                                        |

---

## Autor

| Nome          | Descrição                                | Contatos                                  |
|---------------|-----------------------------------------|-------------------------------------------|
| Caio Somacal  | Desenvolvedor Full Stack & Analista de Segurança | [GitHub](https://github.com/seu-usuario) | [LinkedIn](https://linkedin.com/in/seu-usuario) |

