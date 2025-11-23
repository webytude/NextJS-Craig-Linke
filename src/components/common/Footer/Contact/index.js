import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import styles from './contact.module.css'

export default function ContctDetail({ extraDetails }) {
  return (
    <div className={styles.footerCta}>
        {extraDetails.map((item, index) => <div key={index} className={styles.footerCol}>
            <BlocksRenderer content={item.Content} />
        </div>)}
    </div>
  )
}
