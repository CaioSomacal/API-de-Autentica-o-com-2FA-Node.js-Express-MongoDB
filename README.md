# API de Autenticação com 2FA (Node.js + Express + MongoDB)

Sistema robusto de autenticação de usuários com suporte a autenticação de dois fatores (2FA) via TOTP, compatível com apps como Google Authenticator e Authy.

---

## Funcionalidades

- Registro e login seguros com validação de credenciais
- Suporte a 2FA (TOTP) com geração de QR Code para fácil configuração
- Autenticação baseada em JWT para sessões seguras
- Login com código 2FA para usuários com 2FA ativado

---

## Tecnologias

| Categoria       | Tecnologias/Bibliotecas             |
|-----------------|-----------------------------------|
| Backend         | Node.js, Express                  |
| Banco de Dados  | MongoDB, Mongoose                 |
| Segurança       | bcryptjs, jsonwebtoken (JWT), speakeasy (TOTP) |
| Utilitários     | qrcode, dotenv                   |

---

## Estrutura do Projeto

| Caminho                 | Descrição                                  |
|------------------------|--------------------------------------------|
| `src/app.js`           | Inicializa o servidor Express e middlewares|
| `src/models/User.js`   | Definição do modelo de usuário no MongoDB  |
| `src/routes/auth.js`   | Rotas de autenticação e gerenciamento de 2FA|
| `.env`                 | Variáveis de ambiente sensíveis             |
| `.gitignore`           | Arquivos e pastas ignorados pelo Git        |
| `package.json`         | Metadados do projeto e dependências         |
| `README.md`            | Documentação do projeto                      |

---

## Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/my-2fa-project.git
   cd my-2fa-project
