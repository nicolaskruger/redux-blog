import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectUsers } from "../../features/user/userSlicer";
import Link from "next/link";
import { useEffect } from "react";

const UserList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const userList = useSelector(selectUsers);

  const renderUser = userList.map(({ id, name }) => (
    <li key={id}>
      <Link href={`/user/${id}`}>{name}</Link>
    </li>
  ));

  return (
    <main>
      <h1>User</h1>
      <ul>{renderUser}</ul>
    </main>
  );
};

export default UserList;
