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
}

firebase.initializeApp(config)

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})

export default firebase
export const auth = firebase.auth()
export const storage = firebase.storage()
export const signInWithGoogle = () => auth.signInWithPopup(provider).then(() => {})
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



