import Link from "next/link";
import { ReactNode } from "react";

type NavBarProps = {
  children: ReactNode;
};

export const NavBar = ({ children }: NavBarProps) => {
  const links: { link: string; name: string }[] = [
    {
      name: "blog",
      link: "/",
    },
    {
      name: "user",
      link: "/user",
    },
  ];

  return (
    <div>
      <ul>
        {links.map(({ name, link }) => (
          <li>
            <Link href={link}>{name}</Link>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};
