import React from "react";
import styled from "styled-components";
import { TEXT, GRADIENTS, INTERACTIVE } from "../../styles/colors";

interface Highlight {
    id: string;
    title: string;
    description: string;
    icon: string;
}

interface HighlightsProps {
    title: string;
    subtitle: string;
    description: string;
    highlights: Highlight[];
    id?: string;
}

const Highlights: React.FC<HighlightsProps> = ({ title, subtitle, description, highlights, id }) => {
    return (
        <SectionContainer id={id} data-section={id}>
            <ContentWrapper>
                <HeaderSection>
                    <Title>{title}</Title>
                    <Subtitle>{subtitle}</Subtitle>
                    <Description>{description}</Description>
                </HeaderSection>

                <HighlightsGrid>
                    {highlights.map((highlight) => (
                        <HighlightCard key={highlight.id}>
                            <IconContainer>
                                <Icon>{highlight.icon}</Icon>
                            </IconContainer>
                            <HighlightContent>
                                <HighlightTitle>{highlight.title}</HighlightTitle>
                                <HighlightDescription>{highlight.description}</HighlightDescription>
                            </HighlightContent>
                        </HighlightCard>
                    ))}
                </HighlightsGrid>
            </ContentWrapper>
        </SectionContainer>
    );
};

const SectionContainer = styled.section`
  padding: 60px 0;
  background: ${GRADIENTS.background};
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${TEXT.primary};
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${TEXT.secondary};
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${TEXT.muted};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const HighlightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const HighlightCard = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
`;

const IconContainer = styled.div`
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background: ${GRADIENTS.background};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  border: 2px solid ${INTERACTIVE.hover};
`;

const Icon = styled.div`
  font-size: 1.8rem;
`;

const HighlightContent = styled.div`
  flex: 1;
`;

const HighlightTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${TEXT.primary};
  margin-bottom: 8px;
  line-height: 1.3;
`;

const HighlightDescription = styled.p`
  font-size: 0.95rem;
  color: ${TEXT.secondary};
  line-height: 1.5;
  margin: 0;
`;

export default Highlights;
