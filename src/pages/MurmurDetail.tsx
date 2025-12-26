import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMurmur, likeMurmur, unlikeMurmur, deleteMurmur } from '../api';
import { User, Murmur } from '../types';

interface MurmurDetailProps {
  currentUserId?: number;
}

export default function MurmurDetail({ currentUserId }: MurmurDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const murmurId = id ? Number(id) : undefined;
  const [murmur, setMurmur] = useState<(Murmur & { user?: User; likeCount?: number; isLiked?: boolean }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!murmurId) return;

    const loadMurmur = async () => {
      try {
        setLoading(true);
        const data = await getMurmur(murmurId);
        setMurmur(data);
        setIsLiked(data.isLiked || false);
        setLikeCount(data.likeCount || 0);
      } catch (error) {
        console.error('Error loading murmur:', error);
        alert('Murmur not found');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    loadMurmur();
  }, [murmurId, navigate]);

  const handleLike = async () => {
    if (!murmurId || !currentUserId) return;

    try {
      if (isLiked) {
        await unlikeMurmur(murmurId);
        setIsLiked(false);
        setLikeCount(prev => Math.max(0, prev - 1));
      } else {
        await likeMurmur(murmurId);
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
      }
      // Reload murmur to get updated data
      const data = await getMurmur(murmurId);
      setMurmur(data);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleDelete = async () => {
    if (!murmurId || !confirm('Are you sure you want to delete this murmur?')) return;

    setIsDeleting(true);
    try {
      await deleteMurmur(murmurId);
      navigate('/');
    } catch (error) {
      console.error('Error deleting murmur:', error);
      alert('Failed to delete murmur');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#657786' }}>
        Loading...
      </div>
    );
  }

  if (!murmur) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#657786' }}>
        Murmur not found
      </div>
    );
  }

  const canDelete = currentUserId === murmur.userId;

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: '20px',
          padding: '8px 16px',
          border: '1px solid #e1e8ed',
          borderRadius: '4px',
          backgroundColor: 'white',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        ← Back
      </button>

      <div style={{
        border: '1px solid #e1e8ed',
        borderRadius: '8px',
        padding: '24px',
        backgroundColor: 'white',
      }}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <strong style={{ fontSize: '18px' }}>
              {murmur.user?.name || murmur.user?.email || `User ${murmur.userId}`}
            </strong>
            <span style={{ color: '#657786', fontSize: '15px' }}>
              @user{murmur.userId}
            </span>
          </div>
          <span style={{ color: '#657786', fontSize: '14px' }}>
            {formatDate(murmur.createdAt)}
          </span>
        </div>

        <p style={{ 
          margin: '16px 0', 
          fontSize: '18px', 
          lineHeight: '1.6', 
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}>
          {murmur.content}
        </p>

        <div style={{ 
          display: 'flex', 
          gap: '24px', 
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid #e1e8ed',
        }}>
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
              gap: '8px',
              fontSize: '16px',
              padding: '8px 12px',
              borderRadius: '4px',
            }}
            onMouseEnter={(e) => {
              if (currentUserId) e.currentTarget.style.backgroundColor = '#f7f9fa';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <span style={{ fontSize: '20px' }}>{isLiked ? '❤️' : '🤍'}</span>
            <span>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
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
                fontSize: '16px',
                padding: '8px 12px',
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
  );
}

