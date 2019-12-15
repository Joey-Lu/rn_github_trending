import React from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import NavigationBar from '../common/NavigationBar';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AboutMe = props => {
  const getRightButton = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => {}}>
          <View style={{padding: 5, marginRight: 8}}>
            <Feather name="search" siez={24} style={{color: '#fff'}} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const getLeftButton = callback => {
    return (
      <TouchableOpacity
        style={{padding: 8, paddingLeft: 12}}
        onPress={callback}>
        <Ionicons name={'ios-arrow-back'} size={26} style={{color: '#fff'}} />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <NavigationBar
        title="About Me"
        statusBar={{background: '#678', barStyle: 'light-content'}}
        leftButton={getLeftButton()}
        rightButton={getRightButton()}
      />
      <Text>Aboutme </Text>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AboutMe);
