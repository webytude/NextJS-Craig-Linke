import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import styles from './contact.module.css'
import FadeUp from '@/components/ui/animations/FadeUp'

export default function ContctDetail({ extraDetails }) {
  return (
    <div className={styles.footerCta}>
        {extraDetails.map((item, index) => <div key={index} className={styles.footerCol}>
      <FadeUp>
            <BlocksRenderer content={item.Content} />
        </FadeUp>
        </div>)}
    </div>
  )
}
