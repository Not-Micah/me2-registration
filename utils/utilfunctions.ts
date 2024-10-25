import { DocumentData } from "firebase/firestore"

export const checkUser = (uid: string | undefined, uidList: DocumentData[] | null | undefined) => {
    if (!uidList || !uid) {
        return false
    }

    for (let i = 0; i < uidList.length; i++) {
        if (uidList[i].uid == uid) {
            return true;
        }
    }

    return false;
}