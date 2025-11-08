import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Image
        src="/images/Home.png"
        width={1512}
        height={6197}
        alt="Picture of the author"
      />
    </div>
  );
}
