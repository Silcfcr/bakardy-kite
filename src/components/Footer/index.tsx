import React from 'react';
import styled from 'styled-components';
import { TEXT, GRADIENTS } from '../../styles/colors';
import VisitorCounter from '../VisitorCounter';

interface FooterProps {
  id?: string;
}

const Footer: React.FC<FooterProps> = ({ id }) => {
  return (
    <FooterContainer id={id}>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Bakardy Kite</FooterTitle>
          <FooterText>
            Professional kitesurfing instruction.
            Learn to kite with experienced guidance and safety-first approach.
          </FooterText>
        </FooterSection>

        <FooterSection>
          <FooterSubtitle>Quick Links</FooterSubtitle>
          <FooterLinks>
            <FooterLink href="#intro">About</FooterLink>
            <FooterLink href="#services">Services</FooterLink>
            <FooterLink href="#worldmap">Locations</FooterLink>
            <FooterLink href="#reviews">Reviews</FooterLink>
            <FooterLink href="#contact">Contact</FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterSubtitle>Contact Info</FooterSubtitle>
          <FooterContact>
            <ContactItem>
              <ContactIcon>@</ContactIcon>
              alaswanybakar2@gmail.com
            </ContactItem>
            <ContactItem>
              <ContactIcon>📞</ContactIcon>
              +201067685898
            </ContactItem>
          </FooterContact>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <FooterCopyright>
          © 2025 Bakardy Kite. All rights reserved.
        </FooterCopyright>
        <FooterCounter>
          <VisitorCounter />
        </FooterCounter>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background: ${GRADIENTS.backgroundAlt};
  padding: 60px 0 20px;
  margin-top: 80px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 0 15px;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FooterTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${TEXT.primary};
  margin: 0;
`;

const FooterSubtitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${TEXT.secondary};
  margin: 0;
`;

const FooterText = styled.p`
  font-size: 0.95rem;
  color: ${TEXT.muted};
  line-height: 1.6;
  margin: 0;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FooterLink = styled.a`
  color: ${TEXT.muted};
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${TEXT.primary};
  }
`;

const FooterContact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ContactItem = styled.span`
  color: ${TEXT.muted};
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ContactIcon = styled.span`
  color: ${TEXT.primary};
  font-size: 1.1rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: rgba(49, 130, 206, 0.1);
  border-radius: 50%;
  flex-shrink: 0;
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    text-align: center;
    padding: 0 15px;
  }
`;

const FooterCopyright = styled.p`
  color: ${TEXT.muted};
  font-size: 0.9rem;
  margin: 0;
`;

const FooterCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Footer;