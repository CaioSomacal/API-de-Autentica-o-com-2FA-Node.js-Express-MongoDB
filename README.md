🔐 API de Autenticação com 2FA – Node.js + Express + MongoDB
Projeto que implementa autenticação de usuários com suporte a autenticação de dois fatores (2FA) via TOTP, compatível com apps como Google Authenticator.

Funcionalidades principais:

Registro e login seguros.

Configuração de 2FA com QR Code.

Autenticação via JWT.

Verificação e login com código 2FA.

Tecnologias:

Node.js, Express, MongoDB, Mongoose

bcryptjs (hash de senha), jsonwebtoken (JWT)

speakeasy (TOTP), qrcode, dotenv

Estrutura:

/src com app.js, modelos (User.js) e rotas (auth.js)

.env para variáveis sensíveis

Setup rápido:

bash
Copiar
Editar
git clone https://github.com/seu-usuario/my-2fa-project.git
cd my-2fa-project
npm install
# configurar .env com PORT, JWT_SECRET, MONGODB_URI
npm run dev # ou npm start
Principais endpoints:

/api/auth/register — cria usuário

/api/auth/login — login normal

/api/auth/2fa/setup — gera QR Code 2FA

/api/auth/2fa/verify-setup — ativa 2FA

/api/auth/2fa/login — login com código 2FA

Segurança:

Senhas armazenadas com hash bcrypt

JWT para sessões seguras

TOTP conforme RFC 6238, códigos expiram a cada 30s
