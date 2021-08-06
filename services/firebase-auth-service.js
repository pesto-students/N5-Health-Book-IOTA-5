import firebaseAuth from '../firebase/firebaseClient';



export const signInWithEmailAndPassword = async (email, password) =>
    await firebaseAuth.auth().signInWithEmailAndPassword(email, password);

export const createUserWithEmailAndPassword = async (email, password) =>
    await firebaseAuth.auth().createUserWithEmailAndPassword(email, password);

export const signOut = async () =>
    await firebaseAuth.auth().signOut().then(clear);

