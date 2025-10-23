import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase, Review } from '../../config/supabase';
import { TEXT, GRADIENTS } from '../../styles/colors';
import ReviewForm from '../ReviewForm';

interface ReviewsProps {
  title: string;
  subtitle: string;
  description: string;
  id?: string;
}

const Reviews: React.FC<ReviewsProps> = ({ title, subtitle, description, id }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('approved', true)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
      } else {
        setReviews(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmitted = () => {
    setShowForm(false);
    fetchReviews();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} filled={index < rating}>
        ★
      </Star>
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCountryName = (countryCode: string) => {
    const countryMap: { [key: string]: string } = {
      'AF': 'Afghanistan', 'AL': 'Albania', 'DZ': 'Algeria', 'AR': 'Argentina', 'AU': 'Australia',
      'AT': 'Austria', 'BD': 'Bangladesh', 'BE': 'Belgium', 'BR': 'Brazil', 'BG': 'Bulgaria',
      'CA': 'Canada', 'CL': 'Chile', 'CN': 'China', 'CO': 'Colombia', 'CR': 'Costa Rica',
      'HR': 'Croatia', 'CZ': 'Czech Republic', 'DK': 'Denmark', 'EG': 'Egypt', 'FI': 'Finland',
      'FR': 'France', 'DE': 'Germany', 'GR': 'Greece', 'GT': 'Guatemala', 'HU': 'Hungary',
      'IS': 'Iceland', 'IN': 'India', 'ID': 'Indonesia', 'IE': 'Ireland', 'IL': 'Israel',
      'IT': 'Italy', 'JP': 'Japan', 'KE': 'Kenya', 'KR': 'South Korea', 'LV': 'Latvia',
      'LT': 'Lithuania', 'LU': 'Luxembourg', 'MY': 'Malaysia', 'MX': 'Mexico', 'NL': 'Netherlands',
      'NZ': 'New Zealand', 'NO': 'Norway', 'PK': 'Pakistan', 'PE': 'Peru', 'PH': 'Philippines',
      'PL': 'Poland', 'PT': 'Portugal', 'RO': 'Romania', 'RU': 'Russia', 'SA': 'Saudi Arabia',
      'SG': 'Singapore', 'SK': 'Slovakia', 'SI': 'Slovenia', 'ZA': 'South Africa', 'ES': 'Spain',
      'SE': 'Sweden', 'CH': 'Switzerland', 'TH': 'Thailand', 'TR': 'Turkey', 'UA': 'Ukraine',
      'AE': 'United Arab Emirates', 'GB': 'United Kingdom', 'US': 'United States', 'UY': 'Uruguay',
      'VE': 'Venezuela', 'VN': 'Vietnam'
    };
    return countryMap[countryCode] || countryCode;
  };

  const getCountryFlag = (countryCode: string) => {
    const flagMap: { [key: string]: string } = {
      'AF': '🇦🇫', 'AL': '🇦🇱', 'DZ': '🇩🇿', 'AR': '🇦🇷', 'AU': '🇦🇺',
      'AT': '🇦🇹', 'BD': '🇧🇩', 'BE': '🇧🇪', 'BR': '🇧🇷', 'BG': '🇧🇬',
      'CA': '🇨🇦', 'CL': '🇨🇱', 'CN': '🇨🇳', 'CO': '🇨🇴', 'CR': '🇨🇷',
      'HR': '🇭🇷', 'CZ': '🇨🇿', 'DK': '🇩🇰', 'EG': '🇪🇬', 'FI': '🇫🇮',
      'FR': '🇫🇷', 'DE': '🇩🇪', 'GR': '🇬🇷', 'GT': '🇬🇹', 'HU': '🇭🇺',
      'IS': '🇮🇸', 'IN': '🇮🇳', 'ID': '🇮🇩', 'IE': '🇮🇪', 'IL': '🇮🇱',
      'IT': '🇮🇹', 'JP': '🇯🇵', 'KE': '🇰🇪', 'KR': '🇰🇷', 'LV': '🇱🇻',
      'LT': '🇱🇹', 'LU': '🇱🇺', 'MY': '🇲🇾', 'MX': '🇲🇽', 'NL': '🇳🇱',
      'NZ': '🇳🇿', 'NO': '🇳🇴', 'PK': '🇵🇰', 'PE': '🇵🇪', 'PH': '🇵🇭',
      'PL': '🇵🇱', 'PT': '🇵🇹', 'RO': '🇷🇴', 'RU': '🇷🇺', 'SA': '🇸🇦',
      'SG': '🇸🇬', 'SK': '🇸🇰', 'SI': '🇸🇮', 'ZA': '🇿🇦', 'ES': '🇪🇸',
      'SE': '🇸🇪', 'CH': '🇨🇭', 'TH': '🇹🇭', 'TR': '🇹🇷', 'UA': '🇺🇦',
      'AE': '🇦🇪', 'GB': '🇬🇧', 'US': '🇺🇸', 'UY': '🇺🇾', 'VE': '🇻🇪', 'VN': '🇻🇳'
    };
    return flagMap[countryCode] || '🏳️';
  };


  if (loading) {
    return (
      <SectionContainer id={id} data-section={id}>
        <ContentWrapper>
          <HeaderSection>
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
            <Description>{description}</Description>
          </HeaderSection>
          <LoadingMessage>Loading reviews...</LoadingMessage>
        </ContentWrapper>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer id={id} data-section={id}>
      <ContentWrapper>
        <HeaderSection>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
          <Description>{description}</Description>
          <FormButton onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Hide Form' : 'Write a Review'}
          </FormButton>
        </HeaderSection>

        {showForm && (
          <FormSection>
            <ReviewForm onReviewSubmitted={handleReviewSubmitted} />
          </FormSection>
        )}

        {reviews.length === 0 ? (
          <NoReviewsMessage>
            No reviews yet. Be the first to share your experience!
          </NoReviewsMessage>
        ) : (
          <ReviewsGrid>
            {reviews.map((review) => (
              <ReviewCard key={review.id}>
                <ReviewHeader>
                  <ReviewerInfo>
                    <ReviewerName>{review.name}</ReviewerName>
                    {review.countrycode && (
                      <ReviewerNationality>
                        <FlagIcon>{getCountryFlag(review.countrycode)}</FlagIcon>
                        {getCountryName(review.countrycode)}
                      </ReviewerNationality>
                    )}
                  </ReviewerInfo>
                  <ReviewLocation>{review.location}</ReviewLocation>
                </ReviewHeader>
                <StarRating>
                  {renderStars(review.rating)}
                </StarRating>
                <ReviewComment>{review.comment}</ReviewComment>
                <ReviewDate>{formatDate(review.date)}</ReviewDate>
              </ReviewCard>
            ))}
          </ReviewsGrid>
        )}
      </ContentWrapper>
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  padding: 80px 0;
  background: ${GRADIENTS.backgroundAlt};
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: ${TEXT.primary};
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${TEXT.secondary};
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: ${TEXT.muted};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ReviewCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const ReviewerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ReviewerName = styled.h4`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${TEXT.primary};
  margin: 0;
`;

const ReviewerNationality = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: ${TEXT.muted};
  font-weight: 500;
`;

const FlagIcon = styled.span`
  font-size: 1rem;
`;

const ReviewLocation = styled.span`
  font-size: 0.9rem;
  color: ${TEXT.muted};
  font-weight: 500;
`;

const StarRating = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
`;

const Star = styled.span<{ filled: boolean }>`
  color: ${props => props.filled ? '#FFD700' : '#E5E5E5'};
  font-size: 1.2rem;
`;

const ReviewComment = styled.p`
  font-size: 1rem;
  color: ${TEXT.secondary};
  line-height: 1.6;
  margin-bottom: 16px;
  font-style: italic;
`;

const ReviewDate = styled.span`
  font-size: 0.9rem;
  color: ${TEXT.muted};
  font-weight: 500;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.1rem;
  color: ${TEXT.muted};
  padding: 40px 0;
`;

const NoReviewsMessage = styled.div`
  text-align: center;
  font-size: 1.1rem;
  color: ${TEXT.muted};
  padding: 40px 0;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const FormButton = styled.button`
  background: ${GRADIENTS.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  
  &:hover {
    background: #2c5aa0;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(49, 130, 206, 0.3);
  }
`;

const FormSection = styled.div`
  margin: 40px 0;
`;

export default Reviews;