const emoji = [
  "🧃",
  "🥤",
  "🧋",
  "🍶",
  "🥂",
  "🍷",
  "🥃",
  "🍸",
  "🍹",
  "🍾",
  "🍺",
  "🍺",
  "🍺",
  "🍺",
  "🍺",
  "🍺",
  "🍺",
  "🍺",
  "🍻",
  "🍻",
  "🍻",
  "🍻",
  "🍻",
  "🍻",
  "🍻",
  "🍻",
];

const rewardCommonConfig = {};

export const rewardConfettiConfig = {
  ...rewardCommonConfig,
  elementCount: 40,
};

export const rewardEmojiConfig = {
  ...rewardCommonConfig,
  emoji,
  elementCount: 20,
};

export const rewardLeftAngle = 55;
export const rewardRightAngle = 135;
