import JournalCard from './JournalCard'
import TwoColumnLayout from '../layout/TwoColumnLayout'
import LinkWithArrow from '../ui/Link'
import Spacer from '../ui/Spacer'
import styles from './journal.module.css'

export default function Journal() {
    const leftContent = (
        <>
            <div className="text-light p20">INTERIOR DESIGN</div>
            <Spacer desktop={84} tablet={50} mobile={30} />
            <div className="journal">
                <JournalCard />
            </div>
            <Spacer desktop={130} tablet={50} mobile={30} />
        </>
    )
    const rightContent = (
        <>
            <div className="p20 text-right">
                <LinkWithArrow text="VIEW ALL" href="#" />
            </div>
            <Spacer desktop={84} tablet={50} mobile={30} />
            <div className="journal">
            <JournalCard />
            </div>
            <Spacer desktop={130} tablet={50} mobile={30} />
        </>
    )
  return (
    <section>
      <TwoColumnLayout showDivider left={leftContent} right={rightContent} />
    </section>
  )
}
