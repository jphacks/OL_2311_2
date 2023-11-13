import { collection, getDocs, onSnapshot } from "firebase/firestore";
import LogoImage from "./assets/logo.png";

import { db } from "./libs/firebase";
import { useEffect, useState } from "react";
import { User } from "./types/user";
import { Cheer } from "./types/cheer";
import CheersPair from "./components/KanpaiPair";
import { useSpring, animated } from "react-spring";
import KanpaiSound from "./assets/audio/kanpai.mp3";

const audios = {
  kanpai: new Audio(KanpaiSound),
};

function App() {
  const [users, setUsers] = useState<User[]>();
  const [fromUser, setFromUser] = useState<User>();
  const [toUser, setToUser] = useState<User>();
  const [latestCheers, setLatestCheers] = useState<Cheer>();
  const [totalCheersCount, setTotalCheersCount] = useState<number>(0);
  const [kanpaiVisible, setKanpaiVisible] = useState<boolean>(false);
  // NOTE: 音声がautoplayされないため、はじめにユーザのインタラクションを強制する
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const KanpaiProps = useSpring({
    opacity: kanpaiVisible ? 1 : 0,
    config: { duration: 300 },
  });

  useEffect(() => {
    const usersCollectionRef = collection(db, "users");
    getDocs(usersCollectionRef).then((querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);

  useEffect(() => {
    const cheersCollectionRef = collection(db, "cheers");
    const unsubscribe = onSnapshot(cheersCollectionRef, (querySnapshot) => {
      querySnapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          setLatestCheers({
            fromUserId: change.doc.data().fromUserId,
            toUserId: change.doc.data().toUserId,
          });
          await audios.kanpai.play();
        }
      });
      setTotalCheersCount(querySnapshot.size);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const newFromUser = users?.find(
      (user) => user.id === latestCheers?.fromUserId
    );
    const newToUser = users?.find((user) => user.id === latestCheers?.toUserId);
    setFromUser(newFromUser);
    setToUser(newToUser);
    setKanpaiVisible(!!(newFromUser && newToUser));
    setTimeout(() => {
      setKanpaiVisible(false);
    }, 5000);
  }, [latestCheers, users]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[url('./assets/confetti.png')] bg-[#1637FC] bg-contain bg-no-repeat bg-center relative">
      {isStarted ? (
        <>
          <div className="flex text-white justify-center items-center flex-col">
            <h1 className="text-[40px] font-semibold">会場の総乾杯数</h1>
            <animated.p className="font-[Chillax] text-[250px] leading-none">
              {Math.floor(totalCheersCount / 2)}
            </animated.p>
            <img src={LogoImage} alt="Kanpai!" />
          </div>
          {fromUser && toUser && (
            <div>
              <animated.div style={KanpaiProps}>
                <CheersPair
                  fromUser={fromUser}
                  toUser={toUser}
                  position={{ top: "-10%", left: "5%" }}
                  rotate="25deg"
                />
              </animated.div>
              <animated.div style={KanpaiProps}>
                <CheersPair
                  fromUser={fromUser}
                  toUser={toUser}
                  position={{ top: "5%", right: "5%" }}
                  rotate="-34deg"
                  scale={0.9}
                />
              </animated.div>
              <animated.div style={KanpaiProps}>
                <CheersPair
                  fromUser={fromUser}
                  toUser={toUser}
                  position={{ bottom: "15%", left: "12%" }}
                  rotate="-8deg"
                  scale={0.8}
                />
              </animated.div>
              <animated.div style={KanpaiProps}>
                <CheersPair
                  fromUser={fromUser}
                  toUser={toUser}
                  position={{ bottom: "5%", right: "20%" }}
                  rotate="30deg"
                  scale={0.7}
                />
              </animated.div>
              <animated.div style={KanpaiProps}>
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
