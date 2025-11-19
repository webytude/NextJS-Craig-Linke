import Link from "next/link";

export default function Navigation({ menu }) {
  return (
    <ul>
      {menu.map((item, index) => (
        <li key={index}>
          <Link href={item.ButtonURL}>{item.ButtonText}</Link>
        </li>
      ))}
    </ul>
  );
}
