import { useDispatch, useSelector } from "react-redux";
import {
  Notify,
  fetchLastNotify,
  selectNotify,
} from "../features/notification/notificationSlicer";
import { useEffect, useState } from "react";

const NotifyPage = () => {
  const [notify, setNotify] = useState<Notify[]>([]);

  const currentNotify = useSelector(selectNotify);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchLastNotify());
  };

  useEffect(() => {
    setNotify(currentNotify);
  }, [currentNotify]);

  return (
    <div>
      <ul>
        {notify.map(({ date, info }) => (
          <li key={Math.random()}>
            <h2>info: {info}</h2>
            <p>date: {date}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleClick}>fetch</button>
    </div>
  );
};

export default NotifyPage;
