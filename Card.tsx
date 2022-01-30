import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

type TitleComponent = FC;

type SubtitleComponent = FC;

type CardImageComponent = FC<{url: string}>;

type CardComponent = FC & {Title: TitleComponent} & {
  Subtitle: SubtitleComponent;
} & {CardImage: CardImageComponent};

export const Card: CardComponent = ({children}) => {
  return <View style={styles.card}>{children}</View>;
};

const CardImage: CardImageComponent = ({url}) => {
  return (
    <Image
      style={styles.userImage}
      source={{
        uri: url,
      }}
    />
  );
};

const Title: TitleComponent = ({children}) => {
  return <Text style={styles.title}>{children}</Text>;
};

const Subtitle: SubtitleComponent = ({children}) => {
  return <Text style={styles.subtitle}>{children}</Text>;
};

Card.Title = Title;
Card.Subtitle = Subtitle;
Card.CardImage = CardImage;

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 10,
    borderColor: '#a2a8a3',
    marginTop: 2,
    borderRadius: 10,
    borderWidth: 2,
    margin: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  subtitle: {
    fontSize: 14,
  },

  userImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
});
