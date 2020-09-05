import firebase from "firebase";
import 'firebase/storage'
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



