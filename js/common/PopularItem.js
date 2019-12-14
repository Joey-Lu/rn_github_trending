import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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

const PopularItem = props => {
  const {item, onSelect} = props;
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.container}>
        <Text style={styles.title}>{item.full_name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.row}>
          <View style={styles.row}>
            <Text>Author:</Text>
            <Image
              style={{height: 22, width: 22}}
              source={{uri: item.owner.avatar_url}}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Start:</Text>
            <Text>{item.stargazers_count}</Text>
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

export default PopularItem;
