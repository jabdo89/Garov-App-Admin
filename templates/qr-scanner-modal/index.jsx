import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Icon, Text } from '@ui-kitten/components';
import {
  CloseButton,
  Container,
  PermissionsContainer,
  RequestAccessButton,
  Scanner,
  TitleContainer,
} from './elements';

const QRScannerModal = ({ title, subtitle, visible, onClose, onScanned, ...rest }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { top } = useSafeAreaInsets();

  const requestPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    if (visible) setScanned(false);
  }, [visible]);

  const handleBarCodeScanned = (scan) => {
    setScanned(true);
    onScanned(scan);
    onClose();
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} {...rest}>
      <Container pt={top}>
        <TitleContainer>
          <View>
            <Text category="h5">{title}</Text>
            <Text appearance="hint">{subtitle}</Text>
          </View>
          <CloseButton
            appearance="ghost"
            status="danger"
            onPress={onClose}
            accessoryLeft={(props) => <Icon {...props} name="close-outline" />}
          />
        </TitleContainer>
      </Container>
      {hasPermission === null && (
        <PermissionsContainer>
          <Text>Solicitando permisos para usar la cámara</Text>
        </PermissionsContainer>
      )}
      {hasPermission === false && (
        <PermissionsContainer>
          <Text>No has autorizado el acceso a tu cámara</Text>
          <RequestAccessButton onPress={requestPermissions}>Autorizar acceso</RequestAccessButton>
        </PermissionsContainer>
      )}
      {hasPermission && <Scanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} />}
    </Modal>
  );
};

QRScannerModal.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onScanned: PropTypes.func.isRequired,
};

export default QRScannerModal;
