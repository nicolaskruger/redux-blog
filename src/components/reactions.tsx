import { useDispatch } from "react-redux";
import { Post, react } from "../features/blog/blogSlice";

type ReactionsType = Pick<Post, "joy" | "like" | "look" | "rocket">;

type ReactionsProps = ReactionsType & {
  id: string;
};

export const Reactions = ({ id, ...listReactions }: ReactionsProps) => {
  const reactions: (keyof ReactionsType)[] = ["joy", "like", "look", "rocket"];

  const dispatch = useDispatch();

  return (
    <ul>
      {reactions.map((reaction) => (
        <li>
          <button onClick={() => dispatch(react({ id, reaction }))}>
            {reaction} : {listReactions[reaction]}
          </button>
        </li>
      ))}
    </ul>
  );
};
