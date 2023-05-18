import { FormEvent, useEffect, useState } from "react";
import {
  Post,
  ViewPost,
  addPost,
  fetchPost,
  post,
  react,
  selectPost,
} from "./blogSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { fetchUsers, selectUsers } from "../user/userSlicer";
import { AppState, useAppDispatch } from "../../store";

export const Blog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("0");

  const [addUserState, setAddUserState] = useState<
    "idle" | "error" | "success" | "loading"
  >("idle");

  const postList = useSelector(selectPost);

  const state = useSelector((state: AppState) => state.blog.state);

  const users = useSelector(selectUsers);

  const userState = useSelector((state: AppState) => state.user.state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPost());
    dispatch(fetchUsers());
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if ([title, content, author].every(Boolean)) {
      try {
        setAddUserState("loading");
        await dispatch(addPost({ title, content, authorId: author })).unwrap();
        setAddUserState("success");
        setTimeout(() => setAddUserState("idle"), 1000);
        setTitle("");
        setContent("");
        setAuthor("0");
      } catch {
        setAddUserState("error");
        setTimeout(() => setAddUserState("idle"), 1000);
      }
    }
  };

  const renderPost = ({
    id,
    content,
    title,
    authorName: author,
    date,
    ...post
  }: ViewPost) => {
    const reactions: (keyof Pick<Post, "joy" | "like" | "look" | "rocket">)[] =
      ["joy", "like", "look", "rocket"];

    return (
      <li key={title}>
        <h1>{title}</h1>
        <h2>
          by {userState !== "success" ? userState : author} {date}
        </h2>
        <p>{content}</p>
        <Link href={`/view/${id}`}>view</Link>
        <ul>
          {reactions.map((reaction) => (
            <li>
              <button onClick={() => dispatch(react({ id, reaction }))}>
                {reaction} : {post[reaction]}
              </button>
            </li>
          ))}
        </ul>
      </li>
    );
  };

  if (state !== "success") return <p>{state}</p>;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">title:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="title"
          id="title"
        />
        <label htmlFor="content">content:</label>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          name="content"
          id="content"
        />
        <select
          name="author"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          {users.map(({ name, id }) => (
            <option value={id}>{name}</option>
          ))}
        </select>
        <button>post</button>
        {addUserState !== "idle" && <p>{addUserState}</p>}
      </form>
      <ul>{postList.map(renderPost)}</ul>
    </div>
  );
};
