import { FirebaseSignUp, firebaseLogIn, signOutFireBase, checkUserSignIn, checkUserLogInToFirebase, getAdsFromDb } from './firebase.js'
checkUserLogInToFirebase()
getAds();

// type module ki wja se function globally ni mlte isi lie window. lga krr js me function call krne honge jo bhi html me use horhe ho jese onclik k andr
window.login_page = function () {
    var logIn_container = document.getElementById("logIn_container")
    logIn_container.style.display = "inline-block";
}
window.signUp_page = function () {
    var signUp_container = document.getElementById("signUp_container")
    signUp_container.style.display = "inline-block";
    var logIn_container = document.getElementById("logIn_container")
    logIn_container.style.display = "none";
}
window.postAdd = function () {
    var add_btn = document.getElementById("add_btn")
    add_btn.href = "./addpost.html"
}
window.sweetalert = function (successfulMessage) {
    Swal.fire({
        icon: 'success',
        title: successfulMessage,
        showConfirmButton: false,
        timer: 1500
    })
}
window.signUpUser = async function () {
    let userName = document.getElementById("userName").value
    let userEmail = document.getElementById("userEmail").value
    let userPassword = document.getElementById("userPassword").value
    try {
        await FirebaseSignUp({ userName, userEmail, userPassword })
        sweetalert("sign Up sucessful");
        var signUp_container = document.getElementById("signUp_container")
        signUp_container.style.display = "none";


    } catch (e) {
        alert(e.message)
    }
}
window.signInUser = async function () {
    let userName = document.getElementById("loginEmail").value
    let userPassword = document.getElementById("loginPassword").value
    try {
        await firebaseLogIn(userName, userPassword)
        alert("sucessful login")
        // login hta kr logout icon dikhana
        document.getElementById("login_span").style.display = "none"
        document.getElementById("logOut_icon").style.display = "inline"

    } catch (e) {
        alert(e.message)
    }
}
// sigout
window.signOutUser = function () {
    signOutFireBase();
}

window.goToPostAdd = function () {
    try {
        checkUserSignIn(); // check user SignIn or Not 
    } catch (error) {
        error.message
    }
}
{
    /* <div class="card container mt-3 cards_div">
      <img src="./images/bike.jpeg" class="card-img-top cards_img" alt="...">
      <div class="card-body">
        <p class="card-text">Suzuki Bike (Model 2018) Genuine Condition</p>
        <h5 class="card-title">Rs 58,999</h5>
        <button class="detail_buttons">
          <a href="#" class="btn detail_btn">More Details</a>
        </button>
      </div> */}
async function getAds() {
    const ads = await getAdsFromDb();
    const adElem = document.getElementById('cards-container');

    for (let item of ads) {
        adElem.innerHTML += `
         <div class="card container mt-3 cards_div" onclick="goToDetail('${item.id}')">
            <img src=${item.imgUrl} class="card-img-top cards_img" alt="">
            <div class="card-body">
            <h5 class="card-title">Rs |${item.ad_price}</h5>
                 <p class="card-text">${item.ad_title}</p>
                 <p>${item.ad_location}</p>

                 <button class="detail_buttons">
                 <a href="#" class="btn detail_btn">More Details</a>
                 </button>
            </div>
         </div>

        `
    }
}
window.goToDetail = function(id){
    location.href = `./add_detail/adDetail.html?id=${id}`
}