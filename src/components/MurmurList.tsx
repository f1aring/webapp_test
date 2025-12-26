import React from 'react';
import Murmur from './Murmur';
import { User, Murmur as MurmurType } from '../types';

interface MurmurListProps {
  murmurs: (MurmurType & { user?: User; likeCount?: number; isLiked?: boolean })[];
  currentUserId?: number;
  onDelete?: (id: number) => void;
  onLikeChange?: () => void;
}

export default function MurmurList({ murmurs, currentUserId, onDelete, onLikeChange }: MurmurListProps) {
  if (murmurs.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px', 
        color: '#657786',
        fontSize: '16px' 
      }}>
        No murmurs yet. Be the first to post!
      </div>
    );
  }

  return (
    <div>
      {murmurs.map(murmur => (
        <Murmur
          key={murmur.id}
          murmur={murmur}
          currentUserId={currentUserId}
          onDelete={onDelete}
          onLikeChange={onLikeChange}
        />
      ))}
    </div>
  );
}

