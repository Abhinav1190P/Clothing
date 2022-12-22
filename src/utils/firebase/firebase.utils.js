import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'



import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDW5NaueMUp1bPnTO2AzGxxcdEpPpqnNcM",
    authDomain: "clothing-db-f5a75.firebaseapp.com",
    projectId: "clothing-db-f5a75",
    storageBucket: "clothing-db-f5a75.appspot.com",
    messagingSenderId: "1088604207273",
    appId: "1:1088604207273:web:3e42caca95d603337ed1b8"
};


const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const colletionRef = collection(db, collectionKey);
    const batch = writeBatch(db)

    objectsToAdd.forEach(object => {
        const docRef = doc(colletionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    });

    await batch.commit()
    console.log('done')
}


export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q);

    const categoryMap = querySnapshot.docs.reduce((accumilatore,docSnapshot)=>{
        const {title,items} = docSnapshot.data()
        accumilatore[title.toLowerCase()] = items;
        return accumilatore;
    },{})

    return categoryMap
}





export const createUserDocumentFromAuth = async (userAuth, additionalInfo={}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot.exists())

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        } catch (error) {
            console.log("Error creating the user", error.message)
        }
    }

    return userDocRef
}


export const createAuthUserWithEmail = async (email,password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}


export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signoutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)