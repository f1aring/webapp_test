import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';

type Props = {
  currentUser: User | null;
  onLogout: () => void;
};

export default function TopBar({ currentUser, onLogout }: Props) {
  return (
    <header
      style={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        borderBottom: '1px solid #e1e8ed',
        backgroundColor: 'white',
        width: '100%'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 18, color: '#1da1f2' }}>MiniMurmur</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {currentUser ? (
          <>
            <Link to={`/users/${currentUser.id}`} style={{ color: '#14171a', textDecoration: 'none' }}>
              {currentUser.name || currentUser.email}
            </Link>
            <button
              onClick={onLogout}
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid #e1e8ed',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                background: '#1da1f2',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid #1da1f2',
                color: '#1da1f2',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
