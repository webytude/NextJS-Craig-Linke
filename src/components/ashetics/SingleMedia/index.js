import MediaRenderer from '@/components/common/MediaRenderer';
import astheticsStyles from '../style/asthetics..module.css';
import SlideLeft from '@/components/ui/animations/SlideLeft';

export default function SingleMedia({ data }) {
  const { Media } = data;

  return (
    <section className={`${astheticsStyles.section} ${astheticsStyles.singleMedia}`}>
      <div className='p20'><SlideLeft><MediaRenderer media={Media} width={417} height={573} /></SlideLeft></div>
    </section>
  )
}
