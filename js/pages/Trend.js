import React from 'react';
import {View, Text, Button} from 'react-native';

const Trend = props => {
  const {navigation} = props; 
  return (
    <View>
      <Text>trend</Text>
      <Button
        title="change color"
        onPress={() => {
          navigation.setParams({
            theme: {
              tintColor: 'red',
              updateTime: new Date().getTime(),
            },
          });
        }}
      />
    </View>
  );
};

export default Trend;
