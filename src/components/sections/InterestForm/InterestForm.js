"use client";
import styles from "./interestForm.module.css";
import { useState } from "react";

export default function InterestForms() {
  const [statusMessage, setStatusMessage] = useState(null);

  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    Phone: "",
    linkedin: "",
    department: "",
    uploadCV: "",
    yourMessage: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        linkedin: formData.linkedin,
        department: formData.department,
        uploadCV: formData.uploadCV,
        yourMessage: formData.yourMessage,
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
        }
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
          PhoneNumber: "",
          AboutYourBusiness: "",
          AboutYourProject: "",
          FormType: "",
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

  return (
    <form className={styles.contactForm} onSubmit={(e) => handleSubmit(e, "Contact")}>
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
          name="linkedin"
          placeholder=""
          onChange={handleChange}
        />
        <label htmlFor="linkedin">LINKEDIN</label>
      </div>
      <div className={styles.floatingGroup}>
        <input
          type="text"
          name="department"
          placeholder=""
          onChange={handleChange}
        />
        <label htmlFor="department">DEPARTMENT</label>
      </div>
      <div className={styles.floatingGroup}>
        <input
          type="text"
          name="uploadCV"
          placeholder=""
          onChange={handleChange}
        />
        <label htmlFor="uploadCV">UPLOAD CV</label>
      </div>
      <div className={`${styles.floatingGroup} ${styles.fullWidth}`}>
        <textarea
          rows="5"
          name="yourMessage"
          placeholder=""
          onChange={handleChange}
        ></textarea>
        <label htmlFor="yourMessage">YOUR MESSAGE</label>
      </div>
        <div>
      <button className={`${styles.submitBtn} text-light`} disabled={isSubmitting}>
        {" "}
        <span>{isSubmitting ? "SUBMITTING..." : "Submit expression of interest"}</span>
      </button>
      </div>
      {statusMessage && (
        <p
          className={`response-msg uppercase pt20 ${
            statusMessage.type === "success" ? styles.success : styles.textError
          }`}
        >
          {statusMessage.text}
        </p>
      )}
    </form>
  );
}
