import React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Home from '@screens/home';
import ScanBodega from '@screens/scan-bodega';
import RouteClient from '@screens/route-client';
import ManifestoCarga from '@screens/manifesto-carga';
import ScanRoute from '@screens/scan-route';
import ScanManifesto from '@screens/scan-manifesto';
import ScanLlegadaBodega from '@screens/scan-llegada-bodega';

const { Navigator: BottomNavigator, Screen: BottomScreen } = createBottomTabNavigator();

const BottomBar = ({ navigation, state }) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
      style={{
        paddingBottom: bottom,
        paddingTop: 20,
        backgroundColor: '#FFFFFF',
      }}
    >
      <BottomNavigationTab title="Home" icon={(props) => <Icon {...props} name="home" />} />
    </BottomNavigation>
  );
};

const Main = () => {
  return (
    <BottomNavigator tabBar={(props) => <BottomBar {...props} />}>
      <BottomScreen name="Home" component={Home} />
      <BottomScreen name="Scan-Bodega" component={ScanBodega} />
      <BottomScreen name="Route-Client" component={RouteClient} />
      <BottomScreen name="Manifesto-Carga" component={ManifestoCarga} />
      <BottomScreen name="Scan-Route" component={ScanRoute} />
      <BottomScreen name="Scan-Manifesto" component={ScanManifesto} />
      <BottomScreen name="Scan-Llegada-Bodega" component={ScanLlegadaBodega} />
    </BottomNavigator>
  );
};

BottomBar.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
};

export default Main;
