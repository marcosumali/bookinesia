// import { db } from '../../../library/firebase/firebase.config';

export const getData = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('Shop').get()
    .then((snapshot) => {
      console.log('ini snapshot', snapshot)
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
      // dispatch(getDataReducer(snapshot))
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
  }
}

// const getDataReducer = (data) => {
//   return {
//     type: 'GET_DATA_SUCCESS',
//     payload: data
//   }
// }