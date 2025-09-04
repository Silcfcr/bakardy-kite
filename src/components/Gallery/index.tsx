import React, { useState } from "react";
import styled from "styled-components";
import GalleryContent from "../../content/GalleryContent.json";
import { BACKGROUND, INSTAGRAM, GRADIENTS, TEXT, BORDER } from "../../styles/colors";

interface InstagramPost {
    id: string;
    imageUrl: string;
    caption: string;
    postUrl: string;
}

interface GalleryProps {
    instagramHandle: string;
    instagramLink: string;
    posts: InstagramPost[];
    id?: string;
}

const Gallery: React.FC<GalleryProps> = ({
    instagramHandle,
    instagramLink,
    posts,
    id
}) => {
    const handleInstagramClick = () => {
        if (instagramLink) {
            window.open(instagramLink, '_blank');
        }
    };

    const handlePostClick = (postUrl: string) => {
        window.open(postUrl, '_blank');
    };

    return (
        <SectionContainer id={id} data-section={id}>
            <ContentWrapper>
                <HeaderSection>
                    <InstagramCTA onClick={handleInstagramClick}>
                        <InstagramIcon>📸</InstagramIcon>
                        Follow {instagramHandle} on Instagram
                        <ArrowIcon>→</ArrowIcon>
                    </InstagramCTA>
                </HeaderSection>

                <GalleryGrid>
                    {posts.map((post) => (
                        <PostContainer key={post.id} onClick={() => handlePostClick(post.postUrl)}>
                            <PostImage
                                src={post.imageUrl}
                                alt={post.caption}
                                loading="lazy"
                            />
                            <PostCaption>{post.caption}</PostCaption>
                        </PostContainer>
                    ))}
                </GalleryGrid>
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
  margin-bottom: 50px;
`;



const InstagramCTA = styled.button`
  background: ${GRADIENTS.instagram};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(225, 48, 108, 0.3);
  }
`;

const InstagramIcon = styled.span`
  font-size: 1.2rem;
`;

const ArrowIcon = styled.span`
  font-size: 1.1rem;
  transition: transform 0.3s ease;
  
  ${InstagramCTA}:hover & {
    transform: translateX(4px);
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
`;

const PostContainer = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  aspect-ratio: 1;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${PostContainer}:hover & {
    transform: scale(1.05);
  }
`;

const PostCaption = styled.div`
  padding: 16px;
  background: white;
  font-size: 0.9rem;
  color: #4a5568;
  text-align: center;
  font-weight: 500;
  border-top: 1px solid ${BORDER.light};
`;

const BottomCTA = styled.div`
  text-align: center;
`;

const InstagramButton = styled.button`
  background: ${GRADIENTS.instagram};
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(225, 48, 108, 0.4);
  }
`;

export default Gallery;
