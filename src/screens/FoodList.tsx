import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import FoodCard from '../components/foodCard';
import { foodItems } from '../data/items';

const FoodList = () => {
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={foodItems}
        renderItem={({ item }) => <FoodCard item={item} />}
        contentContainerStyle={styles.list}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  list: {
    marginTop: 20,
    width: '100%',
    paddingBottom: 200,
  },
});

export default FoodList;
