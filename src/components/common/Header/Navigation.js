import Link from "next/link";

export default function Navigation({ menu, onCloseMenu }) {
  return (
    <ul>
      {menu.map((item, index) => (
        <li key={index}>
          <Link href={item.ButtonURL} onClick={onCloseMenu}>{item.ButtonText}</Link>
        </li>
      ))}
    </ul>
  );
}
