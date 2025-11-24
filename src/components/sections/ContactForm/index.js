"use client";
import styles from "./contactForm.module.css";
import { useState } from "react";

export default function ContactForm() {
    const [statusMessage, setStatusMessage] = useState(null);

    const [formData, setFormData] = useState({
        FullName: "",
        Email: "",
        Phone: "",
        ProjectSuburban: "",
        ServicesRequired: "",
        TotalBudget: "",
        Message: "",
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
                ProjectSuburban: formData.ProjectSuburban,
                ServicesRequired: formData.ServicesRequired,
                TotalBudget: formData.TotalBudget,
                Message: formData.Message,
            },
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/contacts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

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
        <form className="contact-form" onSubmit={(e) => handleSubmit(e, "Contact")}>
            <div className={styles.floatingGroup}>
                <input type="text" name="FullName" placeholder="" onChange={handleChange} />
                <label for="FullName">FULL NAME</label>
            </div>
            <div className={styles.floatingGroup}>
                <input type="email" name="Email" placeholder="" onChange={handleChange} />
                <label>EMAIL</label>
            </div>
            <div className={styles.floatingGroup}>
                <input type="text" name="Phone" placeholder="" onChange={handleChange} />
                <label for="phone">PHONE</label>
            </div>
            <div className={styles.floatingGroup}>
                <input type="text" name="ProjectSuburban" placeholder="" onChange={handleChange} />
                <label for="projectSuburb">PROJECT SUBURB</label>
            </div>
            <div className={styles.floatingGroup}>
                <input type="text" name="ServicesRequired" placeholder="" onChange={handleChange} />
                <label for="servicesRequired">SERVICES REQUIRED</label>
            </div>
            <div className={styles.floatingGroup}>
                <input type="text" name="TotalBudget" placeholder="" onChange={handleChange} />
                <label for="totalBudget">TOTAL BUDGET</label>
            </div>
            <div className={styles.floatingGroup}>
                <textarea rows="5" name="Message" placeholder="" onChange={handleChange}></textarea>
                <label for="message">MESSAGE</label>
            </div>

            <button className={styles.submitBtn} disabled={isSubmitting}>  <span>{isSubmitting ? "SUBMITTING..." : "SUBMIT ENQUIRY"}</span></button>
            {statusMessage && (
                <p
                    className={`response-msg ${statusMessage.type === "success" ? "text-green" : "text-red"
                        }`}
                >
                    {statusMessage.text}
                </p>
            )}
        </form>


    );
}
