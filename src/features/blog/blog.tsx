import { FormEvent, useState } from "react";
import { Post, post, selectPost } from "./blogSlice";
import { useDispatch, useSelector } from "react-redux";

export const Blog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const postList = useSelector(selectPost);

  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (title && content) {
      dispatch(post({ title, content }));
      setTitle("");
      setContent("");
    }
  };

  const renderPost = ({ content, title }: Post) => {
    return (
      <li key={title}>
        <h2>{title}</h2>
        <p>{content}</p>
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
        <button>post</button>
      </form>
      <ul>{postList.map(renderPost)}</ul>
    </div>
  );
};
