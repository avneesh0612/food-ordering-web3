import type { FC } from 'react';
import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { Item } from '../types/Item';
import { useRecoilState } from 'recoil';
import { CartItem, cartState } from '../atoms';

interface IFoodCard {
  item: Item;
}

const FoodCard: FC<IFoodCard> = ({ item }) => {
  const [cart, setCart] = useRecoilState(cartState);

  const cartItem = cart.find(cartItem => cartItem.id === item.id) as CartItem;

  return (
    <View style={styles.wrapper}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={{ uri: item.image }} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>${item.price}</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>{item.description}</Text>
      </View>

      {cart.find(cartItem => cartItem.id === item.id) ? (
        <View style={styles.textWrapper}>
          <Button
            title="Increase"
            color="#e19400"
            onPress={() => {
              setCart([
                ...cart.filter(cartItem => cartItem.id !== item.id),
                { ...item, quantity: cartItem.quantity + 1 },
              ]);
            }}
          />

          <Text style={styles.subtitle}>
            {cart.find(cartItem => cartItem.id === item.id)?.quantity}
          </Text>

          <Button
            title="Decrease"
            color="#e19400"
            onPress={() => {
              if (cartItem.quantity === 1) {
                setCart([...cart.filter(cartItem => cartItem.id !== item.id)]);
              } else {
                setCart([
                  ...cart.filter(cartItem => cartItem.id !== item.id),
                  { ...item, quantity: cartItem.quantity - 1 },
                ]);
              }
            }}
          />
        </View>
      ) : (
        <Button
          title="Add to Cart"
          color="#e19400"
          onPress={() => {
            setCart([...cart, { ...item, quantity: 1 }]);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    marginBottom: 15,
    alignItems: 'center',
    width: 250,
  },
  imageWrapper: {
    marginRight: 10,
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
    color: '#fafafa',
  },
});

export default FoodCard;
