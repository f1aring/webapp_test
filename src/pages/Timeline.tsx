import React, { useState, useEffect } from 'react';
import { getTimeline, getMurmurs, createMurmur } from '../api';
import MurmurList from '../components/MurmurList';
import { User, Murmur } from '../types';

interface TimelineProps {
  currentUserId?: number;
  global?: boolean;
}

export default function Timeline({ currentUserId, global = false }: TimelineProps) {
  const [murmurs, setMurmurs] = useState<(Murmur & { user?: User; likeCount?: number; isLiked?: boolean })[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMurmur, setNewMurmur] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const loadMurmurs = async () => {
    try {
      setLoading(true);
      let data;
      if (global) {
        data = await getMurmurs();
      } else {
        if (!currentUserId) {
          setMurmurs([]);
          setLoading(false);
          return;
        }
        data = await getTimeline();
      }
      setMurmurs(data || []);
    } catch (error) {
      console.error('Error loading murmurs:', error);
      setMurmurs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMurmurs();
  }, [currentUserId, global]);

  const handlePost = async () => {
    if (!newMurmur.trim() || !currentUserId || isPosting) return;

    setIsPosting(true);
    try {
      await createMurmur(newMurmur.trim());
      setNewMurmur('');
      await loadMurmurs();
    } catch (error) {
      console.error('Error posting murmur:', error);
      alert('Failed to post murmur');
    } finally {
      setIsPosting(false);
    }
  };

  const handleDelete = (id: number) => {
    setMurmurs(prev => prev.filter(m => m.id !== id));
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#657786' }}>
        Loading...
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>
        {global ? 'Global Timeline' : 'Your Timeline'}
      </h1>

      {currentUserId && !global && (
        <div style={{
          border: '1px solid #e1e8ed',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '20px',
          backgroundColor: 'white',
        }}>
          <textarea
            value={newMurmur}
            onChange={(e) => setNewMurmur(e.target.value)}
            placeholder="What's happening?"
            style={{
              width: '100%',
              minHeight: '100px',
              border: 'none',
              resize: 'vertical',
              fontSize: '15px',
              fontFamily: 'inherit',
              outline: 'none',
              marginBottom: '12px',
            }}
            maxLength={280}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#657786', fontSize: '14px' }}>
              {newMurmur.length}/280
            </span>
            <button
              onClick={handlePost}
              disabled={!newMurmur.trim() || isPosting}
              style={{
                backgroundColor: '#1da1f2',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '8px 20px',
                fontSize: '15px',
                fontWeight: 'bold',
                cursor: newMurmur.trim() && !isPosting ? 'pointer' : 'not-allowed',
                opacity: newMurmur.trim() && !isPosting ? 1 : 0.5,
              }}
            >
              {isPosting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      )}

      {!currentUserId && !global && (
        <div style={{
          padding: '20px',
          backgroundColor: '#e8f5e9',
          borderRadius: '8px',
          marginBottom: '20px',
          color: '#2e7d32',
        }}>
          Please select a user to view your timeline
        </div>
      )}

      <MurmurList
        murmurs={murmurs}
        currentUserId={currentUserId}
        onDelete={handleDelete}
        onLikeChange={loadMurmurs}
      />
    </div>
  );
}

