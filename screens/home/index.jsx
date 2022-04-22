import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Container } from './elements';

const Agenda = () => {
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    // query();
  }, []);

  return (
    <>
      <Container pt={top}>
        <View>
          <Text />
        </View>
      </Container>
    </>
  );
};

Agenda.propTypes = {};

export default Agenda;
