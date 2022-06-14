/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Alert, View } from 'react-native';
import firebase from 'firebase';
import { Icon, Text } from '@ui-kitten/components';
import { useFocusEffect } from '@react-navigation/native';
import {
  CloseButton,
  Container,
  PermissionsContainer,
  RequestAccessButton,
  Scanner,
  TitleContainer,
} from './elements';

const ScanLlegadaBodega = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
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

    if (!stopScan) {
      setStopScan(true);
      db.collection('Guias')
        .where('delivery', '==', data.substring(0, data.length - 3))
        .onSnapshot((querySnapshot) => {
          const info = [];
          // eslint-disable-next-line func-names
          querySnapshot.forEach((doc) => {
            info.push(doc.data());
            if (info[0].estatus === 'En Corrida') {
              db.collection('Guias')
                .doc(doc.id)
                .update({
                  estatus: 'Documentado',
                })
                .then(() => {
                  Alert.alert('Guia Escaneada', 'Continue Escaneando', [
                    { text: 'Entendido', onPress: () => setStopScan(false) },
                  ]);
                });
            } else {
              Alert.alert('Cuidado', 'Esta Guia no se deberia de escanear', [
                { text: 'Entendido', onPress: () => setStopScan(false) },
              ]);
            }
          });
        });
    }
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
          </View>
          <CloseButton
            appearance="ghost"
            status="danger"
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
      {hasPermission && <Scanner onBarCodeScanned={stopScan ? undefined : handleBarCodeScanned} />}
    </>
  );
};

export default ScanLlegadaBodega;
