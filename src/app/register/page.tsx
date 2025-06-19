'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}
