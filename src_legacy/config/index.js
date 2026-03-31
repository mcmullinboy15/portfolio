const PRODUCTION = process.env.NODE_ENV === "production";

const firebaseConfig = {
  apiKey: "AIzaSyCkJRCVPqv62c3gNKh_mTvav5UtxVrLz5E",
  authDomain: "mcmullin-xyz.firebaseapp.com",
  projectId: "mcmullin-xyz",
  storageBucket: "mcmullin-xyz.appspot.com",
  messagingSenderId: "989116093314",
  appId: "1:989116093314:web:d4a5740a42e0c1177e759b"
};

export { PRODUCTION, firebaseConfig };
