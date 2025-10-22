import { useState } from "react";
import { Row, Col, Drawer } from "antd";
import { withTranslation, TFunction } from "react-i18next";
import Container from "../../common/Container";
import { Button } from "../../common/Button";
import {
  HeaderSection,
  LogoContainer,
  LogoText,
  Burger,
  NotHidden,
  Menu,
  CustomNavLinkSmall,
  Label,
  Outline,
  Span,
} from "./styles";

const Header = ({ t }: { t: TFunction }) => {
  const [visible, setVisibility] = useState(false);

  const toggleButton = () => {
    setVisibility(!visible);
  };

  const MenuItem = () => {
    const scrollTo = (id: string) => {
      console.log(`Attempting to scroll to: ${id}`);

      // Function to attempt scrolling
      const attemptScroll = () => {
        // Try multiple approaches to find the element
        let element = document.getElementById(id);

        if (!element) {
          // Try querySelector as fallback
          element = document.querySelector(`[id="${id}"]`);
        }

        if (!element) {
          // Try to find by data attribute
          element = document.querySelector(`[data-section="${id}"]`);
        }

        console.log(`Element found:`, element);

        if (element) {
          try {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest"
            });
            setVisibility(false);
            return true;
          } catch (error) {
            console.error("Scroll error:", error);
            // Fallback to manual scroll
            window.scrollTo({
              top: element.offsetTop - 100,
              behavior: "smooth"
            });
            setVisibility(false);
            return true;
          }
        }
        return false;
      };

      // Try immediately
      if (attemptScroll()) return;

      // If not found, wait a bit and try again (for lazy-loaded components)
      setTimeout(() => {
        if (attemptScroll()) return;

        // Final attempt with longer delay
        setTimeout(() => {
          if (attemptScroll()) return;

          // Last resort - log all available elements
          console.log("All elements with IDs:",
            Array.from(document.querySelectorAll('[id]')).map(el => ({ id: el.id, tagName: el.tagName, visible: (el as HTMLElement).offsetParent !== null }))
          );
          console.log("All elements with data-section:",
            Array.from(document.querySelectorAll('[data-section]')).map(el => ({ section: el.getAttribute('data-section'), tagName: el.tagName, visible: (el as HTMLElement).offsetParent !== null }))
          );
        }, 500);
      }, 100);
    };
    return (
      <>
        <CustomNavLinkSmall onClick={() => scrollTo("intro")}>
          <Span>{t("Home")}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo("services")}>
          <Span>{t("Services")}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo("gallery")}>
          <Span>{t("Gallery")}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo("highlights")}>
          <Span>{t("Highlights")}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo("schedule")}>
          <Span>{t("My Locations")}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo("reviews")}>
          <Span>{t("Reviews")}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall
          style={{ width: "120px" }}
          onClick={() => scrollTo("contact")}
        >
          <Span>
            <Button>{t("Contact")}</Button>
          </Span>
        </CustomNavLinkSmall>
      </>
    );
  };

  return (
    <HeaderSection>
      <Container>
        <Row justify="space-between">
          <LogoContainer to="/" aria-label="homepage">
            <LogoText>Bakardy Kite</LogoText>
          </LogoContainer>
          <NotHidden>
            <MenuItem />
          </NotHidden>
          <Burger onClick={toggleButton}>
            <Outline />
          </Burger>
        </Row>
        <Drawer closable={false} open={visible} onClose={toggleButton}>
          <Col style={{ marginBottom: "2.5rem" }}>
            <Label onClick={toggleButton}>
              <Col span={12}>
                <Menu>Menu</Menu>
              </Col>
              <Col span={12}>
                <Outline />
              </Col>
            </Label>
          </Col>
          <MenuItem />
        </Drawer>
      </Container>
    </HeaderSection>
  );
};

export default withTranslation()(Header);
