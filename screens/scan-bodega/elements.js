import styled from 'styled-components/native';
import { Button, Layout } from '@ui-kitten/components';
import { BarCodeScanner } from 'expo-barcode-scanner';

const Container = styled(Layout)`
  padding: 20px;
  padding-top: ${(props) => (props.pt || 0) + 20}px;
`;

const PermissionsContainer = styled(Layout)`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  padding-top: ${(props) => (props.pt || 0) + 20}px;
`;

const Row = styled(Layout)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleContainer = styled(Layout)`
  flex-direction: row;
`;

const CloseButton = styled(Button)`
  margin-left: auto;
`;

const RequestAccessButton = styled(Button)`
  margin-top: 20px;
`;

const Scanner = styled(BarCodeScanner)`
  width: 100%;
  flex-grow: 1;
`;

export {
  Container,
  TitleContainer,
  CloseButton,
  Row,
  PermissionsContainer,
  RequestAccessButton,
  Scanner,
};
