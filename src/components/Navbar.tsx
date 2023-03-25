import { ConnectWallet } from '@thirdweb-dev/react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { cartState } from '../atoms';

const NavBar = ({ navigation }: any) => {
  const cart = useRecoilValue(cartState);

  return (
    <View style={styles.navbar}>
      <ConnectWallet />
      <Text onPress={() => navigation.navigate('Cart')}>
        Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    height: 80,
    backgroundColor: '#e19400',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
});

export default NavBar;
