🔐 API de Autenticação com 2FA – Node.js + Express + MongoDB
Este projeto implementa um sistema robusto de autenticação de usuários, incorporando autenticação de dois fatores (2FA) baseada em TOTP (Time-Based One-Time Password). É totalmente compatível com aplicativos autenticadores populares como Google Authenticator, Authy, entre outros, garantindo uma camada extra de segurança para as contas de usuário.

✨ Funcionalidades Principais
Autenticação de Usuário: Registro e login seguros com validação de credenciais.

Autenticação de Dois Fatores (2FA): Suporte para TOTP, permitindo que os usuários configurem 2FA para suas contas.

Geração de QR Code: Facilita a configuração do 2FA pelos usuários através de QR codes.

Gestão de Sessão: Utiliza JWT para autenticação baseada em tokens, garantindo sessões seguras e escaláveis.

🚀 Tecnologias Utilizadas
O projeto foi construído com as seguintes tecnologias e bibliotecas:

Backend:

Node.js: Ambiente de tempo de execução JavaScript.

Express: Framework web para Node.js, para construção da API RESTful.

Banco de Dados:

MongoDB: Banco de dados NoSQL flexível e escalável.

Mongoose: ODM (Object Data Modeling) para MongoDB e Node.js.

Segurança:

jsonwebtoken (JWT): Para geração e validação de tokens de autenticação.

bcryptjs: Para hash seguro de senhas.

speakeasy: Para implementação de TOTP (Time-Based One-Time Password) para 2FA.

qrcode: Para geração de QR Codes, facilitando a configuração do 2FA.

Configuração:

dotenv: Para gerenciamento de variáveis de ambiente.

📁 Estrutura de Pastas
A organização do projeto segue uma estrutura clara para facilitar o desenvolvimento e a manutenção:

my-2fa-project/
├── src/
│ ├── app.js # Inicializa o servidor Express e configura middlewares
│ ├── models/
│ │ └── User.js # Definição do esquema e modelo do usuário no MongoDB
│ └── routes/
│ └── auth.js # Contém todas as rotas de autenticação e gerenciamento de 2FA
├── .env # Arquivo para variáveis de ambiente sensíveis
├── .gitignore # Especifica arquivos e pastas a serem ignorados pelo Git
├── package.json # Metadados do projeto e dependências
└── README.md 

⚙️ Instalação e Execução
Siga os passos abaixo para configurar e rodar o projeto em seu ambiente local:

Clone o Repositório:

git clone https://github.com/seu-usuario/my-2fa-project.git
cd my-2fa-project

Instale as Dependências:

npm install

Crie o Arquivo de Variáveis de Ambiente:
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo, substituindo os valores pelos seus:

PORT=3000
JWT_SECRET=sua-chave-secreta-muito-segura-e-longa
MONGODB_URI=mongodb://localhost:27017/2fa-auth

PORT: A porta em que o servidor Express será executado.

JWT_SECRET: Uma chave secreta forte para assinar e verificar os tokens JWT.

MONGODB_URI: A string de conexão com o seu banco de dados MongoDB.

Inicie o Servidor:
Para iniciar o servidor em modo de desenvolvimento (geralmente com nodemon para reinício automático):

npm run dev

Se preferir executar em modo de produção:

npm start

O servidor estará disponível em http://localhost:3000 (ou na porta que você configurou no .env).

📲 Principais Endpoints da API
A API oferece os seguintes endpoints para gerenciamento de autenticação e 2FA:

Método

Rota

Descrição

Protegido por Token?

POST

/api/auth/register

Cria um novo usuário com e-mail e senha.

Não

POST

/api/auth/login

Realiza o login do usuário e retorna um token JWT (se 2FA não estiver ativado).

Não

POST

/api/auth/2fa/setup

Gera o segredo TOTP e um QR Code para configuração do 2FA no aplicativo autenticador.

Sim

POST

/api/auth/2fa/verify-setup

Ativa oficialmente o 2FA para o usuário, verificando o código TOTP fornecido.

Sim

POST

/api/auth/2fa/login

Realiza o login secundário com o código TOTP após o login inicial para usuários com 2FA ativado.

Não

✅ Segurança
Este sistema de autenticação foi projetado com as seguintes práticas de segurança em mente:

Senhas Hashed: As senhas dos usuários são armazenadas no banco de dados usando bcryptjs, garantindo que nunca sejam guardadas em texto plano.

Sessões Autenticadas com JWT: Todas as sessões autenticadas são gerenciadas com JSON Web Tokens, que são assinados digitalmente para verificar sua integridade e autenticidade.

Verificação de Token TOTP (RFC 6238): O sistema TOTP segue o padrão RFC 6238, garantindo a interoperabilidade com a maioria dos aplicativos autenticadores.

Tokens 2FA Expiram: Os códigos TOTP são baseados em tempo e expiram a cada 30 segundos, reduzindo a janela de oportunidade para ataques de repetição.

✍️ Autor
Caio Somacal
Desenvolvedor Full Stack & Analista de Segurança

GitHub

LinkedIn