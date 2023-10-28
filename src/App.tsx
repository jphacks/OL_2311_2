import { collection, getDocs, onSnapshot } from "firebase/firestore";
import LogoImage from "./assets/logo.png";
import { db } from "./libs/firebase";
import { useEffect, useState } from "react";
import { User } from "./types/user";
import { Cheer } from "./types/cheer";

function App() {
  const [users, setUsers] = useState<User[]>();
  const [latestCheers, setLatestCheers] = useState<Cheer>();
  const [totalCheersCount, setTotalCheersCount] = useState<number>(0);

  useEffect(() => {
    const usersCollectionRef = collection(db, "users");
    getDocs(usersCollectionRef).then((querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

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
    });
    return unsubscribe;
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[url('./assets/confetti.png')] bg-[#1637FC] bg-contain bg-no-repeat bg-center">
      <div className="flex text-white justify-center items-center flex-col">
        <h1 className="text-[54px] font-semibold">会場の総乾杯数</h1>
        <p className="font-[Chillax] text-[250px] leading-none">
          {totalCheersCount}
        </p>
        <img src={LogoImage} alt="Kanpai!" />
      </div>
    </div>
  );
}

export default App;
