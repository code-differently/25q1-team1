'use client';

import { useState } from 'react';
import { login, register } from '@/src/lib/auth';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    await register(email, password);
    alert('Registered!');
  };

  const handleLogin = async () => {
    await login(email, password);
    alert('Logged in!');
  };

  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleRegister}>Sign Up</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
