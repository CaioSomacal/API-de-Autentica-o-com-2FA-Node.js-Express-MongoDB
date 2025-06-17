const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Cadastro
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) return res.status(400).json({ error: 'Email e senha são obrigatórios.' });

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'Usuário já existe.' });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ email, passwordHash });
    await user.save();

    return res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro no servidor.' });
  }
});

// Login - primeiro passo (email e senha)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) return res.status(400).json({ error: 'Email e senha são obrigatórios.' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Credenciais inválidas.' });

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) return res.status(400).json({ error: 'Credenciais inválidas.' });

    if (user.twoFactorEnabled) {
      // Retorna indicação para pedir código 2FA
      return res.json({ message: '2FA ativado. Envie o código 2FA.', twoFactorRequired: true, userId: user._id });
    } else {
      // Gera token JWT normal
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      return res.json({ message: 'Login realizado com sucesso!', token });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Erro no servidor.' });
  }
});

// Ativar 2FA - gera secret e QR code
router.post('/2fa/setup', async (req, res) => {
  const { userId } = req.body;

  try {
    if (!userId) return res.status(400).json({ error: 'ID do usuário é obrigatório.' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

    // Gera secret para 2FA
    const secret = speakeasy.generateSecret({ length: 20, name: `MyApp (${user.email})` });

    user.twoFactorSecret = secret.base32;
    user.twoFactorEnabled = false; // ativa após validar o código
    await user.save();

    // Gera QR code em DataURL para app autenticador
    qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
      if (err) return res.status(500).json({ error: 'Erro ao gerar QR code.' });

      return res.json({
        message: 'Configure o 2FA escaneando o QR code no app autenticador.',
        qrCodeDataURL: data_url,
        secret: secret.base32, // opcional, só para debug ou configuração manual
      });
    });
  } catch (err) {
    return res.status(500).json({ error: 'Erro no servidor.' });
  }
});

// Validar código 2FA para ativar o 2FA
router.post('/2fa/verify-setup', async (req, res) => {
  const { userId, token } = req.body;

  try {
    if (!userId || !token) return res.status(400).json({ error: 'ID do usuário e token 2FA são obrigatórios.' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
    if (!user.twoFactorSecret) return res.status(400).json({ error: '2FA não configurado para este usuário.' });

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token,
      window: 1,
    });

    if (verified) {
      user.twoFactorEnabled = true;
      await user.save();
      return res.json({ message: '2FA ativado com sucesso!' });
    } else {
      return res.status(400).json({ error: 'Token 2FA inválido.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Erro no servidor.' });
  }
});

// Validar código 2FA no login - segundo passo para login com 2FA
router.post('/2fa/login', async (req, res) => {
  const { userId, token } = req.body;

  try {
    if (!userId || !token) return res.status(400).json({ error: 'ID do usuário e token 2FA são obrigatórios.' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
    if (!user.twoFactorEnabled || !user.twoFactorSecret) return res.status(400).json({ error: '2FA não ativado.' });

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token,
      window: 1,
    });

    if (verified) {
      // Gera JWT após 2FA válido
      const tokenJWT = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      return res.json({ message: 'Login com 2FA realizado com sucesso!', token: tokenJWT });
    } else {
      return res.status(400).json({ error: 'Token 2FA inválido.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Erro no servidor.' });
  }
});

module.exports = router;
