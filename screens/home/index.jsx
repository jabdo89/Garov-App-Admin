import React, { useEffect } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { useAuth } from '@providers/auth';
import { Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { Container } from './elements';

const Agenda = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation();
  useEffect(() => {
    // query();
  }, []);

  return (
    <>
      <Container>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '20%',
            backgroundColor: 'blue',
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              marginLeft: 20,
              marginTop: '10%',
              fontWeight: '800',
            }}
            strong
          >
            Hola, {user.nombre} Admin
          </Text>
          <Text style={{ color: 'white', fontSize: 15, marginLeft: 20 }}>
            ¿Listo para Escanear?
          </Text>
        </View>
        <ScrollView style={{ height: '80%' }}>
          <View style={{ margin: 10 }}>
            <Button
              appearance="ghost"
              onPress={() => navigate('Manifesto-Carga')}
              style={{
                borderRadius: 10,
                borderColor: 'black',
                display: 'flex',
                padding: 0,
                height: 180,
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Image
                  style={{ width: 150, height: 150, borderRadius: 10 }}
                  // eslint-disable-next-line global-require
                  source={require('./imgs/home_deliver.jpg')}
                />

                <View style={{ marginLeft: 20 }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: 'black',
                      marginTop: 20,
                      fontSize: 15,
                      width: '30%',
                    }}
                  >
                    Manifesto de Carga
                  </Text>
                  <Text
                    style={{
                      fontWeight: '300',
                      color: 'black',
                      fontSize: 10,
                      width: '40%',
                      marginTop: 5,
                    }}
                  >
                    Generar Manifesto de Carga, para poder cargar los paquetes a las unidades
                  </Text>
                </View>
              </View>
            </Button>
          </View>
          <View style={{ margin: 10 }}>
            <Button
              appearance="ghost"
              onPress={() => navigate('Scan-Bodega')}
              style={{
                borderRadius: 10,
                borderColor: 'black',
                display: 'flex',
                padding: 0,
                height: 180,
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Image
                  style={{ width: 150, height: 150, borderRadius: 10 }}
                  // eslint-disable-next-line global-require
                  source={require('./imgs/home_deliver.jpg')}
                />

                <View style={{ marginLeft: 20 }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: 'black',
                      marginTop: 20,
                      fontSize: 15,
                      width: '30%',
                    }}
                  >
                    Escanear Guias a Bodega
                  </Text>
                  <Text
                    style={{
                      fontWeight: '300',
                      color: 'black',
                      fontSize: 10,
                      width: '30%',
                      marginTop: 5,
                    }}
                  >
                    Escanea las Guias para confirmar que esten listas para ser documentadas y
                    enviadas a los clientes.
                  </Text>
                </View>
              </View>
            </Button>
          </View>
          <View style={{ margin: 10 }}>
            <Button
              appearance="ghost"
              onPress={() => navigate('Route-Client')}
              style={{
                borderRadius: 10,
                borderColor: 'black',
                display: 'flex',
                padding: 0,
                height: 180,
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Image
                  style={{ height: 150, width: 150, marginRight: 20, borderRadius: 10 }}
                  // eslint-disable-next-line global-require
                  source={require('./imgs/home_enviar.jpg')}
                />
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: 'black',
                      marginTop: 20,
                      fontSize: 15,
                      width: '80%',
                    }}
                  >
                    Crear Corrida
                  </Text>
                  <Text
                    style={{
                      fontWeight: '300',
                      color: 'black',
                      fontSize: 10,
                      width: '80%',
                      marginTop: 5,
                    }}
                  >
                    Crea una corrida a cliente o bodega
                  </Text>
                </View>
              </View>
            </Button>
          </View>
          <View style={{ margin: 10 }}>
            <Button
              appearance="ghost"
              onPress={() => navigate('Scan-Llegada-Bodega')}
              style={{
                borderRadius: 10,
                borderColor: 'black',
                display: 'flex',
                padding: 0,
                height: 180,
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Image
                  style={{ height: 150, width: 150, marginRight: 20, borderRadius: 10 }}
                  // eslint-disable-next-line global-require
                  source={require('./imgs/home_enviar.jpg')}
                />
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: 'black',
                      marginTop: 20,
                      fontSize: 15,
                      width: '70%',
                    }}
                  >
                    Escanear Llegada a Bodega
                  </Text>
                  <Text
                    style={{
                      fontWeight: '300',
                      color: 'black',
                      fontSize: 10,
                      width: '80%',
                      marginTop: 5,
                    }}
                  >
                    Escanear Llegada a Bodega
                  </Text>
                </View>
              </View>
            </Button>
          </View>
        </ScrollView>
      </Container>
    </>
  );
};

Agenda.propTypes = {};

export default Agenda;
