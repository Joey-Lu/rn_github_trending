import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BaseItem = props => {
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);

  const setFavoriteState = val => {
    props.projectModes.isFavorite = val;
    setIsFavorite(val);
  };

  const onPressFavorite = () => {
    setFavoriteState(!isFavorite);
    props.onFavorite(props.projectModes.item, !isFavorite);
  };

  return (
    <TouchableOpacity
      style={{padding: 6}}
      underlayColor="transparent"
      onPress={onPressFavorite}>
      <FontAwesome
        name={isFavorite ? 'star' : 'star-o'}
        size={26}
        style={{color: '#678'}}
      />
    </TouchableOpacity>
  );
};

export default BaseItem;
