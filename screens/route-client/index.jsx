/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { useAuth } from '@providers/auth';
import { View, Text } from 'react-native';
import shortid from 'shortid';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Select, SelectItem, IndexPath, Radio, RadioGroup, Button } from '@ui-kitten/components';
import { Content, SigninButton, Title } from './elements';

const RouteClient = () => {
  const { top } = useSafeAreaInsets();
  const { navigate } = useNavigation();
  const { user } = useAuth();

  const [operadores, setOperadores] = useState([]);
  const [operadoresIndex, setOperadoresIndex] = useState(new IndexPath(0));

  const [unidades, setUnidades] = useState([]);
  const [unidadesIndex, setUnidadesIndex] = useState(new IndexPath(0));
  const [corridaIndex, setCorridaIndex] = useState(new IndexPath(0));

  const [guias, setGuias] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();

    const query = async () => {
      db.collection('Operadores')
        .where('adminID', '==', user.userID)
        .onSnapshot((querySnapshot) => {
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
      db.collection('Unidades')
        .where('adminID', '==', user.userID)
        .onSnapshot((querySnapshot) => {
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
  const submit = async () => {
    const db = firebase.firestore();
    const guiasArray = [];
    for (let i = 0; i < guias.length; i++) {
      guiasArray.push(guias[i][0].id);
    }
    const id = shortid.generate();

    db.collection('Corridas')
      .doc(id)
      .set({
        id,
        guias: guiasArray,
        estatus: 'activo',
        fecha: new Date(),
        adminID: user.userID,
        numCorrida: 'pending',
        operador: operadores[operadoresIndex.row].userID,
        tipo: corridaIndex === 0 ? 'Corrida a Cliente' : 'Corrida a Bodega',
        unidad: unidades[unidadesIndex.row].id,
      })
      .then(() => {
        for (let i = 0; i < guiasArray.length; i++) {
          let info = null;
          db.collection('Guias')
            .doc(guiasArray[i])
            .get()
            .then((doc) => {
              info = doc.data();
              const tempArray = info.eventos;

              tempArray.push({
                statusid: 4,
                status: 'En Corrida',
                fecha: new Date(),
              });
              db.collection('Guias').doc(guiasArray[i]).update({
                estatus: 'En Corrida',
                eventos: tempArray,
              });
            });
        }
        setGuias([]);
        navigate('Home');
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  };

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
      <Text>Tipo de Corrida</Text>
      <RadioGroup
        selectedIndex={corridaIndex}
        onChange={(index) => setCorridaIndex(index)}
        style={{ marginBottom: 20 }}
      >
        <Radio>Cliente</Radio>
        <Radio>Bodega</Radio>
      </RadioGroup>
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
      <Text style={{ fontSize: 18 }}>Guias Escaneadas : {guias?.length}</Text>

      <Button
        appearance="ghost"
        onPress={() =>
          navigate('Scan-Route', {
            onFinish: setGuias,
          })
        }
      >
        Escanear Guias
      </Button>
      <SigninButton onPress={() => submit()} disabled={guias?.length === 0}>
        Crear Corrida
      </SigninButton>
    </Content>
  );
};

export default RouteClient;
