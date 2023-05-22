import { useDispatch, useSelector } from "react-redux";
import {
  Notify,
  fetchLastNotify,
  readAllNotification,
  selectNotify,
} from "../features/notification/notificationSlicer";
import { useEffect, useState } from "react";
import { fetchUsers, selectUserMap } from "../features/user/userSlicer";

const NotifyPage = () => {
  const [notify, setNotify] = useState<Notify[]>([]);

  const userMap = useSelector(selectUserMap);

  const currentNotify = useSelector(selectNotify);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchLastNotify());
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    setNotify(currentNotify);
  }, [currentNotify]);

  return (
    <div>
      <button onClick={() => dispatch(readAllNotification())}>read all</button>
      <ul>
        {notify.map(({ date, info, userId, read }) => (
          <li key={Math.random()}>
            <h2>info: {info}</h2>
            <p>date: {date}</p>
            <p>user: {userMap[userId].name}</p>
            <p>read: {read ? "OK" : "NOK"}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleClick}>fetch</button>
    </div>
  );
};

export default NotifyPage;
