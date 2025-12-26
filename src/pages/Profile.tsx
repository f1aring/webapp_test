import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser, getUserMurmurs, followUser, unfollowUser, getUsers } from '../api';
import MurmurList from '../components/MurmurList';
import { User, Murmur } from '../types';

interface ProfileProps {
  currentUserId?: number;
}

export default function Profile({ currentUserId }: ProfileProps) {
  const { id } = useParams<{ id: string }>();
  const userId = id ? Number(id) : undefined;
  const [user, setUser] = useState<User | null>(null);
  const [murmurs, setMurmurs] = useState<(Murmur & { user?: User; likeCount?: number; isLiked?: boolean })[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isTogglingFollow, setIsTogglingFollow] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const loadData = async () => {
      try {
        setLoading(true);
        const [userData, murmursData] = await Promise.all([
          getUser(userId),
          getUserMurmurs(userId),
        ]);
        setUser(userData);
        setMurmurs(murmursData || []);

        // Check if current user is following this user
        if (currentUserId && currentUserId !== userId) {
          try {
            const users = await getUsers();
            // This is a simple check - in a real app, you'd have a dedicated endpoint
            // For now, we'll try to follow/unfollow and see if it works
            setIsFollowing(false); // We'll update this when user tries to follow
          } catch (error) {
            console.error('Error checking follow status:', error);
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId, currentUserId]);

  const handleToggleFollow = async () => {
    if (!currentUserId || !userId || currentUserId === userId || isTogglingFollow) return;

    setIsTogglingFollow(true);
    try {
      if (isFollowing) {
        await unfollowUser(userId);
        setIsFollowing(false);
      } else {
        await followUser(userId);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
      alert('Failed to update follow status');
    } finally {
      setIsTogglingFollow(false);
    }
  };

  const handleDelete = (murmurId: number) => {
    setMurmurs(prev => prev.filter(m => m.id !== murmurId));
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#657786' }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#657786' }}>
        User not found
      </div>
    );
  }

  const isOwnProfile = currentUserId === userId;

  return (
    <div>
      <div style={{
        border: '1px solid #e1e8ed',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: 'white',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '24px', marginBottom: '8px', fontWeight: 'bold' }}>
              {user.name || user.email}
            </h1>
            <p style={{ color: '#657786', fontSize: '15px', marginBottom: '12px' }}>
              @user{user.id}
            </p>
            <p style={{ color: '#657786', fontSize: '14px' }}>
              {murmurs.length} {murmurs.length === 1 ? 'murmur' : 'murmurs'}
            </p>
          </div>
          {currentUserId && !isOwnProfile && (
            <button
              onClick={handleToggleFollow}
              disabled={isTogglingFollow}
              style={{
                backgroundColor: isFollowing ? 'white' : '#1da1f2',
                color: isFollowing ? '#1da1f2' : 'white',
                border: `1px solid ${isFollowing ? '#1da1f2' : 'transparent'}`,
                borderRadius: '20px',
                padding: '8px 20px',
                fontSize: '15px',
                fontWeight: 'bold',
                cursor: isTogglingFollow ? 'not-allowed' : 'pointer',
                opacity: isTogglingFollow ? 0.5 : 1,
              }}
            >
              {isTogglingFollow ? '...' : isFollowing ? 'Following' : 'Follow'}
            </button>
          )}
        </div>
      </div>

      <h2 style={{ fontSize: '20px', marginBottom: '16px', fontWeight: 'bold' }}>
        Murmurs
      </h2>

      <MurmurList
        murmurs={murmurs}
        currentUserId={currentUserId}
        onDelete={handleDelete}
        onLikeChange={() => {
          if (userId) {
            getUserMurmurs(userId).then(setMurmurs).catch(console.error);
          }
        }}
      />
    </div>
  );
}

