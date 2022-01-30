/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {createContext, useMemo, useState} from 'react';
import uuid from 'react-native-uuid';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Cart} from './Cart';
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Checkout} from './Checkout';

export type Item = {
  id: string | number[];
  image?: string;
  sp: number;
  quantity: number;
};

// export const Items: Item[] = [
//   {
//     id: uuid.v4(),
//     image:
//       'https://i.ibb.co/3TDtKNX/anna-tukhfatullina-food-photographer-stylist-Mzy-Ojt-CI70-unsplash.jpg',
//     sp: 10,
//     quantity: 0,
//   },
//   {
//     id: uuid.v4(),
//     image: 'https://i.ibb.co/bdjX2Ts/anna-pelzer-IGf-IGP5-ONV0-unsplash.jpg',
//     sp: 5,
//     quantity: 0,
//   },
//   {
//     id: uuid.v4(),
//     image:
//       'https://i.ibb.co/3TDtKNX/anna-tukhfatullina-food-photographer-stylist-Mzy-Ojt-CI70-unsplash.jpg',
//     sp: 8,
//     quantity: 0,
//   },
// ];

export type ItemProps = {
  id: string | number[];
  image?: string;
  sp: number;
  quantity: number;
  total: number;
};

export type CartItemsProps = {
  total: number;
  items: ItemProps[];
};

const initialItems: CartItemsProps = {
  total: 0,
  items: [
    {
      id: uuid.v4(),
      image:
        'https://i.ibb.co/3TDtKNX/anna-tukhfatullina-food-photographer-stylist-Mzy-Ojt-CI70-unsplash.jpg',
      sp: 10,
      quantity: 0,
      total: 0,
    },
    {
      id: uuid.v4(),
      image: 'https://i.ibb.co/bdjX2Ts/anna-pelzer-IGf-IGP5-ONV0-unsplash.jpg',
      sp: 5,
      quantity: 0,
      total: 0,
    },
    {
      id: uuid.v4(),
      image:
        'https://i.ibb.co/3TDtKNX/anna-tukhfatullina-food-photographer-stylist-Mzy-Ojt-CI70-unsplash.jpg',
      sp: 8,
      quantity: 0,
      total: 0,
    },
  ],
};

const setCart: React.Dispatch<React.SetStateAction<CartItemsProps>> = () => {};

export const Context = createContext({cart: initialItems, setCart});

const Stack = createNativeStackNavigator();

const App = () => {
  const [cart, setCart] = useState(initialItems);

  const value = useMemo(() => ({cart, setCart}), [cart]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Context.Provider value={value}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Checkout" component={Checkout} />
          </Stack.Navigator>
        </NavigationContainer>
      </Context.Provider>

      {/* <Context.Provider value={value}>
        <Cart />
      </Context.Provider> */}
    </SafeAreaView>
  );
};

export default App;
