import styled from 'styled-components';

export const ListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
`;

export const ListItem = styled.li`
  background-color: #e9ecef;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #495057;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StatusText = styled.span`
  font-weight: bold;
  color: ${props => (props.connected ? '#28a745' : '#dc3545')};
`;

export const LogoutButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;