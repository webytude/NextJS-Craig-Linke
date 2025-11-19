import Link from 'next/link';

export default function Navigation() {
  return (
    <ul>
    <li><Link href="/aesthetics">AESTHETICS</Link></li>
    <li><Link href="/projects">PROJECTS</Link></li>
    <li><Link href="/process">PROCESS</Link></li>
    <li><Link href="/about">ABOUT</Link></li>
    <li><Link href="/journal">JOURNAL</Link></li>
    <li><Link href="/contact">CONTACT</Link></li>
</ul>
  )
}
