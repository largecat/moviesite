import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
import { db } from '../Firebase';
import { doc, getDoc } from 'firebase/firestore/lite';

const UserData = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [docs, setDocs] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const [wantMovies, setWantMovies] = useState([]);

  useEffect(() => {
    const getUserDocs = async () => {
      const docRef = doc(db, 'users');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data: ', docSnap.data());
      } else {
        console.log('user doc not found');
      }
    };
    return getUserDocs();
  });
};

export default UserData;
