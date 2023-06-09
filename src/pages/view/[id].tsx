import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Post, react, selectPostId } from "../../features/blog/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Reactions } from "../../components/reactions";

type ViewProps = {
  id: string;
};

const View: NextPage<ViewProps> = ({ id }) => {
  const post = useSelector(selectPostId(id));

  const dispatch = useDispatch();

  if (post) {
    const {
      authorName: author,
      content,
      id,
      joy,
      like,
      look,
      title,
      rocket,
      date,
    } = post;

    const reactions: (keyof Pick<Post, "joy" | "like" | "look" | "rocket">)[] =
      ["joy", "like", "look", "rocket"];

    return (
      <div key={title}>
        <h1>{title}</h1>
        <h2>
          by {author} {date}
        </h2>
        <p>{content}</p>
        <Reactions {...post} />
        <Link href={`/edit/${id}`}>edit</Link>
      </div>
    );
  }

  return <div>dont exist port with that id: {id}</div>;
};

export const getServerSideProps: GetServerSideProps<
  ViewProps,
  ViewProps
> = async (context) => {
  return {
    props: {
      id: context.params?.id as string,
    }, // will be passed to the page component as props
  };
};

export default View;
