import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Icon, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { Content, Input, SigninButton, Title } from './elements';

const RouteClient = () => {
  const { top } = useSafeAreaInsets();
  const { navigate } = useNavigation();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [operadores, setOperadores] = useState([]);
  const [operadoresIndex, setOperadoresIndex] = useState(new IndexPath(0));

  const [unidades, setUnidades] = useState([]);
  const [unidadesIndex, setUnidadesIndex] = useState(new IndexPath(0));

  useEffect(() => {
    const db = firebase.firestore();

    const query = async () => {
      db.collection('Operadores').onSnapshot((querySnapshot) => {
        const info = [];
        let data = {};
        // eslint-disable-next-line func-names
        querySnapshot.forEach((doc) => {
          data = doc.data();
          info.push(data);
        });
        setOperadores(info);
      });
    };

    query();
  }, []);

  useEffect(() => {
    const db = firebase.firestore();

    const query = async () => {
      db.collection('Unidades').onSnapshot((querySnapshot) => {
        const info = [];
        let data = {};
        // eslint-disable-next-line func-names
        querySnapshot.forEach((doc) => {
          data = doc.data();
          info.push(data);
        });
        setUnidades(info);
      });
    };

    query();
  }, []);

  const submit = async () => {};

  return (
    <Content pt={top}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 40,
          marginBottom: 40,
        }}
      >
        <Title category="h5" style={{ color: 'black' }}>
          Crear Corrida
        </Title>
      </View>
      <Text>Operador</Text>
      <Select
        size="large"
        value={operadores[operadoresIndex.row]?.nombre}
        selectedIndex={operadoresIndex}
        onSelect={(index) => setOperadoresIndex(index)}
        style={{ marginBottom: 20 }}
      >
        {operadores.map((category) => {
          return <SelectItem title={category.nombre} />;
        })}
      </Select>
      <Text>Unidad</Text>
      <Select
        size="large"
        value={unidades[unidadesIndex.row]?.tipoUnidad}
        selectedIndex={unidadesIndex}
        onSelect={(index) => setUnidadesIndex(index)}
        style={{ marginBottom: 20 }}
      >
        {unidades.map((category) => {
          return <SelectItem title={category.tipoUnidad} />;
        })}
      </Select>
      <Input
        size="large"
        autoCapitalize="none"
        value={form.email}
        autoCompleteType="email"
        label="Correo"
        placeholder="Ingresa tu correo electrónico"
        accessoryLeft={(props) => <Icon {...props} name="person-outline" />}
        onChangeText={(nextValue) => setForm({ ...form, email: nextValue })}
      />

      <SigninButton
        onPress={() =>
          navigate('InitialDeliveriesScanModal', {
            onFinish: () =>
              //     setValues({ ...values, qrScannedAt: moment().valueOf() }),
              //   deliveries: route?.stops[route?.currentStop]?.drops,
              console.log('hi'),
          })
        }
      >
        Escanear Guias
      </SigninButton>
    </Content>
  );
};

export default RouteClient;
