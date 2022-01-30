import React, {FC} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {ItemProps, Context, CartItemsProps} from './App';
import {Card} from './Card';

const ItemInfo: FC<{cartItem: ItemProps}> = ({cartItem}) => {
  return (
    <Card>
      <View style={styles.cardInfo}>
        <Card.CardImage url={cartItem.image ?? ''} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Card.Title>Cheezo Garlic Sticks</Card.Title>
          <Text style={{marginLeft: 10, fontSize: 16, fontWeight: 'bold'}}>
            {cartItem.quantity}
          </Text>
          <Text style={{marginLeft: 10, fontSize: 16}}>for</Text>
          <Text style={{marginLeft: 10, fontSize: 16, fontWeight: 'bold'}}>
            ${cartItem.total}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export const Checkout: FC = () => {
  const {cart} = React.useContext(Context);

  const finalCart: CartItemsProps = {
    ...cart,
    items: cart.items.filter(item => item.quantity > 0),
  };

  // console.log('cart----->', cart);

  return (
    <FlatList
      data={finalCart.items}
      renderItem={({item}) => <ItemInfo cartItem={item} />}
      keyExtractor={item => item.id as string}
      contentContainerStyle={{paddingBottom: 95}}
    />
  );
};

const styles = StyleSheet.create({
  cardInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  userInfo: {
    padding: 10,
  },

  heading: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 14,
    textAlign: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

  itemSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: '#444',
  },
});
