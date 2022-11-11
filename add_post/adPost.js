import { uploadImage, adPostToDb} from "../firebase.js"
window.postad = async function () {
    let ad_title = document.getElementById("ad_title").value
    let ad_description = document.getElementById("ad_description").value
    let ad_price = document.getElementById("ad_price").value
    let ad_location = document.getElementById("ad_location").value
    let adImg = document.getElementById("ad_file").files[0];
    try {
        const imgUrl = await uploadImage(adImg);
        await adPostToDb(ad_title, ad_description, ad_price, ad_location, imgUrl)
        alert('succesful')
    } catch (e) {
        alert(e.message)
    }
}
