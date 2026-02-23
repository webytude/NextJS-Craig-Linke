"use client";

import MediaRenderer from "@/components/common/MediaRenderer";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import FadeUp from "@/components/ui/animations/FadeUp";
import SlideRight from "@/components/ui/animations/SlideRight";
import Box from "@/components/ui/Box/Box";
import Divider from "@/components/ui/Divider";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import styles from "./homeContactHero.module.css";
import { useState } from "react";

export default function HomeContactHero({ data }) {
  const { Title, PhoneNumber, Media, Email, Address, BudgetDropdown, HowDidYouHearDropdown, ServicesDropdown } = data;

  const [statusMessage, setStatusMessage] = useState(null);

  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    Phone: "",
    Address: "",
    ProjectSuburban: "",
    ServicesRequired: [],
    TotalBudget: "",
    HowDidYouHearAboutUs: "",
    Message: "",
  });

  const handleChange = (e) => {
    const { name, value, multiple, selectedOptions } = e.target;
    const fieldValue = multiple
      ? Array.from(selectedOptions, (option) => option.value)
      : value;
    setFormData({ ...formData, [name]: fieldValue });
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let dataToSend = {};
    dataToSend = {
      data: {
        FullName: formData.FullName,
        Email: formData.Email,
        Phone: formData.Phone,
        Address: formData.Address,
        ProjectSuburban: formData.ProjectSuburban,
        ServicesRequired: formData.ServicesRequired.join(", "),
        TotalBudget: formData.TotalBudget,
        HowDidYouHearAboutUs: formData.HowDidYouHearAboutUs,
        Message: formData.Message,
      },
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/contacts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        },
      );

      const result = await res.json();

      if (res.ok && result.data) {
        setStatusMessage({
          type: "success",
          text: "Thank you! Your form has been submitted successfully.",
        });
        setFormData({
          FullName: "",
          Email: "",
          Phone: "",
          Address: "",
          ProjectSuburban: "",
          ServicesRequired: [],
          TotalBudget: "",
          HowDidYouHearAboutUs: "",
          Message: "",
        });
      } else {
        console.error("Submission failed:", result);
        setStatusMessage({
          type: "error",
          text: result.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Form submission failed", error);
      setStatusMessage({
        type: "error",
        text: "Network error. Please try again.",
      });
      setStatusMessage({
        type: "error",
        text: "Network error. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const leftContent = (
    <>
      <Box
        fullHeight
        direction="column"
        justify="space-between"
        mobileGap="90px"
        padding="0"
        className={styles.box}
      >
        <FadeUp classes="p20">
          <Heading level={1} style={{ maxWidth: 580 }}>
            {Title}
          </Heading>
        </FadeUp>
      </Box>
      <Box
        fullHeight
        direction="row"
        justify="space-between"
        align="flex-end"
        padding="0"
        equalChildren
        mobileDirection="row-reverse"
        mobileJustify="center"
        mobileAlign="center"
        className={styles.box}
      >
        <SlideRight className="p20 fullHeight">
          <MediaRenderer media={Media} classes={"image"} />
        </SlideRight>
        <div className="hide-mobile" />
      </Box>
    </>
  );

  const rightContent = (
    <>
      <Box padding="0" fullHeight justify="center">
        <div className="contactForm fullWidth">
          <form onSubmit={(e) => handleSubmit(e, "Contact")}>
            <div className={styles.formGrid}>
              <div className={styles.floatingGroup}>
                <input
                  type="text"
                  name="FullName"
                  placeholder=""
                  required
                  onChange={handleChange}
                />
                <label htmlFor="FullName">FULL NAME</label>
              </div>
              <div className={styles.floatingGroup}>
                <input
                  type="email"
                  name="Email"
                  placeholder=""
                  required
                  onChange={handleChange}
                />
                <label htmlFor="email">EMAIL</label>
              </div>
              <div className={styles.floatingGroup}>
                <input
                  type="text"
                  name="Phone"
                  placeholder=""
                  onChange={handleChange}
                />
                <label htmlFor="phone">PHONE</label>
              </div>
              <div className={styles.floatingGroup}>
                <input
                  type="text"
                  name="Address"
                  placeholder=""
                  onChange={handleChange}
                />
                <label htmlFor="Address">Address</label>
              </div>
              <div className={styles.floatingGroup}>
                <select
                  name="ServicesRequired"
                  value={formData.ServicesRequired}
                  multiple
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    SERVICES
                  </option>
                  {ServicesDropdown.map((option, index) => <option key={index}>{option.Value}</option>)}
                  {/* <option>New Home</option>
                  <option>Interior Design</option>
                  <option>Custom Renovation / Addition</option>
                  <option>Outdoor Living</option>
                  <option>Boutique Commercial</option> */}
                </select>
              </div>
              <div className={styles.floatingGroup}>
                <select
                  name="TotalBudget"
                  value={formData.TotalBudget}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    Total Project Budget
                  </option>
                  {BudgetDropdown.map((option, index) => <option key={index}>{option.Value}</option>)}
                  {/* <option value="1000-5000">$1,000 – $5,000</option>
                  <option value="5000-10000">$5,000 – $10,000</option>
                  <option value="10000-25000">$10,000 – $25,000</option>
                  <option value="25000-50000">$25,000 – $50,000</option>
                  <option value="50000+">$50,000+</option> */}
                </select>
              </div>
              <div className={`${styles.floatingGroup} ${styles.fullWidth}`}>
                <select
                  name="HowDidYouHearAboutUs"
                  value={formData.HowDidYouHearAboutUs}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    HOW DID YOU HEAR ABOUT US
                  </option>
                  {HowDidYouHearDropdown.map((option, index) => <option key={index}>{option.Value}</option>)}
                  {/* <option>Google Search</option>
                  <option>Social Media</option>
                  <option>Friend / Family Referral</option>
                  <option>Colleague</option>
                  <option>Online Advertisement</option>
                  <option>Blog / Article</option>
                  <option>Email Newsletter</option>
                  <option>Event / Webinar</option>
                  <option>Other</option> */}
                </select>
              </div>
              <div className={`${styles.floatingGroup} ${styles.fullWidth}`}>
                <textarea
                  rows="5"
                  name="Message"
                  placeholder=""
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="message">YOUR MESSAGE</label>
              </div>
            </div>
            <button className={styles.submitBtn}>
              {" "}
              <span>{isSubmitting ? "SUBMITTING..." : "SUBMIT ENQUIRY"}</span>
            </button>
            {statusMessage && (
              <p
                className={`response-msg uppercase pt20 ${
                  statusMessage.type === "success"
                    ? styles.success
                    : styles.textError
                }`}
              >
                {statusMessage.text}
              </p>
            )}
          </form>
        </div>
      </Box>
      <div className={`${styles.bottomContact} text-center uppercase`}>
        <Paragraph>{Address}</Paragraph>
        <Paragraph>{Email}</Paragraph>
        <Paragraph>{PhoneNumber}</Paragraph>
      </div>
    </>
  );

  return (
    <>
      <section className="homeContactHero fitToScreen">
        <TwoColumnLayout
          fullHeight
          left={leftContent}
          right={rightContent}
          showDivider
          showMobileDivider={false}
        />
      </section>
      <Divider />
    </>
  );
}
