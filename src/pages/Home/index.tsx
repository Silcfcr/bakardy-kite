import { lazy, Suspense, useEffect } from "react";
import IntroContent from "../../content/IntroContent.json";
import ContactContent from "../../content/ContactContent.json";
import ServicesContent from "../../content/ServicesContent.json";
import HighlightsContent from "../../content/HighlightsContent.json";
import GalleryContent from "../../content/GalleryContent.json";
import WorldMapContent from "../../content/WorldMapContent.json";
import ReviewsContent from "../../content/ReviewsContent.json";
import { WHATSAPP_CONFIG } from "../../config/constants";

// Critical components - load immediately
import Container from "../../common/Container";
import ScrollToTop from "../../common/ScrollToTop";
import ContentBlock from "../../components/ContentBlock";

// Non-critical components - lazy load with preloading
const Contact = lazy(() => import("../../components/ContactForm"));
const WhatsAppButton = lazy(() => import("../../components/WhatsAppButton"));
const Services = lazy(() => import("../../components/Services"));
const Highlights = lazy(() => import("../../components/Highlights"));
const Gallery = lazy(() => import("../../components/Gallery"));
const WorldMap = lazy(() => import("../../components/WorldMap/index"));
const Reviews = lazy(() => import("../../components/Reviews"));

// Preload non-critical components after initial render
const preloadComponents = () => {
  import("../../components/ContactForm");
  import("../../components/WhatsAppButton");
  import("../../components/Services");
  import("../../components/Highlights");
  import("../../components/Gallery");
  import("../../components/WorldMap/index");
  import("../../components/Reviews");
};

const Home = () => {
  // Preload components after initial render
  useEffect(() => {
    const timer = setTimeout(preloadComponents, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <ScrollToTop />
      <ContentBlock
        direction="right"
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        icon="/img/Bakar.jpeg"
        id="intro"
      />
      <Suspense fallback={<div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
        <Services
          title={ServicesContent.title}
          subtitle={ServicesContent.subtitle}
          description={ServicesContent.description}
          services={ServicesContent.services}
          id="services"
        />
      </Suspense>
      <Suspense fallback={<div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
        <Gallery
          instagramHandle={GalleryContent.instagramHandle}
          instagramLink={GalleryContent.instagramLink}
          posts={GalleryContent.posts}
          id="gallery"
        />
      </Suspense>
      <Suspense fallback={<div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
        <Highlights
          title={HighlightsContent.title}
          subtitle={HighlightsContent.subtitle}
          description={HighlightsContent.description}
          highlights={HighlightsContent.highlights}
          id="highlights"
        />
      </Suspense>
      <Suspense fallback={<div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
        <WorldMap
          title={WorldMapContent.title}
          subtitle={WorldMapContent.subtitle}
          description={WorldMapContent.description}
          locations={WorldMapContent.locations}
          id="schedule"
        />
      </Suspense>
      <Suspense fallback={<div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
        <Reviews
          title={ReviewsContent.title}
          subtitle={ReviewsContent.subtitle}
          description={ReviewsContent.description}
          id="reviews"
        />
      </Suspense>
      <Suspense fallback={<div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
        <Contact
          title={ContactContent.title}
          content={ContactContent.text}
          button={ContactContent.button}
          id="contact"
        />
      </Suspense>
      <Suspense fallback={null}>
        <WhatsAppButton
          phoneNumber={WHATSAPP_CONFIG.PHONE_NUMBER}
          message={WHATSAPP_CONFIG.DEFAULT_MESSAGE}
        />
      </Suspense>
    </Container>
  );
};

export default Home;
