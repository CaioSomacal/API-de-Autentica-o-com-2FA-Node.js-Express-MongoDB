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

   Instalação e Execução


# Instale as dependências
npm install

# Crie o arquivo .env com as variáveis necessárias
# Exemplo de conteúdo do .env:
# PORT=3000
# JWT_SECRET=sua-chave-secreta-muito-segura-e-longa
# MONGODB_URI=mongodb://localhost:27017/2fa-auth

# Execute o projeto em modo desenvolvimento
npm run dev

# Ou para produção
npm start
O servidor ficará disponível em http://localhost:3000 (ou na porta definida no .env).

Endpoints da API
Método	Rota	Descrição	Protegido por Token?
POST	/api/auth/register	Registra um novo usuário com e-mail e senha	Não
POST	/api/auth/login	Realiza login e retorna token JWT (sem 2FA)	Não
POST	/api/auth/2fa/setup	Gera segredo TOTP e QR Code para configurar 2FA	Sim
POST	/api/auth/2fa/verify-setup	Ativa 2FA após verificação do código TOTP	Sim
POST	/api/auth/2fa/login	Login secundário com código TOTP para usuários com 2FA	Não

Segurança
Senhas armazenadas com hash seguro via bcryptjs.

Tokens JWT assinados e validados para autenticação de sessões.

Códigos 2FA gerados pelo padrão TOTP (RFC 6238), expiram a cada 30 segundos.

QR Codes para facilitar configuração de 2FA em apps autenticadores.

Proteção de rotas sensíveis por meio de autenticação JWT.

Autor
Caio Somacal
Desenvolvedor Full Stack & Analista de Segurança

GitHub

LinkedIn


