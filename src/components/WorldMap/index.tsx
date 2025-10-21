import React, { useState } from "react";
import styled from "styled-components";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { TEXT, GRADIENTS, INTERACTIVE, PRIMARY } from "../../styles/colors";
import { WHATSAPP_CONFIG } from "../../config/constants";

interface Location {
  id: string;
  name: string;
  coordinates: number[];
  dateRange: string;
  description: string;
  image: string;
  features: string[];
}

interface WorldMapProps {
  title: string;
  subtitle: string;
  description: string;
  locations: Location[];
  id?: string;
}

const WorldMap: React.FC<WorldMapProps> = ({ title, subtitle, description, locations, id }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleMarkerClick = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleBookLesson = (location: Location) => {
    if (location.id === "el-gouna") {
      // Redirect to Makani booking system for El Gouna
      window.open("https://makani.kitehub.eu/booking/", "_blank");
    } else if (location.id === "thailand") {
      // Redirect to Kite Club Koh Phangan for Thailand
      window.open("https://kiteclubkohphangan.com/", "_blank");
    } else {
      // Use WhatsApp for other locations
      const message = `Hi! I'd like to book a kitesurf lesson in ${location.name}. ${location.dateRange}`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
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

        <MapContainer>
          <StyledComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: window.innerWidth < 768 ? 180 : 140,
              center: window.innerWidth < 768 ? [60, 15] : [0, 20]
            }}
            width={800}
            height={400}
          >
            <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo: any) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#e8f4f8"
                    stroke="#d1e7dd"
                    strokeWidth={0.5}
                    style={{
                      default: {
                        fill: "#e8f4f8",
                        stroke: "#d1e7dd",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: "#d1e7dd",
                        stroke: "#d1e7dd",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      pressed: {
                        fill: "#d1e7dd",
                        stroke: "#d1e7dd",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Location markers */}
            {locations.map((location) => (
              <Marker
                key={location.id}
                coordinates={location.coordinates as [number, number]}
                onClick={() => handleMarkerClick(location)}
              >
                <MarkerGroup>
                  <MarkerCircle
                    fill={selectedLocation?.id === location.id ? PRIMARY.main : INTERACTIVE.hover}
                    stroke="white"
                    strokeWidth={window.innerWidth < 768 ? 3 : 2}
                    r={window.innerWidth < 768 ? 10 : 8}
                  />
                  <MarkerInner
                    fill="white"
                    r={window.innerWidth < 768 ? 5 : 4}
                  />
                </MarkerGroup>
              </Marker>
            ))}
          </StyledComposableMap>

          {/* Location cards */}
          {selectedLocation && (
            <LocationCard>
              <CloseButton onClick={() => setSelectedLocation(null)}>
                ×
              </CloseButton>
              <CardHeader>
                <LocationName>{selectedLocation.name}</LocationName>
                <DateRange>{selectedLocation.dateRange}</DateRange>
              </CardHeader>
              <LocationDescription>{selectedLocation.description}</LocationDescription>
              <FeaturesList>
                {selectedLocation.features.map((feature, index) => (
                  <FeatureItem key={index}>{feature}</FeatureItem>
                ))}
              </FeaturesList>
              <BookButton onClick={() => handleBookLesson(selectedLocation)}>
                Book a Lesson
              </BookButton>
            </LocationCard>
          )}
        </MapContainer>
      </ContentWrapper>
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  padding: 60px 0;
  background: ${GRADIENTS.background};
  
  @media (max-width: 768px) {
    padding: 40px 0;
  }
  
  @media (max-width: 480px) {
    padding: 30px 0;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 15px;
  }
  
  @media (max-width: 480px) {
    padding: 0 10px;
  }
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

const MapContainer = styled.div`
  position: relative;
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  border-radius: 20px;
  padding: 40px;
  margin: 40px 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 20px;
    margin: 20px 0;
    border-radius: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 15px;
    margin: 15px 0;
    border-radius: 12px;
  }
`;

const StyledComposableMap = styled(ComposableMap)`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  
  @media (max-width: 768px) {
    height: 300px;
    border-radius: 8px;
  }
  
  @media (max-width: 480px) {
    height: 250px;
    border-radius: 6px;
  }
`;

const MarkerGroup = styled.g`
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const MarkerCircle = styled.circle`
  transition: all 0.3s ease;
`;

const MarkerInner = styled.circle`
  transition: all 0.3s ease;
`;

const LocationCard = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  max-width: 350px;
  z-index: 10;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    right: auto;
    margin-top: 20px;
    max-width: 100%;
    padding: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
    margin-top: 15px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 24px;
  color: ${TEXT.muted};
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: ${TEXT.muted};
    color: white;
    transform: scale(1.1);
  }
`;

const CardHeader = styled.div`
  margin-bottom: 16px;
`;

const LocationName = styled.h4`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${TEXT.primary};
  margin-bottom: 4px;
`;

const DateRange = styled.p`
  font-size: 0.9rem;
  color: ${TEXT.secondary};
  font-weight: 600;
  margin: 0;
  white-space: pre-line;
`;

const LocationDescription = styled.p`
  font-size: 0.95rem;
  color: ${TEXT.muted};
  line-height: 1.5;
  margin-bottom: 16px;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
`;

const FeatureItem = styled.li`
  font-size: 0.9rem;
  color: ${TEXT.secondary};
  margin-bottom: 6px;
  padding-left: 16px;
  position: relative;

  &::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: ${PRIMARY.main};
    font-weight: bold;
  }
`;

const BookButton = styled.button`
  background: ${PRIMARY.main};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: ${INTERACTIVE.hover};
    transform: translateY(-2px);
  }
`;

export default WorldMap;