import AsheticsCard from '@/components/common/AsheticsCard';
import TwoColumnLayout from '@/components/layouts/TwoColumnLayout';
import astheticsStyles from '../style/asthetics..module.css';
import styles from './relatedAesthetics.module.css';

export default function RelatedAesthetics({ data }) {
  const { RelatedAesthetics } = data;
  
  return (
    <section className={`${astheticsStyles.section} ${astheticsStyles.relatedAesthetics}`}> 
      <div className={styles.innerWrapper}>
        {RelatedAesthetics.map((item, index) => <div key={index} className={styles.content}><AsheticsCard data={item} /></div>)}
        </div>
    </section>
  )
}
