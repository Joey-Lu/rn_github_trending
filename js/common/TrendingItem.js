import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HTMLView from 'react-native-htmlview';

const FavoriteButton = props => {
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={{padding: 6}}
      underlayColor={'transparent'}>
      <FontAwesome name="star-o" size={26} style={{color: 'red'}} />
    </TouchableOpacity>
  );
};

const TrendingItem = props => {
  const {item, onSelect} = props;
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.container}>
        <Text style={styles.title}>{item.fullName}</Text>
        <HTMLView
          value={`<p>${item.description}</p>`}
          stylesheet={{
            p: styles.description,
            a: styles.description,
          }}
        />
        <Text style={styles.description}>{item.meta}</Text>
        <View style={styles.row}>
          <View style={styles.row}>
            <Text>Developed by:</Text>
            {item.contributors.map((result, i, arr) => {
              return (
                <Image
                  key={i}
                  style={{height: 22, width: 22, margin: 2}}
                  source={{uri: arr[i]}}
                />
              );
            })}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Start:</Text>
            <Text>{item.starCount}</Text>
          </View>
          <FavoriteButton />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#dddddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121',
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575',
  },
});

export default TrendingItem;
