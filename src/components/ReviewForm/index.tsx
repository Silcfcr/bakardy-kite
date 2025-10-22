import React, { useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../../config/supabase';
import { TEXT, PRIMARY, GRADIENTS, INTERACTIVE } from '../../styles/colors';

interface ReviewFormProps {
  onReviewSubmitted?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onReviewSubmitted }) => {
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: '',
    location: '',
    countrycode: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validate all required fields
    if (!formData.name || !formData.location || !formData.countrycode || !formData.date || !formData.comment) {
      setError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('reviews')
        .insert([{
          name: formData.name,
          rating: formData.rating,
          comment: formData.comment,
          location: formData.location,
          countrycode: formData.countrycode,
          date: formData.date,
          approved: true // Default to approved for immediate display
        }]);

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        rating: 5,
        comment: '',
        location: '',
        countrycode: '',
        date: new Date().toISOString().split('T')[0]
      });

      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error: any) {
      setError(error.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        filled={index < rating}
        interactive={interactive}
        onClick={() => interactive && setFormData(prev => ({ ...prev, rating: index + 1 }))}
      >
        ★
      </Star>
    ));
  };

  if (isSubmitted) {
    return (
      <FormContainer>
        <SuccessMessage>
          <SuccessIcon>✓</SuccessIcon>
          <SuccessTitle>Thank you for your review!</SuccessTitle>
          <SuccessText>
            Your review has been submitted and will be published after approval.
          </SuccessText>
        </SuccessMessage>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <FormTitle>Share Your Experience</FormTitle>
      <FormSubtitle>Help others discover great kitesurfing lessons</FormSubtitle>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Your Name *</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter your name"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="countrycode">Nationality</Label>
          <Select
            id="countrycode"
            name="countrycode"
            value={formData.countrycode}
            onChange={handleInputChange}
            required
          >
            <option value="">Select your nationality</option>
            <option value="AF">Afghanistan</option>
            <option value="AL">Albania</option>
            <option value="DZ">Algeria</option>
            <option value="AR">Argentina</option>
            <option value="AU">Australia</option>
            <option value="AT">Austria</option>
            <option value="BD">Bangladesh</option>
            <option value="BE">Belgium</option>
            <option value="BR">Brazil</option>
            <option value="BG">Bulgaria</option>
            <option value="CA">Canada</option>
            <option value="CL">Chile</option>
            <option value="CN">China</option>
            <option value="CO">Colombia</option>
            <option value="CR">Costa Rica</option>
            <option value="HR">Croatia</option>
            <option value="CZ">Czech Republic</option>
            <option value="DK">Denmark</option>
            <option value="EG">Egypt</option>
            <option value="FI">Finland</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
            <option value="GR">Greece</option>
            <option value="GT">Guatemala</option>
            <option value="HU">Hungary</option>
            <option value="IS">Iceland</option>
            <option value="IN">India</option>
            <option value="ID">Indonesia</option>
            <option value="IE">Ireland</option>
            <option value="IL">Israel</option>
            <option value="IT">Italy</option>
            <option value="JP">Japan</option>
            <option value="KE">Kenya</option>
            <option value="KR">South Korea</option>
            <option value="LV">Latvia</option>
            <option value="LT">Lithuania</option>
            <option value="LU">Luxembourg</option>
            <option value="MY">Malaysia</option>
            <option value="MX">Mexico</option>
            <option value="NL">Netherlands</option>
            <option value="NZ">New Zealand</option>
            <option value="NO">Norway</option>
            <option value="PK">Pakistan</option>
            <option value="PE">Peru</option>
            <option value="PH">Philippines</option>
            <option value="PL">Poland</option>
            <option value="PT">Portugal</option>
            <option value="RO">Romania</option>
            <option value="RU">Russia</option>
            <option value="SA">Saudi Arabia</option>
            <option value="SG">Singapore</option>
            <option value="SK">Slovakia</option>
            <option value="SI">Slovenia</option>
            <option value="ZA">South Africa</option>
            <option value="ES">Spain</option>
            <option value="SE">Sweden</option>
            <option value="CH">Switzerland</option>
            <option value="TH">Thailand</option>
            <option value="TR">Turkey</option>
            <option value="UA">Ukraine</option>
            <option value="AE">United Arab Emirates</option>
            <option value="GB">United Kingdom</option>
            <option value="US">United States</option>
            <option value="UY">Uruguay</option>
            <option value="VE">Venezuela</option>
            <option value="VN">Vietnam</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="location">Location *</Label>
          <Input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            placeholder="Where did you take the lesson? (e.g., El Gouna, Egypt)"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="date">Date of Lesson *</Label>
          <Input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Rating *</Label>
          <StarContainer>
            {renderStars(formData.rating, true)}
            <RatingText>{formData.rating} star{formData.rating !== 1 ? 's' : ''}</RatingText>
          </StarContainer>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="comment">Your Review *</Label>
          <TextArea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            required
            placeholder="Tell us about your experience with Bakar's kitesurfing lessons..."
            rows={4}
          />
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

const FormTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: ${TEXT.primary};
  margin-bottom: 8px;
  text-align: center;
`;

const FormSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${TEXT.muted};
  text-align: center;
  margin-bottom: 32px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: ${TEXT.primary};
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${PRIMARY.main};
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${PRIMARY.main};
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${PRIMARY.main};
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Star = styled.span<{ filled: boolean; interactive?: boolean }>`
  color: ${props => props.filled ? '#FFD700' : '#E5E5E5'};
  font-size: 1.5rem;
  cursor: ${props => props.interactive ? 'pointer' : 'default'};
  transition: all 0.2s ease;
  
  ${props => props.interactive && `
    &:hover {
      transform: scale(1.1);
    }
  `}
`;

const RatingText = styled.span`
  font-size: 1rem;
  color: ${TEXT.secondary};
  font-weight: 500;
`;

const SubmitButton = styled.button`
  background: ${GRADIENTS.primary};
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 16px;
  
  &:hover:not(:disabled) {
    background: ${INTERACTIVE.hover};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  border: 1px solid #fcc;
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
`;

const SuccessIcon = styled.div`
  font-size: 4rem;
  color: #4CAF50;
  margin-bottom: 16px;
`;

const SuccessTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${TEXT.primary};
  margin-bottom: 8px;
`;

const SuccessText = styled.p`
  font-size: 1rem;
  color: ${TEXT.muted};
  line-height: 1.6;
`;


export default ReviewForm;
