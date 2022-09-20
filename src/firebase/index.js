import fb from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { firebaseConfig } from "../config";
fb.initializeApp(firebaseConfig);

// utils
const db = fb.firestore();
const auth = fb.auth();

// Helpful Methods -> Ref
const colorRef = db.collection("colors").doc("color1");
const setColor = color => colorRef.set({ value: color });
window.setColor = setColor;

const { Timestamp, GeoPoint } = fb.firestore;

// export utils/refs
export { fb, db, auth, colorRef, setColor, Timestamp, GeoPoint };
