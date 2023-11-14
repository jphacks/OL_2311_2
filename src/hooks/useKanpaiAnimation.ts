import { useReward } from "react-rewards";
import {
  rewardConfettiConfig,
  rewardEmojiConfig,
  rewardLeftAngle,
  rewardRightAngle,
} from "../constants/reward";
import { useCallback, useState } from "react";
import { useSpring } from "react-spring";

export const useKanpaiAnimation = () => {
  const { reward: rewardEmojiL } = useReward("rewardEmojiL", "emoji", {
    ...rewardEmojiConfig,
    angle: rewardLeftAngle,
  });
  const { reward: rewardConfettiL } = useReward("rewardEmojiL", "confetti", {
    ...rewardConfettiConfig,
    angle: rewardLeftAngle,
  });
  const { reward: rewardEmojiR } = useReward("rewardEmojiR", "emoji", {
    ...rewardEmojiConfig,
    angle: rewardRightAngle,
    emoji: ["🍺", "🍻"],
  });
  const { reward: rewardConfettiR } = useReward("rewardEmojiR", "confetti", {
    ...rewardConfettiConfig,
    angle: rewardRightAngle,
  });

  const triggerRewards = useCallback(() => {
    rewardEmojiR();
    rewardEmojiL();
    rewardConfettiL();
    rewardConfettiR();
  }, []); // react-rewardsのreward()が更新され続けることによる再レンダリングの無限ループに陥るため、引数にtriggerRewardsを渡さない

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
