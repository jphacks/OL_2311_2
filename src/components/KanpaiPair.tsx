import { User } from "../types/user";
import KanpaiImage from "../assets/kanpai.png";

type Position = {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  scale?: number;
};

type CheersPairProps = {
  fromUser: User;
  toUser: User;
  position: Position;
  rotate: string;
  scale?: number;
};

const CheersPair: React.FC<CheersPairProps> = ({
  fromUser,
  toUser,
  position,
  rotate = "0deg",
  scale = 1,
}) => {
  return (
    <div
      className="absolute"
      style={{ ...position, transform: `rotate(${rotate}) scale(${scale})` }}
    >
      <img
        src={fromUser?.profileImageUrl}
        className="rounded-full absolute -left-[45%] top-1/2 bottom-1/2 w-[150px] transform -translate-y-[10%]"
      />
      <img src={KanpaiImage} />
      <img
        src={toUser?.profileImageUrl}
        className="rounded-full absolute -right-[45%] top-1/2 bottom-1/2 w-[150px] transform -translate-y-[10%]"
      />
    </div>
  );
};

export default CheersPair;
