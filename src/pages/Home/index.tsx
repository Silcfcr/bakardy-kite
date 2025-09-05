import { lazy } from "react";
import IntroContent from "../../content/IntroContent.json";
import ContactContent from "../../content/ContactContent.json";
import ScheduleContent from "../../content/ScheduleContent.json";
import ServicesContent from "../../content/ServicesContent.json";
import HighlightsContent from "../../content/HighlightsContent.json";
import GalleryContent from "../../content/GalleryContent.json";

const Contact = lazy(() => import("../../components/ContactForm"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const WhatsAppButton = lazy(() => import("../../components/WhatsAppButton"));
const Schedule = lazy(() => import("../../components/Schedule"));
const Services = lazy(() => import("../../components/Services"));
const Highlights = lazy(() => import("../../components/Highlights"));
const Gallery = lazy(() => import("../../components/Gallery"));

const Home = () => {
  return (
    <Container>
      <ScrollToTop />
      <ContentBlock
        direction="right"
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        icon="/Bakar.png"
        id="intro"
      />
      <Services
        title={ServicesContent.title}
        subtitle={ServicesContent.subtitle}
        description={ServicesContent.description}
        services={ServicesContent.services}
        id="services"
      />
      <Gallery
        instagramHandle={GalleryContent.instagramHandle}
        instagramLink={GalleryContent.instagramLink}
        posts={GalleryContent.posts}
        id="gallery"
      />
      <Schedule
        title={ScheduleContent.title}
        subtitle={ScheduleContent.subtitle}
        description={ScheduleContent.description}
        locations={ScheduleContent.locations}
        id="schedule"
      />
      <Highlights
        title={HighlightsContent.title}
        subtitle={HighlightsContent.subtitle}
        description={HighlightsContent.description}
        highlights={HighlightsContent.highlights}
        id="highlights"
      />
      <Contact
        title={ContactContent.title}
        content={ContactContent.text}
        button={ContactContent.button}
        id="contact"
      />
      <WhatsAppButton
        phoneNumber="201067685898"
        message="Hello! I'd like to get in touch about your services."
      />
    </Container>
  );
};

export default Home;
