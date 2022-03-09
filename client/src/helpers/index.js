import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../fbconfig";

export const uploadImage = async (path) => {
    // if (userProfileData.profileImagereference) {
    //     let res = await storage()
    //         .ref(userProfileData.profileImagereference)
    //         .delete()
    //         .catch((err) => console.log(err));
    //     console.log(res, 'yaha hai boss');
    // }
    try {

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', path, true);
            xhr.send(null);
        });


        let randomName =
            '/VenueImages/venue' + Math.floor(Math.random() * 10000000);

        const storageRef = ref(storage, randomName);

        let res = await uploadBytes(storageRef, path).then(async (snapshot) => {
            let res = await getDownloadURL(storageRef)

            console.log("res download", res)
            return res
        });



        return {
            url: res, ref: randomName, err: false
        }


    } catch (error) {

        return {
            err: true
        }


    }

    // let res = await storage()
    //     .ref(randomName)
    //     .put(blob)
    //     .then(async (snapshot) => {
    //         let res = await storage()
    //             .ref(randomName)
    //             .getDownloadURL()
    //             .then((url) => {
    //                 //from url you can fetched the uploaded image easily
    //                 return url;
    //             })
    //             .catch((e) =>
    //                 console.log('getting downloadURL of image error => ', e),
    //             );

    //         //You can check the image is now uploaded in the storage bucket
    //         return res;
    //     })
    //     .catch((e) => console.log('uploading image error => ', e));

    // return { url: res, profilereference: randomName };
};


export function convertHMS(value) {
    const sec = parseInt(value / 1000, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - hours * 3600) / 60);
    let seconds = sec - hours * 3600 - minutes * 60;
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    // return minutes + ':' + seconds; // Return is MM : SS

    return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
}
export function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}