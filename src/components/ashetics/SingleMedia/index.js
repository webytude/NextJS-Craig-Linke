import MediaRenderer from '@/components/common/MediaRenderer';
import astheticsStyles from '../style/asthetics..module.css';

export default function SingleMedia({ data }) {
  const { Media } = data;

  return (
    <section className={`${astheticsStyles.section} ${astheticsStyles.singleMedia}`}>
      <div className='p20'><MediaRenderer media={Media} width={417} height={573} /></div>
    </section>
  )
}
