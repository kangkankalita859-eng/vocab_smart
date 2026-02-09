import React, { useState } from 'react';
import { authService } from '../services/authService';

function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await authService.login(email);
    
    if (result.success) {
      onLoginSuccess(result.user);
      onClose();
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 3000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '32px',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '24px',
          textAlign: 'center',
          color: '#2c3e50'
        }}>
          Sign In to Save Progress
        </h2>
        
        <p style={{
          fontSize: '14px',
          color: '#666',
          marginBottom: '24px',
          textAlign: 'center',
          lineHeight: '1.5'
        }}>
          Sign in with your email to save your flashcard progress. Your unknown deck will be saved even when you close the app.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '8px',
              color: '#333'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          {error && (
            <div style={{
              backgroundColor: '#ffebee',
              color: '#c62828',
              padding: '12px',
              borderRadius: '6px',
              fontSize: '14px',
              marginBottom: '20px',
              border: '1px solid #ffcdd2'
            }}>
              {error}
            </div>
          )}

          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px 24px',
                backgroundColor: loading ? '#ccc' : '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '12px 24px',
                backgroundColor: '#f5f5f5',
                color: '#666',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              Cancel
            </button>
          </div>
        </form>

        <p style={{
          fontSize: '12px',
          color: '#999',
          textAlign: 'center',
          marginTop: '16px'
        }}>
          No password required - just enter your email to get started
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
