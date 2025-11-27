import AsheticsCard from '@/components/common/AsheticsCard'
import astheticsStyles from '../style/asthetics..module.css';

export default function ProjectWithManuallyEditable({ data }) {
  return (
    <section className={`${astheticsStyles.section} ${astheticsStyles.projectWithManuallyEditable}`}>
    <AsheticsCard data={data} />
    </section>
  )
}
