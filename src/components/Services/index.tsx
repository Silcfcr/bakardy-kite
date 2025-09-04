import React, { useState } from "react";
import styled from "styled-components";
import ServicesContent from "../../content/ServicesContent.json";
import { BACKGROUND, TEXT, SECONDARY, ACCENT, GRADIENTS, INTERACTIVE } from "../../styles/colors";

interface Service {
  id: string;
  name: string;
  icon: string;
  duration: string;
  description: string;
  features: string[];
  price: number;
  currency: string;
  popular: boolean;
  bookingLink: string;
}

interface ServicesProps {
  title: string;
  subtitle: string;
  description: string;
  services: Service[];
  id?: string;
}

const Services: React.FC<ServicesProps> = ({ title, subtitle, description, services, id }) => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const handleBooking = (service: Service) => {
    if (service.bookingLink) {
      window.open(service.bookingLink, '_blank');
    }
  };

  return (
    <SectionContainer id={id} data-section={id}>
      <ContentWrapper>
        <HeaderSection>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
          <Description>{description}</Description>
        </HeaderSection>

        <ServicesGrid>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              isPopular={service.popular}
              isHovered={hoveredService === service.id}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {service.popular && <PopularBadge>Most Popular</PopularBadge>}

              <ServiceHeader>
                <ServiceIcon>{service.icon}</ServiceIcon>
                <ServiceInfo>
                  <ServiceName>{service.name}</ServiceName>
                  <ServiceDuration>{service.duration}</ServiceDuration>
                </ServiceInfo>
              </ServiceHeader>

              <ServiceDescription>{service.description}</ServiceDescription>

              <PriceSection>
                <Price>
                  <Currency>{service.currency}</Currency>
                  <Amount>{service.price}</Amount>
                </Price>
              </PriceSection>

              <FeaturesList>
                {service.features.map((feature, index) => (
                  <FeatureItem key={index}>
                    <CheckIcon>✓</CheckIcon>
                    {feature}
                  </FeatureItem>
                ))}
              </FeaturesList>

              <BookingButton
                onClick={() => handleBooking(service)}
                isPopular={service.popular}
              >
                Book Now
              </BookingButton>
            </ServiceCard>
          ))}
        </ServicesGrid>
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ServiceCard = styled.div<{ isPopular: boolean; isHovered: boolean }>`
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  border: 3px solid transparent;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  ${props => props.isPopular && `
    border-color: ${SECONDARY.main};
    transform: scale(1.02);
    box-shadow: 0 8px 30px rgba(49, 130, 206, 0.15);
  `}
  
  ${props => props.isHovered && `
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  `}
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -12px;
  right: 20px;
  background: ${GRADIENTS.primary};
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(49, 130, 206, 0.3);
`;

const ServiceHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  min-height: 100px;
`;

const ServiceIcon = styled.div`
  font-size: 2.5rem;
  margin-right: 16px;
`;

const ServiceInfo = styled.div`
  flex: 1;
`;

const ServiceName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${TEXT.primary};
  margin-bottom: 4px;
`;

const ServiceDuration = styled.p`
  font-size: 0.9rem;
  color: ${TEXT.muted};
  font-weight: 500;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: ${TEXT.secondary};
  line-height: 1.6;
  margin-bottom: 24px;
  min-height: 72px;
  display: flex;
  align-items: flex-start;
`;

const PriceSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
  margin-top: auto;
  padding: 12px 16px;
  background: ${GRADIENTS.backgroundAlt};
  border-radius: 8px;
  flex-shrink: 0;
`;

const Price = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 2px;
`;

const Currency = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${TEXT.secondary};
`;

const Amount = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: ${TEXT.primary};
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 16px;
  flex: 1;
  min-height: 140px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
    min-height: 100px;
  }
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0;
  font-size: 0.9rem;
  color: ${TEXT.secondary};
  line-height: 1.3;
`;

const CheckIcon = styled.span`
  color: ${ACCENT.success};
  font-weight: bold;
  margin-right: 12px;
  font-size: 1.1rem;
`;

const BookingButton = styled.button<{ isPopular: boolean }>`
  width: 100%;
  background: ${props => props.isPopular
    ? GRADIENTS.primary
    : GRADIENTS.primary
  };
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  
  &:hover {
    background: ${INTERACTIVE.hover};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export default Services;
