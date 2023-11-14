import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { User } from "../types/user";
import { Cheer } from "../types/cheer";
import { db } from "../libs/firebase";

export const useFirebaseData = (handleCheerCallback: () => Promise<void>) => {
  const [users, setUsers] = useState<User[]>([]);
  const [fromUser, setFromUser] = useState<User>();
  const [toUser, setToUser] = useState<User>();
  const [latestCheers, setLatestCheers] = useState<Cheer>();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // ユーザーデータの取得
    const usersCollectionRef = collection(db, "users");
    getDocs(usersCollectionRef).then((querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    // 乾杯データの購読
    const cheersCollectionRef = collection(db, "cheers");
    const unsubscribe = onSnapshot(cheersCollectionRef, (querySnapshot) => {
      querySnapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          setLatestCheers({
            fromUserId: change.doc.data().fromUserId,
            toUserId: change.doc.data().toUserId,
          });

          // NOTE: 開発中に大量に紙吹雪が出てしまうのを防ぐため、開発中はコメントアウト推奨
          await handleCheerCallback();
        }
      });
      setCount(querySnapshot.size);
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
  }, [latestCheers, users]);

  return { fromUser, toUser, count };
};
