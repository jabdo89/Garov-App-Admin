import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, List, ListItem } from '@ui-kitten/components';
import BottomModal from 'templates/bottom-modal';
import { Title } from './elements';

const Modal = ({ visible, onClose, guias }) => {
  const [selected, setSelected] = useState([]);
  const scannedArray = Object.entries(guias);

  const save = async () => {
    onClose();
  };
  return (
    <BottomModal visible={visible} onClose={onClose}>
      <Title category="h6">Detalle de Paquetes</Title>
      <List
        data={scannedArray}
        renderItem={({ item }) => (
          <>
            <ListItem
              onPress={() => console.log('hi')}
              style={{
                backgroundColor: selected.includes(item[0]) ? 'rgba(255, 103, 95, 0.5)' : null,
                margin: 1,
              }}
              title={item[0].substring(item[0].length - 6)}
              accessoryLeft={(props) => (
                <>
                  {item[1] === false ? (
                    <Icon {...props} name="close-circle" fill="red" />
                  ) : (
                    <Icon {...props} name="checkmark-circle-2" fill="green" />
                  )}
                </>
              )}
              accessoryRight={(props) => (
                <>{item[1] === false ? <Icon {...props} name="trash-2" fill="red" /> : null}</>
              )}
            />
          </>
        )}
      />
      <Button
        onPress={save}
        appearance="outline"
        style={{ marginTop: 10 }}
        disabled={selected.length === 0}
      >
        Eliminar Paquetes
      </Button>
    </BottomModal>
  );
};

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
