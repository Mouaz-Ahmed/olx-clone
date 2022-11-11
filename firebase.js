import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getFirestore, doc, setDoc, addDoc ,collection,getDocs } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-storage.js";
import {getAdId} from "./add_detail/app.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByJ7D6wetdbPQywORkeCKER1BPQM55FxA",
  authDomain: "olx-smit-8300c.firebaseapp.com",
  projectId: "olx-smit-8300c",
  storageBucket: "olx-smit-8300c.appspot.com",
  messagingSenderId: "681591794671",
  appId: "1:681591794671:web:d6bba3982a8a6fe1eea41a",
  measurementId: "G-SXYHFVGZS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

async function FirebaseSignUp(userInfo) {
  const { userEmail, userPassword } = userInfo
  const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword)
  await addUserToDb(userInfo, userCredential.user.uid)
}

function addUserToDb(userInfo, userId) {
  const { userEmail, userName } = userInfo;
  return setDoc(doc(db, "users", userId), { userEmail, userName })
}
// signIn User
function firebaseLogIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)

  // Assync-await me change kia he upar

  // .then((userCredential) => {
  //   const user = userCredential.user;
  //   alert("login successful")
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   alert(errorMessage);
  // });
}
function signOutFireBase() {
  signOut(auth).then(() => {
    alert("signOut Successfuk")
    document.getElementById("login_span").style.display = "inline"
    document.getElementById("logOut_icon").style.display = "none"
  }).catch((error) => {
    alert(error.message)
  })
}
function checkUserSignIn() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      var add_btn = document.getElementById("add_btn")
      add_btn.href = './add_post/adPost.html';
    } else {
      alert("logIn First")
    }
  })
}

function checkUserLogInToFirebase() {
  onAuthStateChanged(auth, (user) => {  // check user logIn or not
    if (user) {
      document.getElementById("logOut_icon").style.display = "inline"
      document.getElementById("login_span").style.display = "block"
    } else {
      document.getElementById("login_span").style.display = "inline"
      document.getElementById("login_span").style.display = "block"
    }
  })
}
// add Post 
async function uploadImage(adImg) {
  const storageRef = ref(storage, `images/${adImg.name}`);
  const snapshot = await uploadBytes(storageRef, adImg);
  const url = await getDownloadURL(snapshot.ref);
  return url;

}
function adPostToDb(ad_title, ad_description, ad_price, ad_location, imgUrl) {
  const userId = auth.currentUser.uid
  return addDoc(collection(db, 'ads'), { ad_title, ad_description, ad_price, ad_location, imgUrl, userId })
}

// get ads from Db
async function getAdsFromDb(){
  const querySnapshot = await getDocs(collection(db,'ads'));
  const ads = []

  querySnapshot.forEach((doc) =>{
    ads.push({id: doc.id, ...doc.data()})
  })
  return ads
}

async function getAdDetail(){
  const querySnapshot = await getDocs(collection(db,'ads'));
  let ads;
  const adId = getAdId();

  querySnapshot.forEach((doc) =>{
    if(doc.id == adId){
      ads = {id: doc.id, ...doc.data()}
    }
  })
  return ads
}
export { FirebaseSignUp, firebaseLogIn, signOutFireBase, checkUserSignIn, checkUserLogInToFirebase, uploadImage, adPostToDb ,getAdsFromDb ,getAdDetail}