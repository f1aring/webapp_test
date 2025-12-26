import React, { useState, useEffect } from 'react';
import { deleteMurmur, likeMurmur, unlikeMurmur } from '../api';
import { User } from '../types';

interface Murmur {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
  user?: User;
  likeCount?: number;
  isLiked?: boolean;
}

interface MurmurProps {
  murmur: Murmur;
  currentUserId?: number;
  onDelete?: (id: number) => void;
  onLikeChange?: () => void;
}

export default function MurmurComponent({ murmur, currentUserId, onDelete, onLikeChange }: MurmurProps) {
  const [isLiked, setIsLiked] = useState(murmur.isLiked || false);
  const [likeCount, setLikeCount] = useState(murmur.likeCount || 0);
  const [isDeleting, setIsDeleting] = useState(false);

  const canDelete = currentUserId === murmur.userId;

  const handleLike = async () => {
    try {
      if (isLiked) {
        await unlikeMurmur(murmur.id);
        setIsLiked(false);
        setLikeCount(prev => Math.max(0, prev - 1));
      } else {
        await likeMurmur(murmur.id);
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
      }
      onLikeChange?.();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this murmur?')) return;
    
    setIsDeleting(true);
    try {
      await deleteMurmur(murmur.id);
      onDelete?.(murmur.id);
    } catch (error) {
      console.error('Error deleting murmur:', error);
      alert('Failed to delete murmur');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div style={{
      border: '1px solid #e1e8ed',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px',
      backgroundColor: 'white',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <strong style={{ fontSize: '15px' }}>
              {murmur.user?.name || murmur.user?.email || `User ${murmur.userId}`}
            </strong>
            <span style={{ color: '#657786', fontSize: '14px' }}>
              @user{murmur.userId}
            </span>
            <span style={{ color: '#657786', fontSize: '14px' }}>
              · {formatDate(murmur.createdAt)}
            </span>
          </div>
          <p style={{ margin: '8px 0', fontSize: '15px', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
            {murmur.content}
          </p>
          <div style={{ display: 'flex', gap: '24px', marginTop: '12px' }}>
            <button
              onClick={handleLike}
              disabled={!currentUserId}
              style={{
                border: 'none',
                background: 'none',
                cursor: currentUserId ? 'pointer' : 'not-allowed',
                color: isLiked ? '#e0245e' : '#657786',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '14px',
                padding: '4px 8px',
                borderRadius: '4px',
              }}
              onMouseEnter={(e) => {
                if (currentUserId) e.currentTarget.style.backgroundColor = '#f7f9fa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span>{isLiked ? '❤️' : '🤍'}</span>
              <span>{likeCount}</span>
            </button>
            {canDelete && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: isDeleting ? 'not-allowed' : 'pointer',
                  color: '#e0245e',
                  fontSize: '14px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
                onMouseEnter={(e) => {
                  if (!isDeleting) e.currentTarget.style.backgroundColor = '#f7f9fa';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

