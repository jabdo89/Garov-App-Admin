import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Alert, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import firebase from 'firebase';
import { Icon, Text } from '@ui-kitten/components';
import {
  CloseButton,
  Container,
  PermissionsContainer,
  RequestAccessButton,
  TitleContainer,
  Row,
} from './elements';

// eslint-disable-next-line react/prop-types
const InitialDeliveriesScanModal = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedCount, setScannedCount] = useState(0);
  const [stopScan, setStopScan] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const { top } = useSafeAreaInsets();

  const requestPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setIsFocus(true);
      return () => {
        setIsFocus(false);
      };
    }, [])
  );

  const handleBarCodeScanned = async ({ data }) => {
    const db = firebase.firestore();
    setStopScan(true);
    db.collection('Guias')
      .where('delivery', '==', data.substring(0, data.length - 3))
      .onSnapshot((querySnapshot) => {
        const info = [];

        // eslint-disable-next-line func-names
        if (querySnapshot.empty) {
          Alert.alert('Cuidado', 'Esta Guia no existe en el sistema', [
            { text: 'Entendido', onPress: () => setStopScan(false) },
          ]);
          return;
        }
        querySnapshot.forEach((doc) => {
          info.push(doc.data());

          if (info[0].estatus === 'Creado') {
            if (info[0].escaneadas?.includes(data)) {
              Alert.alert('Cuidado', 'Esta Guia ya fue escaneada', [
                { text: 'Entendido', onPress: () => setStopScan(false) },
              ]);
            } else if (
              (info[0].escaneadas ? info[0].escaneadas.length + 1 : 1) ===
              // eslint-disable-next-line radix
              parseInt(info[0].cantidadPqte)
            ) {
              const scannedArray = info[0].escaneadas ? info[0].escaneadas : [];
              scannedArray.push(data);
              db.collection('Guias')
                .doc(info[0].id)
                .update({ estatus: 'Escaneado', escaneadas: scannedArray })
                .then(() => {
                  setScannedCount(scannedCount + 1);
                  Alert.alert('Guia Escaneada', 'Se escaneo la guia correctamente', [
                    { text: 'Entendido', onPress: () => setStopScan(false) },
                  ]);
                });
            } else {
              const scannedArray = info[0].escaneadas ? info[0].escaneadas : [];
              scannedArray.push(data);
              db.collection('Guias')
                .doc(info[0].id)
                .update({ escaneadas: scannedArray })
                .then(() => {
                  setScannedCount(scannedCount + 1);
                  Alert.alert('Guia Escaneada', 'Se escaneo la guia correctamente', [
                    { text: 'Entendido', onPress: () => setStopScan(false) },
                  ]);
                });
            }
          } else {
            Alert.alert('Cuidado', 'Esta Guia ya fue escaneada', [
              { text: 'Entendido', onPress: () => setStopScan(false) },
            ]);
          }
        });
      });
  };

  if (!isFocus) {
    return <></>;
  }

  return (
    <>
      <Container pt={top}>
        <TitleContainer>
          <View>
            <Text category="h5">Escanear Guias</Text>
            <Row style={{ marginTop: 20 }}>
              <Text category="h6">Llevas {scannedCount}</Text>
            </Row>
          </View>
          <CloseButton
            appearance="ghost"
            status="danger"
            // eslint-disable-next-line react/prop-types
            onPress={() => navigation.goBack()}
            accessoryLeft={(props) => <Icon {...props} name="close-outline" />}
          />
        </TitleContainer>
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

      {hasPermission && (
        <BarCodeScanner
          onBarCodeScanned={stopScan ? undefined : handleBarCodeScanned}
          style={{ width: '100%', flex: 1 }}
        />
      )}
    </>
  );
};

export default InitialDeliveriesScanModal;
