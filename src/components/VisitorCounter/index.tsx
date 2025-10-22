import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../../config/supabase';
import { TEXT } from '../../styles/colors';

interface VisitorCounterProps {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'inline';
}

const VisitorCounter: React.FC<VisitorCounterProps> = ({
    position = 'bottom-right'
}) => {
    const [visitorCount, setVisitorCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const trackVisitor = async () => {
            try {
                // Simple visitor tracking - just increment a counter
                const { data, error } = await supabase
                    .from('visitor_count')
                    .select('*')
                    .single();

                if (error && error.code === 'PGRST116') {
                    // Table doesn't exist or is empty, create initial record
                    const { error: insertError } = await supabase
                        .from('visitor_count')
                        .insert([{ count: 1 }]);

                    if (!insertError) {
                        setVisitorCount(1);
                    }
                } else if (data) {
                    // Increment existing count
                    const newCount = (data.count || 0) + 1;
                    const { error: updateError } = await supabase
                        .from('visitor_count')
                        .update({ count: newCount })
                        .eq('id', data.id);

                    if (!updateError) {
                        setVisitorCount(newCount);
                    }
                }
            } catch (error) {
                console.error('Error tracking visitor:', error);
                // Fallback to localStorage for simple counting
                const localCount = parseInt(localStorage.getItem('visitorCount') || '0') + 1;
                localStorage.setItem('visitorCount', localCount.toString());
                setVisitorCount(localCount);
            } finally {
                setLoading(false);
            }
        };

        trackVisitor();
    }, []);

    if (loading) {
        return (
            <CounterContainer position={position}>
                <div>Loading...</div>
            </CounterContainer>
        );
    }

    return (
        <CounterContainer position={position}>
            <CounterIcon>👥</CounterIcon>
            <CounterContent>
                <CounterNumber>{visitorCount.toLocaleString()}</CounterNumber>
                <CounterLabel>Visitors</CounterLabel>
            </CounterContent>
        </CounterContainer>
    );
};

const CounterContainer = styled.div<{ position: string }>`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
  margin: 20px auto;
  max-width: fit-content;
  text-align: center;
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 0.85rem;
    margin: 15px auto;
  }
`;


const CounterIcon = styled.span`
  font-size: 1.2rem;
  opacity: 0.8;
`;

const CounterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CounterNumber = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${TEXT.primary};
  line-height: 1;
`;

const CounterLabel = styled.span`
  font-size: 0.8rem;
  color: ${TEXT.muted};
  font-weight: 500;
  line-height: 1;
`;

export default VisitorCounter;
