import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAX7KfD_VX1pSSlTAviKKE1Dr7a7wd_rTI",
	authDomain: "online-book-shop-react.firebaseapp.com",
	projectId: "online-book-shop-react",
	storageBucket: "online-book-shop-react.appspot.com",
	messagingSenderId: "276143217641",
	appId: "1:276143217641:web:848205b576efb785e04978"
  };

const app = initializeApp(firebaseConfig);
// const storage = getStorage(app, process.env.REACT_APP_BUCKET_URL);
const storage = getStorage(app);

console.log(storage);
export default storage;

// fetch all config values from .env file