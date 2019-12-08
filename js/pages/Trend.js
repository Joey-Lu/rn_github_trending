import React from 'react';
import {View, Text, Button} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action';

const Trend = props => {
  const {navigation, onThemeChange} = props;
  return (
    <View>
      <Text>trend</Text>
      <Button title="change color" onPress={() => onThemeChange('#096')} />
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Trend);
