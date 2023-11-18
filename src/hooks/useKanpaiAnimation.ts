import { useReward } from "react-rewards";
import {
  rewardConfettiConfig,
  rewardEmojiConfig,
  rewardLeftAngle,
  rewardRightAngle,
} from "../constants/reward";
import { useState } from "react";
import { useSpring } from "react-spring";

export const useKanpaiAnimation = () => {
  const { reward: rewardEmojiL } = useReward("rewardL", "emoji", {
    ...rewardEmojiConfig,
    angle: rewardLeftAngle,
  });
  const { reward: rewardConfettiL } = useReward("rewardL", "confetti", {
    ...rewardConfettiConfig,
    angle: rewardLeftAngle,
  });
  const { reward: rewardEmojiR } = useReward("rewardR", "emoji", {
    ...rewardEmojiConfig,
    angle: rewardRightAngle,
  });
  const { reward: rewardConfettiR } = useReward("rewardR", "confetti", {
    ...rewardConfettiConfig,
    angle: rewardRightAngle,
  });

  const triggerRewards = () => {
    rewardEmojiR();
    rewardEmojiL();
    rewardConfettiL();
    rewardConfettiR();
  };

  const [animationActive, setAnimationActive] = useState<boolean>(false);
  const feedAnimationProps = useSpring({
    opacity: animationActive ? 1 : 0,
    config: { duration: 300 },
  });

  return {
    triggerRewards,
    feedAnimationProps,
    animationActive,
    setAnimationActive,
  };
};
