import firebase, {firestore} from "firebase";
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCIh1CHK-Zgz19LzybbWZ-CQ1ObYw0GQAA",
    authDomain: "training-project-99e22.firebaseapp.com",
    databaseURL: "https://training-project-99e22.firebaseio.com",
    projectId: "training-project-99e22",
    storageBucket: "training-project-99e22.appspot.com",
    messagingSenderId: "41303657117",
    appId: "1:41303657117:web:6afdd68b4d40580cc22274",
    measurementId: "G-0DWS983T89"
};

firebase.initializeApp(config)

export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({prompt: 'select_account'})

export default firebase
export const auth = firebase.auth()
export const storage = firebase.storage()
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider).then(() => {})
export const createUserProfileDocument = async (userAuth, additionalProps) => {
    if (!userAuth) return;

    const userRef = await firestore().doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()

    if (!snapShot.exists) {
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({displayName, email, createdAt, ...additionalProps})
        } catch (error) {
            console.log(error.message)
        }
    }
    return userRef
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore().collection(collectionKey)
    
    const batch = firestore().batch()
    objectsToAdd.forEach(obj => {
        const docRef = collectionRef.doc()
        batch.set(docRef, obj)
    })
    
    return await batch.commit()
}

export const convertCollectionSnapshotToMap = (collections) => {
    const transformCollection = collections.docs.map(doc => {
        const {title, items} = doc.data()
        
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
    return transformCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection
        return accumulator
    }, {})
}



