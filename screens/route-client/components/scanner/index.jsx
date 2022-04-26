import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Alert, View } from 'react-native';
import firebase from 'firebase';
import { Icon, Text, Button } from '@ui-kitten/components';
import Modal from './components/modal';
import {
  CloseButton,
  Container,
  PermissionsContainer,
  RequestAccessButton,
  Scanner,
  TitleContainer,
  Row,
} from './elements';

const InitialDeliveriesScanModal = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedCount, setScannedCount] = useState(0);
  const [stopScan, setStopScan] = useState(false);
  const [scanned, setScanned] = useState([]);
  const { top } = useSafeAreaInsets();

  const [isModalOpen, toggleModal] = useState(false);

  const requestPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    const db = firebase.firestore();
  };

  return (
    <>
      <Container pt={top}>
        <TitleContainer>
          <View>
            <Text category="h5">Escanear Guias</Text>
            <Row style={{ marginTop: 20 }}>
              <Text category="h6">Llevas {scannedCount}</Text>
              <Button onPress={() => toggleModal(true)} size="small" appearance="outline">
                Detalle
              </Button>
            </Row>
          </View>
          <CloseButton
            appearance="ghost"
            status="danger"
            onPress={() => navigation.goBack()}
            accessoryLeft={(props) => <Icon {...props} name="close-outline" />}
          />
        </TitleContainer>
        <Modal visible={isModalOpen} onClose={() => toggleModal(false)} scanned={scanned} />
      </Container>
      {hasPermission === null && (
        <PermissionsContainer>
          <Text>Requesting for camera permission</Text>
        </PermissionsContainer>
      )}
      {hasPermission === false && (
        <PermissionsContainer>
          <Text>No access to camera</Text>
          <RequestAccessButton onPress={requestPermissions}>Give access</RequestAccessButton>
        </PermissionsContainer>
      )}
      {hasPermission && <Scanner onBarCodeScanned={stopScan ? undefined : handleBarCodeScanned} />}
    </>
  );
};

export default InitialDeliveriesScanModal;
