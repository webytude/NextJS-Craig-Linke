import styles from './testimonial.module.css'
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export default function Testimonial({ data }) {
  const { Name, Description, Padding } = data;

  const {
    DesktopTopPadding,
    DesktopBottomPadding,
    MobileTopPadding,
    MobileBottomPadding,
  } = Padding || {};

  
  const styleVars = {};

  if (DesktopTopPadding != null) {
    styleVars["--desktop-pt"] = `${DesktopTopPadding}px`;
  }

  if (DesktopBottomPadding != null) {
    styleVars["--desktop-pb"] = `${DesktopBottomPadding}px`;
  }

  if (MobileTopPadding != null) {
    styleVars["--mobile-pt"] = `${MobileTopPadding}px`;
  }

  if (MobileBottomPadding != null) {
    styleVars["--mobile-pb"] = `${MobileBottomPadding}px`;
  }


  return (
    <>
      <section className={`${styles.testimonialSection} padding`} style={styleVars}>
        <div className={styles.description}>
          <BlocksRenderer content={Description || []} />
        </div>
        <h2 className={styles.name}>{Name}</h2>        
      </section>
    </>
  )
}
