import React, {FC, useCallback, useMemo} from 'react';
import {Button, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {CartItemProps, Context, CartProps} from './App';
import Icon from 'react-native-vector-icons/FontAwesome';
import {addItem, removeItem} from './utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './Routes';

const CartItem: FC<{
  cartItem: CartItemProps;
  setCart: React.Dispatch<React.SetStateAction<CartProps>>;
}> = ({cartItem, setCart}) => {
  const handleItemRemove = useCallback(
    () =>
      setCart(cart => {
        console.log({cart});
        return removeItem(cart, cartItem);
      }),
    [cartItem],
  );

  const handleItemAdd = useCallback(
    () =>
      setCart(cart => {
        return addItem(cart, cartItem);
      }),
    [cartItem],
  );

  return (
    <View style={styles.item}>
      <Image
        source={{
          uri: `${cartItem.image}`,
        }}
        style={styles.itemImage}
      />
      <View style={styles.totalPrice}>
        <Text style={{fontSize: 25}}>${cartItem.total}</Text>
      </View>
      <View style={styles.itemAction}>
        <View>
          <Icon
            name="minus"
            style={styles.icon}
            onPress={cartItem.quantity > 0 ? handleItemRemove : () => {}}
          />
        </View>
        <View>
          <Text style={styles.quantity}>{cartItem.quantity}</Text>
        </View>
        <View>
          <Icon name="plus" style={styles.icon} onPress={handleItemAdd} />
        </View>
      </View>
    </View>
  );
};

const ItemSeparator = () => {
  return <View style={styles.itemSeparator}></View>;
};

type CartComponentProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Cart'>;
};

export const Cart: FC<CartComponentProps> = ({navigation}) => {
  const {cart, setCart} = React.useContext(Context);
  console.log('cart state changed:', cart);

  const isDisabled = useMemo(() => {
    return cart.total > 0;
  }, [cart]);

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.payableAmt}>Payable amount: ${cart.total}</Text>
        </View>

        <FlatList
          data={cart.items}
          renderItem={({item}) => (
            <CartItem cartItem={item} setCart={setCart} />
          )}
          keyExtractor={item => item.id as string}
          ItemSeparatorComponent={() => <ItemSeparator />}
          contentContainerStyle={{paddingBottom: 95}}
          //   ListFooterComponent={() => (
          //     <View style={{marginTop: 10, position: 'absolute', bottom: 0}}>
          //       <Button
          //         onPress={() => {}}
          //         title="Checkout"
          //         color="#03fc0f"
          //         accessibilityLabel="Learn more about this purple button"
          //       />
          //     </View>
          //   )}
        />
        <View
          style={{
            display: 'flex',
            position: 'absolute',
            height: 58,
            width: '100%',
            bottom: 0,
          }}>
          <Button
            onPress={() => navigation.navigate('Checkout')}
            title="Checkout"
            color="#03fc0f"
            accessibilityLabel="Learn more about this purple button"
            disabled={!isDisabled}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  payableAmt: {
    fontSize: 20,
    padding: 10,
  },
  item: {
    display: 'flex',
    fontWeight: '600',
    flexDirection: 'column',
    borderWidth: 0.8,
    borderColor: 'grey',
    borderRadius: 5,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebf7f7',
    width: 300,
  },
  itemAction: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  icon: {
    fontSize: 20,
  },
  itemImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemSeparator: {
    // marginVertical: 8,
    // borderBottomColor: '#737373',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  quantity: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 5,
    borderWidth: 1,
    borderRadius: 2,
    marginRight: 15,
    marginLeft: 15,
    width: 50,
    textAlign: 'center',
    color: 'black',
  },

  totalPrice: {
    display: 'flex',
    alignSelf: 'center',
  },

  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
