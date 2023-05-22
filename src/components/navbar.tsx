import Link from "next/link";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { selectCountNotificationToRead } from "../features/notification/notificationSlicer";

type NavBarProps = {
  children: ReactNode;
};

export const NavBar = ({ children }: NavBarProps) => {
  const countNotification = useSelector(selectCountNotificationToRead);

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
        <li>
          <Link href={"/notify"}>notification {countNotification}</Link>
        </li>
      </ul>
      {children}
    </div>
  );
};
