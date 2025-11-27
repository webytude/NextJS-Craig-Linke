import AsheticsCard from '@/components/common/AsheticsCard';
import TwoColumnLayout from '@/components/layouts/TwoColumnLayout';
import astheticsStyles from '../style/asthetics..module.css';

export default function RelatedAesthetics({ data }) {
  const { RelatedAesthetics } = data;
  
  return (
    <section className={`${astheticsStyles.section} ${astheticsStyles.relatedAesthetics}`}> 
      <div className='innerWrapper'>
        {RelatedAesthetics.map((item, index) => <div key={index} className='content'><AsheticsCard data={item} /></div>)}
        </div>
    </section>
  )
}
