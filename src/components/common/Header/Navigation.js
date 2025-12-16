import Link from "next/link";

export default function Navigation({ menu, onCloseMenu, onLinkClick }) {
  return (
    <ul>
      {menu.map((item, index) => (
        <li key={`${item.ButtonURL}-${index}`}>
          <Link href={item.ButtonURL} onClick={onLinkClick}>{item.ButtonText}</Link>
        </li>
      ))}
    </ul>
  );
}
