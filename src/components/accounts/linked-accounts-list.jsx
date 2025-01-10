import React from 'react';
import { ListContainer, ListItem, StatusText, LogoutButton } from './linked-accounts-list.styles';

const LinkedAccountsList = ({ linkedAccounts, onDisconnect }) => {
  return (
    <ListContainer>
      {Object.keys(linkedAccounts).map((service) => (
        <ListItem key={service}>
          {service}: <StatusText connected={linkedAccounts[service]}>Connected</StatusText>
          <LogoutButton onClick={() => onDisconnect(service)}>Disconnect</LogoutButton>
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default LinkedAccountsList;