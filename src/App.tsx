import LogoImage from "./assets/logo.png";
import { useCallback, useEffect, useState } from "react";
import CheersPair from "./components/KanpaiPair";
import { animated } from "react-spring";
import { useKanpaiAnimation } from "./hooks/useKanpaiAnimation";
import { useFirebaseData } from "./hooks/useFirebaseData";
import { audios } from "./constants/audio";

function App() {
  // NOTE: 音声がautoplayされないため、はじめにユーザのインタラクションを強制する
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const { triggerRewards, feedAnimationProps, setAnimationActive } =
    useKanpaiAnimation();
  const handleKanpaiCallback = useCallback(async () => {
    triggerRewards();
    await audios.kanpai.play();
  }, [triggerRewards]);
  const { fromUser, toUser, count } = useFirebaseData(handleKanpaiCallback);

  useEffect(() => {
    setAnimationActive(!!(fromUser && toUser));
    setTimeout(() => {
      setAnimationActive(false);
    }, 5000);
  }, [fromUser, setAnimationActive, toUser]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[url('./assets/confetti.png')] bg-[#1637FC] bg-contain bg-no-repeat bg-center relative">
      {isStarted ? (
        <>
          <div className="fixed -left-20 bottom-20">
            <span id="rewardEmojiL" />
          </div>
          <div className="fixed -right-20 bottom-20">
            <span id="rewardEmojiR" />
          </div>
          <button onClick={handleKanpaiCallback}>click</button>
          <div className="flex text-white justify-center items-center flex-col">
            <h1 className="text-[40px] font-semibold">会場の総乾杯数</h1>
            <animated.p className="font-[Chillax] text-[250px] leading-none">
              {Math.floor(count / 2)}
            </animated.p>
            <img src={LogoImage} alt="Kanpai!" />
          </div>
          {fromUser && toUser && (
            <div>
              <animated.div style={feedAnimationProps}>
                <CheersPair
                  fromUser={fromUser}
                  toUser={toUser}
                  position={{ top: "-10%", left: "5%" }}
                  rotate="25deg"
                />
              </animated.div>
              <animated.div style={feedAnimationProps}>
                <CheersPair
                  fromUser={fromUser}
                  toUser={toUser}
                  position={{ top: "5%", right: "5%" }}
                  rotate="-34deg"
                  scale={0.9}
                />
              </animated.div>
              <animated.div style={feedAnimationProps}>
                <CheersPair
                  fromUser={fromUser}
                  toUser={toUser}
                  position={{ bottom: "15%", left: "12%" }}
                  rotate="-8deg"
                  scale={0.8}
                />
              </animated.div>
              <animated.div style={feedAnimationProps}>
                <CheersPair
                  fromUser={fromUser}
                  toUser={toUser}
                  position={{ bottom: "5%", right: "20%" }}
                  rotate="30deg"
                  scale={0.7}
                />
              </animated.div>
              <animated.div style={feedAnimationProps}>
                <CheersPair
                  fromUser={fromUser}
                  toUser={toUser}
                  position={{ bottom: "15%", right: "2%" }}
                  rotate="-30deg"
                  scale={0.5}
                />
              </animated.div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="text-white text-[30px] text-center tracking-widest">
            \ click /
          </div>
          <button
            className="text-white text-[60px] font-semibold py-4 px-12 border-[6px] border-white shadow-lg bg-blue-700 hover:bg-blue-600 rounded-[30px]"
            onClick={() => setIsStarted(true)}
          >
            <img src={LogoImage} alt="Kanpai!" />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
