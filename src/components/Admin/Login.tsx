import React, { useState } from 'react';
import styled from 'styled-components';
import { PRIMARY, TEXT, BACKGROUND, INTERACTIVE } from '../../styles/colors';

interface LoginProps {
    onLogin: (password: string) => void;
}

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  color: ${TEXT.primary};
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${PRIMARY.main};
  }
`;

const Button = styled.button`
  background: ${PRIMARY.main};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${INTERACTIVE.hover};
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 10px;
`;

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simple password check (in production, this should be more secure)
        if (password === 'admin') {
            onLogin(password);
        } else {
            setError('Incorrect password');
            setLoading(false);
        }
    };

    return (
        <LoginContainer>
            <LoginCard>
                <Title>Admin Login</Title>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="password"
                        placeholder="Enter admin password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </Form>
            </LoginCard>
        </LoginContainer>
    );
};

export default Login;
