import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { AccountsContainer, Title } from './accounts-page.styles';
import MusicServiceButton from './music-service-button';
import LinkedAccountsList from './linked-accounts-list';

const AccountsPage = () => {
  const [linkedAccounts, setLinkedAccounts] = useState({});
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchLinkedAccounts = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'linkedAccounts', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLinkedAccounts(docSnap.data());
        } else {
          console.log('No linked accounts found.');
        }
      }
    };
    fetchLinkedAccounts();
  }, [auth]);

  const handleDisconnect = async (service) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const response = await fetch(`/api/${service.toLowerCase()}Auth?action=logout&uid=${user.uid}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
  
        const data = await response.json();
        setLinkedAccounts((prev) => {
          const updatedAccounts = { ...prev };
          delete updatedAccounts[service];
          return updatedAccounts;
        });
        console.log(`${service} account disconnected.`, data);
      } catch (error) {
        console.error(`Error disconnecting ${service}:`, error);
      }
    }
  };

  return (
    <AccountsContainer>
      <Title>Linked Music Services</Title>
      <LinkedAccountsList linkedAccounts={linkedAccounts} onDisconnect={handleDisconnect} />
      <MusicServiceButton service="Spotify" />
      <MusicServiceButton service="Apple Music" />
      <MusicServiceButton service="YouTube Music" />
    </AccountsContainer>
  );
};

export default AccountsPage;