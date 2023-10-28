import { collection, getDocs, onSnapshot } from "firebase/firestore";
import LogoImage from "./assets/logo.png";

import { db } from "./libs/firebase";
import { useEffect, useState } from "react";
import { User } from "./types/user";
import { Cheer } from "./types/cheer";
import CheersPair from "./components/KanpaiPair";

function App() {
  const [users, setUsers] = useState<User[]>();
  const [fromUser, setFromUser] = useState<User>();
  const [toUser, setToUser] = useState<User>();
  const [latestCheers, setLatestCheers] = useState<Cheer>();
  const [totalCheersCount, setTotalCheersCount] = useState<number>(0);

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
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setLatestCheers({
            fromUserId: change.doc.data().fromUserId,
            toUserId: change.doc.data().toUserId,
          });
        }
      });
      setTotalCheersCount(querySnapshot.size);
      setFromUser(users?.find((user) => user.id === latestCheers?.fromUserId));
      setToUser(users?.find((user) => user.id === latestCheers?.toUserId));
    });
    return unsubscribe;
  }, [latestCheers?.fromUserId, latestCheers?.toUserId, users]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[url('./assets/confetti.png')] bg-[#1637FC] bg-contain bg-no-repeat bg-center relative">
      <div className="flex text-white justify-center items-center flex-col">
        <h1 className="text-[54px] font-semibold">会場の総乾杯数</h1>
        <p className="font-[Chillax] text-[250px] leading-none">
          {totalCheersCount}
        </p>
        <img src={LogoImage} alt="Kanpai!" />
      </div>
      {fromUser && toUser && (
        <div>
          <CheersPair
            fromUser={fromUser}
            toUser={toUser}
            position={{ top: "-10%", left: "5%" }}
            rotate="25deg"
          />
          <CheersPair
            fromUser={fromUser}
            toUser={toUser}
            position={{ top: "5%", right: "5%" }}
            rotate="-34deg"
            scale={0.9}
          />
          <CheersPair
            fromUser={fromUser}
            toUser={toUser}
            position={{ bottom: "15%", left: "12%" }}
            rotate="-8deg"
            scale={0.8}
          />
          <CheersPair
            fromUser={fromUser}
            toUser={toUser}
            position={{ bottom: "5%", right: "20%" }}
            rotate="30deg"
            scale={0.7}
          />
          <CheersPair
            fromUser={fromUser}
            toUser={toUser}
            position={{ bottom: "15%", right: "2%" }}
            rotate="-30deg"
            scale={0.5}
          />
        </div>
      )}
    </div>
  );
}

export default App;
