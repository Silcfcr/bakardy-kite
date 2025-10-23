import { lazy, Suspense, useEffect, useState } from "react";
import { WHATSAPP_CONFIG } from "../../config/constants";
import Container from "../../common/Container";
import ScrollToTop from "../../common/ScrollToTop";
import ContentBlock from "../../components/ContentBlock";

// Inline critical content to avoid render blocking
const INTRO_CONTENT = {
  title: "Welcome to Bakardy Kite",
  text: "Professional kitesurfing lessons with IKO certified instructor. Learn to kite in the beautiful waters of El Gouna and worldwide locations.",
  button: [
    {
      title: "Book a Lesson",
      color: "#3182ce",
      textColor: "white"
    },
    {
      title: "More Information",
      color: "transparent",
      textColor: "#3182ce"
    }
  ]
};

// Type definition for content data
interface ContentData {
  ContactContent: any;
  ServicesContent: any;
  HighlightsContent: any;
  GalleryContent: any;
  WorldMapContent: any;
  ReviewsContent: any;
}

// Non-critical components - lazy load with intersection observer
const Contact = lazy(() => import("../../components/ContactForm"));
const WhatsAppButton = lazy(() => import("../../components/WhatsAppButton"));
const Services = lazy(() => import("../../components/Services"));
const Highlights = lazy(() => import("../../components/Highlights"));
const Gallery = lazy(() => import("../../components/Gallery"));
const WorldMap = lazy(() => import("../../components/WorldMap/index"));
const Reviews = lazy(() => import("../../components/Reviews"));
const Footer = lazy(() => import("../../components/Footer"));

// Optimized loading component
const LoadingSpinner = () => (
  <div style={{
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: '500'
  }}>
    Loading...
  </div>
);

const Home = () => {
  const [contentData, setContentData] = useState<ContentData | null>(null);

  // Load content asynchronously to avoid render blocking
  useEffect(() => {
    const loadContent = async () => {
      try {
        const [
          ContactContent,
          ServicesContent,
          HighlightsContent,
          GalleryContent,
          WorldMapContent,
          ReviewsContent
        ] = await Promise.all([
          import("../../content/ContactContent.json"),
          import("../../content/ServicesContent.json"),
          import("../../content/HighlightsContent.json"),
          import("../../content/GalleryContent.json"),
          import("../../content/WorldMapContent.json"),
          import("../../content/ReviewsContent.json")
        ]);

        setContentData({
          ContactContent: ContactContent.default,
          ServicesContent: ServicesContent.default,
          HighlightsContent: HighlightsContent.default,
          GalleryContent: GalleryContent.default,
          WorldMapContent: WorldMapContent.default,
          ReviewsContent: ReviewsContent.default
        });
      } catch (error) {
        console.error('Error loading content:', error);
      }
    };

    // Load content after initial render
    const timer = setTimeout(loadContent, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <ScrollToTop />
      <ContentBlock
        direction="right"
        title={INTRO_CONTENT.title}
        content={INTRO_CONTENT.text}
        button={INTRO_CONTENT.button}
        icon="/img/Bakar.jpeg"
        id="intro"
      />
      {contentData && (
        <>
          <Suspense fallback={<LoadingSpinner />}>
            <Services
              title={contentData.ServicesContent.title}
              subtitle={contentData.ServicesContent.subtitle}
              description={contentData.ServicesContent.description}
              services={contentData.ServicesContent.services}
              id="services"
            />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <Gallery
              instagramHandle={contentData.GalleryContent.instagramHandle}
              instagramLink={contentData.GalleryContent.instagramLink}
              posts={contentData.GalleryContent.posts}
              id="gallery"
            />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <Highlights
              title={contentData.HighlightsContent.title}
              subtitle={contentData.HighlightsContent.subtitle}
              description={contentData.HighlightsContent.description}
              highlights={contentData.HighlightsContent.highlights}
              id="highlights"
            />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <WorldMap
              title={contentData.WorldMapContent.title}
              subtitle={contentData.WorldMapContent.subtitle}
              description={contentData.WorldMapContent.description}
              locations={contentData.WorldMapContent.locations}
              id="schedule"
            />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <Reviews
              title={contentData.ReviewsContent.title}
              subtitle={contentData.ReviewsContent.subtitle}
              description={contentData.ReviewsContent.description}
              id="reviews"
            />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <Contact
              title={contentData.ContactContent.title}
              content={contentData.ContactContent.text}
              button={contentData.ContactContent.button}
              id="contact"
            />
          </Suspense>
        </>
      )}
      <Suspense fallback={null}>
        <WhatsAppButton
          phoneNumber={WHATSAPP_CONFIG.PHONE_NUMBER}
          message={WHATSAPP_CONFIG.DEFAULT_MESSAGE}
        />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </Container>
  );
};

export default Home;
