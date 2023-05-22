import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPost,
  selectPostByAuthorId,
  selectPostByUser,
} from "../../features/blog/blogSlice";
import { fetchUsers, selectUserById } from "../../features/user/userSlicer";
import { Reactions } from "../../components/reactions";
import { AppState } from "../../store";

type UserProps = {
  id: string;
};

const UserPage = ({ id }: UserProps) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUserById(id));

  const posts = useSelector((state: AppState) => selectPostByUser(state, id));

  useEffect(() => {
    dispatch(fetchPost());
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <h1>author {user?.name}</h1>

      <ul>
        {posts.map(({ date, content, title, ...reactions }) => {
          return (
            <li>
              <h1>{title}</h1>
              <h2>{date} ago</h2>
              <p>{content}</p>
              <Reactions {...reactions} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps<
  UserProps,
  UserProps
> = async (content) => {
  return {
    props: {
      id: content.params!.id,
    },
  };
};
