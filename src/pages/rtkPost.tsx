import Link from "next/link";
import { Post } from "../features/blog/blogSlice";
import { Reactions } from "../components/reactions";
import { useGetPostQuery } from "../features/api/apiSlicer";

const RTKPost = () => {
  const { data, isError, isLoading, isSuccess, error } = useGetPostQuery();

  const renderPost = ({ content, title, authorId, date, ...post }: Post) => {
    return (
      <li key={title}>
        <h1>{title}</h1>
        <p>{content}</p>
        <Link href={`/view/${post.id}`}>view</Link>
        <Reactions {...post} />
      </li>
    );
  };

  if (isError) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading</h1>;
  if (isSuccess)
    return (
      <div>
        <h1>RTK post</h1>
        <ul>{data.map(renderPost)}</ul>
      </div>
    );
};

export default RTKPost;
