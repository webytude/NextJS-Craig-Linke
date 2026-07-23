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
import Select from 'react-select';
import { useState } from "react";

export default function HomeContactHero({ data, headingLevel = 1 }) {
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
    Website: "", // honeypot (should stay empty)
  });

  const handleChange = (e) => {
    const { name, value, multiple, selectedOptions } = e.target;
    const fieldValue = multiple
      ? Array.from(selectedOptions, (option) => option.value)
      : value;
    setFormData({ ...formData, [name]: fieldValue });
  };

  const handleSelectChange = (fieldName, selectedOption, isMulti = false) => {
    let value;

    if (isMulti) {
      value = selectedOption
        ? selectedOption.map((option) => option.value)
        : [];
    } else {
      value = selectedOption ? selectedOption.value : "";
    }

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.Website) {
      setStatusMessage({
        type: "error",
        text: "Invalid submission.",
      });
      return;
    }
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
          Website: "",
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

  const serviceOptions = ServicesDropdown?.map((item) => ({
    value: item.Value,
    label: item.Value,
  }));

  const BudgetOptions = BudgetDropdown?.map((item) => ({
    value: item.Value,
    label: item.Value,
  }));

  const HowDidYouHearOptions = HowDidYouHearDropdown?.map((item) => ({
    value: item.Value,
    label: item.Value,
  }));

  const customStyles = {
    control: (provided, state) => {
      const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
      return {
      ...provided,
      appearance: "none",
      background: "none",
      border: "none",
      borderBottom: "1px solid #b0a7a2",
      borderRadius: "0",
      boxShadow: "none",
      padding: isMobile ? "0 0 15px 0px" : "0 0 15px 12px",
      textTransform: "uppercase",
      letterSpacing: ".5px",
      fontFamily: "saanslight",
      fontSize: "12px",
      minHeight: '35px',
      // color: "#eaeae8",
      }
    },

    menu: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      borderRadius: "0",
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#dfd2c8" : "transparent",
      color: "#000",
      textTransform: "uppercase",
      fontSize: "12px",
      cursor: "pointer",
    }),

    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#333",
    }),

    multiValueLabel: (provided) => ({
      ...provided,
      color: "#eaeae8",
      fontSize: "12px",
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#eaeae8",
    }),
    placeholder: (provided) => {
      const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

      return {
        ...provided,
        color: "#eaeae8",
        marginLeft: isMobile ? '0px' : '2px',
        marginRight: isMobile ? '0px' : '2px',
      }
    },
    singleValue: (provided) => ({
    ...provided,
    color: "#eaeae8",
  }),
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
          <Heading level={headingLevel} style={{ maxWidth: 580 }}>
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

  const selectedServices = serviceOptions.filter((option) =>
    formData.ServicesRequired.includes(option.value)
  );

  const selectedBudget = BudgetOptions.find(
    (option) => option.value === formData.TotalBudget
  );

  const selectedHearAbout = BudgetOptions.find(
    (option) => option.value === formData.HowDidYouHearAboutUs
  );

  const handleServiceClick = (value) => {
    setFormData((prev) => {
      const alreadySelected = prev.ServicesRequired.includes(value);

      let updatedServices;

      if (alreadySelected) {
        updatedServices = prev.ServicesRequired.filter((v) => v !== value);
      } else {
        updatedServices = [...prev.ServicesRequired, value];
      }

      return {
        ...prev,
        ServicesRequired: updatedServices,
      };
    });
  };

  const rightContent = (
    <>
      <Box padding="0" fullHeight justify="center">
        <div className={`${styles.contactForm} fullWidth`}>
          <form onSubmit={(e) => handleSubmit(e, "Contact")}>
            <div className={styles.formGrid}>
              <div className={styles.honeypot} aria-hidden="true">
                <input
                  type="text"
                  name="Website"
                  tabIndex="-1"
                  autoComplete="off"
                  placeholder=""
                  onChange={handleChange}
                />
                <label htmlFor="Website">WEBSITE</label>
              </div>
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
              <div className={`${styles.floatingGroup} ${styles.fullWidth}`}>
                <label htmlFor="services">Services</label>
                <div className={styles.serviceList}>
                  {ServicesDropdown?.map((item) => <button type="button" key={item.Value} onClick={() => handleServiceClick(item.Value)} className={`${styles.btnLable} 
        borderRight borderTop borderBottom borderLeft
        ${
          formData.ServicesRequired.includes(item.Value)
            ? styles.active
            : ""
        }`}>{item.Value}</button>)}
                </div>
              </div>
              <div className={styles.floatingGroup}>
                <Select
                  instanceId="home-total-budget"
                  inputId="home-total-budget"
                  name="TotalBudget"
                  value={selectedBudget}
                  onChange={(selected) =>
                    handleSelectChange("TotalBudget", selected)
                  }
                  options={BudgetOptions}
                  classNamePrefix="select"
                  styles={customStyles}
                  placeholder="Total Project Budget"
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    ClearIndicator: () => null,
                  }}
                />
              </div>
              <div className={`${styles.floatingGroup}`}>
                <Select
                  instanceId="home-hear-about-us"
                  inputId="home-hear-about-us"
                  name="HowDidYouHearAboutUs"
                  value={selectedHearAbout}
                  onChange={(selected) =>
                    handleSelectChange("HowDidYouHearAboutUs", selected)
                  }
                  options={HowDidYouHearOptions}
                  classNamePrefix="select"
                  styles={customStyles}
                  placeholder="HOW DID YOU HEAR ABOUT US"
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    ClearIndicator: () => null,
                  }}
                />
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
