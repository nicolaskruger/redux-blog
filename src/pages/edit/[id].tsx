import { GetServerSideProps, NextPage } from "next";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit, selectPostId } from "../../features/blog/blogSlice";
import { useRouter } from "next/router";

type EditProps = {
  id: string;
};

const Edit: NextPage<EditProps> = ({ id }) => {
  const post = useSelector(selectPostId(id));

  if (post) {
    const dispatch = useDispatch();
    const { title: initTitle, content: initContent } = post;
    const [title, setTitle] = useState(initTitle);
    const [content, setContent] = useState(initContent);
    const { push } = useRouter();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      dispatch(
        edit({
          content,
          title,
          id,
        })
      );
      push("/");
    };

    return (
      <form onSubmit={handleSubmit} action="submit">
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
        <button>edit</button>
      </form>
    );
  }

  return <h1>don't have post with that id: {id}</h1>;
};

export const getServerSideProps: GetServerSideProps<
  EditProps,
  EditProps
> = async (context) => {
  return {
    props: {
      id: context.params!.id,
    },
  };
};

export default Edit;
