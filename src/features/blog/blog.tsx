import { FormEvent, useState } from "react";
import { Post, post, react, selectPost } from "./blogSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

export const Blog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const postList = useSelector(selectPost);

  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (title && content && author) {
      dispatch(post({ title, content, author }));
      setTitle("");
      setContent("");
      setAuthor("");
    }
  };

  const renderPost = ({ id, content, title, author, ...post }: Post) => {
    const reactions: (keyof Pick<Post, "joy" | "like" | "look" | "rocket">)[] =
      ["joy", "like", "look", "rocket"];

    return (
      <li key={title}>
        <h1>{title}</h1>
        <h2>{author}</h2>
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
          <option value="nicolas">nicolas</option>
          <option value="ana">ana</option>
          <option value="morcego">morcego</option>
          <option value="jett">jett</option>
        </select>
        <button>post</button>
      </form>
      <ul>{postList.map(renderPost)}</ul>
    </div>
  );
};
