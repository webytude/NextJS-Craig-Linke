"use client";
import styles from "./contactForm.module.css";

export default function ContactForm() {
  return (
    <form className="contact-form">
        <div className={styles.floatingGroup}>
            <input type="text" name="fullName" placeholder="" />
            <label for="fullName">FULL NAME</label>
        </div>
        <div className={styles.floatingGroup}>
            <input type="email" name="email" placeholder="" />
            <label>EMAIL</label>
        </div> 
        <div className={styles.floatingGroup}>
            <input type="text" name="phone" placeholder="" />
            <label for="phone">PHONE</label>
        </div>
        <div className={styles.floatingGroup}>
            <input type="text" name="projectSuburb" placeholder="" />
            <label for="projectSuburb">PROJECT SUBURB</label>
        </div>
        <div className={styles.floatingGroup}>
            <input type="text" name="servicesRequired" placeholder="" />
            <label for="servicesRequired">SERVICES REQUIRED</label>
        </div>
        <div className={styles.floatingGroup}>
            <input type="text" name="totalBudget" placeholder="" />
            <label for="totalBudget">TOTAL BUDGET</label>
        </div>
        <div className={styles.floatingGroup}>
            <textarea rows="5" name="message" placeholder=""></textarea>
            <label for="message">MESSAGE</label>
        </div>

      <button className={styles.submitBtn}>SUBMIT ENQUIRY</button>
    </form>
  );
}
