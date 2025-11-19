const SectionWrapper = ({ children, variant = 'light', className }) => {
  return (
    <section className={`${styles.section} ${styles[variant]} ${className || ''}`}>
      {children}
    </section>
  );
};

export default SectionWrapper;