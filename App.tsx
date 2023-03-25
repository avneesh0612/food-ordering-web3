import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  CoinbaseWallet,
  MetaMaskWallet,
  RainbowWallet,
  ThirdwebProvider,
} from '@thirdweb-dev/react-native';
import React from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { cartState } from './src/atoms';
import Navbar from './src/components/Navbar';
import FoodList from './src/screens/FoodList';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <RecoilRoot>
      <ThirdwebProvider
        activeChain="mumbai"
        supportedWallets={[MetaMaskWallet, CoinbaseWallet, RainbowWallet]}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="home">
            <Stack.Screen
              name="home"
              component={HomeScreen}
              options={{ title: 'Welcome' }}
            />
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{ title: 'Cart' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThirdwebProvider>
    </RecoilRoot>
  );
};

const HomeScreen = ({ navigation }: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Navbar navigation={navigation} />
      <View style={styles.view}>
        <FoodList />
      </View>
    </SafeAreaView>
  );
};

const CartScreen = ({ navigation }: any) => {
  const cart = useRecoilValue(cartState);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Navbar navigation={navigation} />
      <View style={styles.view}>
        {cart.map(item => (
          <View key={item.id} style={styles.cartItem}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 50, height: 50 }}
            />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.quantity}>
              {item.quantity}×{item.price}
            </Text>
            <Text style={styles.price}>${item.price * item.quantity}</Text>
          </View>
        ))}
        <Text style={styles.total}>
          Total: $
          {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
        </Text>
        <Button title="Checkout" onPress={() => {}} color="#e19400" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
  },
  name: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    color: 'white',
  },
  quantity: {
    fontSize: 20,
    color: 'white',
  },
  cartItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e19400',
    marginTop: 20,
  },
});

export default App;
