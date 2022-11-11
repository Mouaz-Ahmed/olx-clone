import { getAdDetail} from "../firebase.js";
getAd();

function getAdId(){
    let UrlParams = new URLSearchParams(window.location.search);
    let id = UrlParams.get('id')
    return id;
}
async function getAd(){
    const adDetail = await getAdDetail();

    var detail_img = document.getElementById("detail_img")
    detail_img.src = `${adDetail.imgUrl}`;

    var detail_descrip = document.getElementById("detail_descrip")
    detail_descrip.innerText = `${adDetail.ad_description}`

    var add_price = document.getElementById("add_price")
    add_price.innerText = `${adDetail.ad_price}`

    

}
export {getAdId}