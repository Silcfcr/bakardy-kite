import React, { useState } from "react";
import styled from "styled-components";
import ScheduleContent from "../../content/ScheduleContent.json";
import { BACKGROUND, TEXT, SECONDARY, ACCENT, GRADIENTS, BORDER, NEUTRAL, INTERACTIVE, PRIMARY } from "../../styles/colors";

interface Location {
    month: string;
    city: string;
    country: string;
    dates: string;
    description: string;
    available: boolean;
    bookingLink: string | null;
    kiteSchool: string;
}

interface ScheduleProps {
    title: string;
    subtitle: string;
    description: string;
    locations: Location[];
    id?: string;
}

const Schedule: React.FC<ScheduleProps> = ({ title, subtitle, description, locations, id }) => {
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

    const handleLocationClick = (location: Location) => {
        setSelectedLocation(selectedLocation?.month === location.month ? null : location);
    };

    const handleBooking = (location: Location) => {
        if (location.bookingLink) {
            window.open(location.bookingLink, '_blank');
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

                <TimelineContainer>
                    {locations.map((location, index) => (
                        <TimelineItem key={location.month} isEven={index % 2 === 0}>
                            <TimelineDot
                                isActive={location.available}
                                onClick={() => handleLocationClick(location)}
                            >
                                <Month>{location.month.split(' ')[0]}</Month>
                                <Year>{location.month.split(' ')[1]}</Year>
                            </TimelineDot>

                            <LocationCard
                                isExpanded={selectedLocation?.month === location.month}
                                isEven={index % 2 === 0}
                            >
                                <LocationHeader>
                                    <LocationInfo>
                                        <City>{location.city}</City>
                                        <Country>{location.country}</Country>
                                        <Dates>{location.dates}</Dates>
                                    </LocationInfo>
                                    <StatusBadge isAvailable={location.available}>
                                        {location.available ? 'Available' : 'Fully Booked'}
                                    </StatusBadge>
                                </LocationHeader>

                                <LocationDescription>{location.description}</LocationDescription>

                                <KiteSchoolInfo>
                                    <KiteSchoolLabel>🏄‍♂️ Kite School:</KiteSchoolLabel>
                                    <KiteSchoolName>{location.kiteSchool}</KiteSchoolName>
                                </KiteSchoolInfo>

                                {location.available && location.bookingLink && (
                                    <BookingButton onClick={() => handleBooking(location)}>
                                        Book a Session
                                    </BookingButton>
                                )}
                            </LocationCard>
                        </TimelineItem>
                    ))}
                </TimelineContainer>
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

const TimelineContainer = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(180deg, #3182ce 0%, #63b3ed 50%, #3182ce 100%);
    transform: translateX(-50%);
    
    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled.div<{ isEven: boolean }>`
  position: relative;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  
  ${props => props.isEven ? `
    flex-direction: row;
    .location-card {
      margin-left: 50px;
    }
  ` : `
    flex-direction: row-reverse;
    .location-card {
      margin-right: 50px;
    }
  `}
  
  @media (max-width: 768px) {
    flex-direction: row !important;
    .location-card {
      margin-left: 70px !important;
      margin-right: 0 !important;
    }
  }
`;

const TimelineDot = styled.div<{ isActive: boolean }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${props => props.isActive ? INTERACTIVE.hover : NEUTRAL.mediumGray};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 2;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Month = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  text-align: center;
  line-height: 1.1;
  max-width: 90px;
  word-wrap: break-word;
`;

const Year = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
  margin-top: 2px;
`;



const LocationCard = styled.div<{ isExpanded: boolean; isEven: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  max-width: 400px;
  border: 2px solid transparent;
  position: relative;
  z-index: 1;
  
  ${props => props.isExpanded && `
    border-color: ${SECONDARY.main};
    transform: scale(1.02);
    box-shadow: 0 8px 30px rgba(49, 130, 206, 0.2);
    z-index: 2;
  `}
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  }
`;

const LocationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const LocationInfo = styled.div`
  flex: 1;
`;

const City = styled.h4`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${TEXT.primary};
  margin-bottom: 4px;
`;

const Country = styled.p`
  font-size: 1rem;
  color: ${TEXT.secondary};
  margin-bottom: 4px;
`;

const Dates = styled.p`
  font-size: 0.9rem;
  color: ${TEXT.muted};
  font-weight: 500;
`;

const StatusBadge = styled.span<{ isAvailable: boolean }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => props.isAvailable ? ACCENT.successLight : ACCENT.errorLight};
  color: ${props => props.isAvailable ? ACCENT.successDark : ACCENT.errorDark};
`;

const LocationDescription = styled.p`
  font-size: 1rem;
  color: ${TEXT.secondary};
  line-height: 1.6;
  margin-bottom: 20px;
`;

const KiteSchoolInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 12px;
  background: ${GRADIENTS.background};
  border-radius: 8px;
  border-left: 4px solid ${BORDER.accent};
`;

const KiteSchoolLabel = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${TEXT.primary};
  margin-right: 8px;
`;

const KiteSchoolName = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${TEXT.secondary};
`;

const BookingButton = styled.button`
  background: ${GRADIENTS.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${INTERACTIVE.hover};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(49, 130, 206, 0.3);
  }
`;

export default Schedule;
