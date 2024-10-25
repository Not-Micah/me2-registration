import { addDoc, query, DocumentData, onSnapshot, collection, updateDoc, serverTimestamp, where, getDocs } from "firebase/firestore";
import { initializeFirebase, getUserAuth, getFireStore } from "./databasefunctions";

export const getUsers = (setUsers: (users: DocumentData[]) => void) => {

  const app = initializeFirebase();
  const firestore = getFireStore(true);

  const q = query(collection(firestore, `/users`));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const users: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    setUsers(users);
  });

  return unsubscribe;
};

export const getUser = async (uid: string): Promise<DocumentData | null> => {

  const app = initializeFirebase();
  const firestore = getFireStore(true);

  const q = query(collection(firestore, `/users`), where("uid", "==", uid));

  const querySnapshot = await getDocs(q);

  let user: DocumentData | null = null;
  querySnapshot.forEach((doc) => {
    user = doc.data();
  });

  return user;
};

export const addUser = async (userName: string, age: number, 
  curr: string, location: string, hobbies: string[], pfp: string | null | undefined, 
  instagram: string, discord: string, snap: string) => {

  const app = initializeFirebase
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);


  if (auth.currentUser) {
    const { uid } = auth.currentUser;
    console.log("Went through here!")
    try {
      await addDoc(collection(firestore, "users"), {
        uid,
        userName,
        age,
        curr,
        location,
        hobbies,
        pfp,
        instagram,
        discord,
        snap,
        lastOnline: serverTimestamp(),
        online : true
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
}

export const editUser = async (uid: string, userName: string, age: number, curr: string, location: string, hobbies: string[], 
  instagram: string, discord: string, snap: string) => {
    
  const app = initializeFirebase();
  const firestore = getFireStore(true);

  const q = query(collection(firestore, 'users'), where('uid', '==', uid));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDocRef = querySnapshot.docs[0].ref;

    await updateDoc(userDocRef, {
      userName,
      age,
      location,
      curr,
      hobbies,
      instagram,
      discord,
      snap
    });

    console.log(`User document with UID ${uid} successfully updated.`);
  } else {
    console.error(`No user found with UID ${uid}.`);
  }
};


