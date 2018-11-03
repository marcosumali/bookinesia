import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
const config = {
	apiKey: "AIzaSyCF_xIK2O7RH2HXG4HKI9tSY7jBy9KPMVI",
	authDomain: "bookinesia-com.firebaseapp.com",
	databaseURL: "https://bookinesia-com.firebaseio.com",
	projectId: "bookinesia-com",
	storageBucket: "bookinesia-com.appspot.com",
	messagingSenderId: "38560434326"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

// const db = firebase.firestore();
// const settings = {/* your settings... */ timestampsInSnapshots: true};
// db.settings(settings);

// db.collection('Shop').get()
// .then((snapshot) => {
//   // console.log('ini snapshot', snapshot)
//   snapshot.forEach((doc) => {
//     // console.log('ini doc',doc);
//     console.log('ini doc',doc.id, '=>', doc.data());
//   });
//   // dispatch(getDataReducer(snapshot))
// })
// .catch((err) => {
//   console.log('Error getting documents', err);
// });

export default firebase;
