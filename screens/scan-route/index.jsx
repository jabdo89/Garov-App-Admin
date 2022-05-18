/* eslint-disable react/prop-types */
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

const ScanRoute = ({
  navigation,
  route: {
    params: { onFinish = () => {} },
  },
}) => {
  const { top } = useSafeAreaInsets();
  const [hasPermission, setHasPermission] = useState(null);

  const [scannedCount, setScannedCount] = useState(0);
  const [guiasCount, setGuiasCount] = useState(0);

  const [stopScan, setStopScan] = useState(false);
  const [scanned, setScanned] = useState([]);
  const [guias, setGuias] = useState([]);
  const [guiasData, setGuiasData] = useState([]);
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

    if (!stopScan) {
      setStopScan(true);
      db.collection('Guias')
        .where('delivery', '==', data.substring(0, data.length - 3))
        .onSnapshot((querySnapshot) => {
          const info = [];
          // eslint-disable-next-line func-names
          querySnapshot.forEach((doc) => {
            info.push(doc.data());
            if (info[0].estatus !== 'Documentado') {
              Alert.alert('Cuidado', 'Esta Guia no se ha documentado', [
                { text: 'Entendido', onPress: () => setStopScan(false) },
              ]);
            } else {
              if (!guias.includes(data.substring(0, data.length - 3))) {
                setGuias([...guias, data.substring(0, data.length - 3)]);
                setGuiasData([...guiasData, info]);
                setGuiasCount(guiasCount + 1);
              }
              if (scanned.includes(data)) {
                Alert.alert('Cuidado', 'Esta Guia ya fue escaneada', [
                  { text: 'Entendido', onPress: () => setStopScan(false) },
                ]);
              } else {
                setScanned([...scanned, data]);
                setScannedCount(scannedCount + 1);
                Alert.alert('Guia escaneada', 'Continue escaneando', [
                  { text: 'Entendido', onPress: () => setStopScan(false) },
                ]);
              }
            }
          });
          if (querySnapshot.empty) {
            Alert.alert('Cuidado', 'Esta Guia no existe', [
              { text: 'Entendido', onPress: () => setStopScan(false) },
            ]);
          }
        });
    }
  };

  const submit = () => {
    onFinish(guiasData);
    navigation.goBack();
  };
  return (
    <>
      <Container pt={top}>
        <TitleContainer>
          <View>
            <Text category="h5">Escanear Codigo de Barras</Text>
            <Row style={{ marginTop: 20 }}>
              <View>
                <Text category="h6">Paquetes: {scannedCount}</Text>
                <Text category="h6">Guias: {guiasCount}</Text>
              </View>
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
        <Modal visible={isModalOpen} onClose={() => toggleModal(false)} guias={guias} />
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
      <Button
        style={{ position: 'absolute', top: '90%', alignSelf: 'center' }}
        onPress={() => submit()}
      >
        Finalizar Escaneo
      </Button>
    </>
  );
};

export default ScanRoute;
