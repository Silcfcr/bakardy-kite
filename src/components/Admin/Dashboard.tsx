import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../../config/supabase';
import { PRIMARY, TEXT, BACKGROUND, ACCENT } from '../../styles/colors';

interface Review {
  id: number;
  name: string;
  location: string;
  countrycode: string;
  date: string;
  comment: string;
  approved: boolean;
  created_at: string;
}

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: ${BACKGROUND.primary};
  padding: 20px;
`;

const Header = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: ${TEXT.primary};
  margin: 0;
  font-size: 2rem;
`;

const LogoutButton = styled.button`
  background: #e53e3e;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: #c53030;
    transform: translateY(-2px);
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${PRIMARY.main};
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  color: ${TEXT.secondary};
  font-size: 0.9rem;
`;

const ReviewsContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ReviewItem = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const ReviewInfo = styled.div`
  flex: 1;
`;

const ReviewName = styled.h3`
  color: ${TEXT.primary};
  margin: 0 0 5px 0;
  font-size: 1.1rem;
`;

const ReviewMeta = styled.div`
  color: ${TEXT.secondary};
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const ReviewComment = styled.p`
  color: ${TEXT.primary};
  line-height: 1.6;
  margin: 0;
`;

const ReviewActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const ActionButton = styled.button<{ variant: 'delete' | 'approve' }>`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  ${props => props.variant === 'delete' ? `
    background: #e53e3e;
    color: white;
    
    &:hover {
      background: #c53030;
    }
  ` : `
    background: ${ACCENT.success};
    color: white;
    
    &:hover {
      background: #2f855a;
    }
  `}
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 40px;
  color: ${TEXT.secondary};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: ${TEXT.secondary};
`;

const Dashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        alert(`Error fetching reviews: ${error.message}`);
      } else {
        setReviews(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting review:', error);
        alert(`Error deleting review: ${error.message}`);
      } else {
        setReviews(reviews.filter(review => review.id !== id));
        alert('Review deleted successfully');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error deleting review: ${error}`);
    }
  };

  const handleToggleApproval = async (id: number, currentApproved: boolean) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ approved: !currentApproved })
        .eq('id', id);

      if (error) {
        console.error('Error updating review:', error);
        alert(`Error updating review: ${error.message}`);
      } else {
        setReviews(reviews.map(review =>
          review.id === id ? { ...review, approved: !currentApproved } : review
        ));
        alert(`Review ${!currentApproved ? 'approved' : 'unapproved'} successfully`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error updating review: ${error}`);
    }
  };

  const approvedReviews = reviews.filter(review => review.approved);
  const pendingReviews = reviews.filter(review => !review.approved);

  if (loading) {
    return (
      <DashboardContainer>
        <LoadingSpinner>Loading reviews...</LoadingSpinner>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Header>
        <Title>Reviews Management</Title>
        <LogoutButton onClick={onLogout}>Logout</LogoutButton>
      </Header>

      <StatsContainer>
        <StatCard>
          <StatNumber>{reviews.length}</StatNumber>
          <StatLabel>Total Reviews</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{approvedReviews.length}</StatNumber>
          <StatLabel>Approved</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{pendingReviews.length}</StatNumber>
          <StatLabel>Pending</StatLabel>
        </StatCard>
      </StatsContainer>

      <ReviewsContainer>
        <h2>All Reviews</h2>
        {reviews.length === 0 ? (
          <EmptyState>No reviews found</EmptyState>
        ) : (
          reviews.map((review) => (
            <ReviewItem key={review.id}>
              <ReviewHeader>
                <ReviewInfo>
                  <ReviewName>{review.name}</ReviewName>
                  <ReviewMeta>
                    {review.location} • {review.countrycode} • {new Date(review.date).toLocaleDateString()}
                  </ReviewMeta>
                </ReviewInfo>
                <div style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  background: review.approved ? '#c6f6d5' : '#fed7d7',
                  color: review.approved ? '#22543d' : '#742a2a'
                }}>
                  {review.approved ? 'Approved' : 'Pending'}
                </div>
              </ReviewHeader>
              <ReviewComment>{review.comment}</ReviewComment>
              <ReviewActions>
                <ActionButton
                  variant="approve"
                  onClick={() => handleToggleApproval(review.id, review.approved)}
                >
                  {review.approved ? 'Unapprove' : 'Approve'}
                </ActionButton>
                <ActionButton
                  variant="delete"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  Delete
                </ActionButton>
              </ReviewActions>
            </ReviewItem>
          ))
        )}
      </ReviewsContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
