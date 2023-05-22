import { useDispatch, useSelector } from "react-redux";
import {
  Notify,
  fetchLastNotify,
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
      <ul>
        {notify.map(({ date, info, userId }) => (
          <li key={Math.random()}>
            <h2>info: {info}</h2>
            <p>date: {date}</p>
            <p>user: {userMap[userId].name}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleClick}>fetch</button>
    </div>
  );
};

export default NotifyPage;
