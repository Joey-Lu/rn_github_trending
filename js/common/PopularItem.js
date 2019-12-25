import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import BaseItem from './BaseItem';

const PopularItem = props => {
  const {projectModes, onSelect, onFavorite} = props;
  const [item, setItem] = useState(projectModes.item);

  useEffect(() => {
    setItem(projectModes.item);
  }, [projectModes]);

  return (
    <TouchableOpacity onPress={onSelect}>
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
          <BaseItem
            projectModes={projectModes}
            isFavorite={projectModes.isFavorite}
            onFavorite={onFavorite}
          />
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
