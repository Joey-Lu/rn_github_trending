import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TimeSpan from '../model/TimeSpan';

export const timeSpans = [
  new TimeSpan('Today', 'since=daily'),
  new TimeSpan('This Week', 'since=weekly'),
  new TimeSpan('This Month', 'since=monthly'),
];

const TrendingDialog = props => {
  const {onShow, onDismiss, visible} = props;
  const {onClose, onSelect} = props;

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableOpacity style={styles.container} onPress={onDismiss}>
        <MaterialIcons size={36} style={styles.arrow} name={'arrow-drop-up'} />
        <View style={styles.content}>
          {timeSpans.map((result, i, arr) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => onSelect(arr[i])}
                underlayColor="transparent">
                <View style={styles.textWrapper}>
                  <Text style={styles.text}>{arr[i].showText}</Text>
                </View>
                {i !== timeSpans.length - 1 ? (
                  <View style={styles.divider} />
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,.6)',
    flex: 1,
    alignItems: 'center',
  },
  arrow: {
    marginTop: 40,
    color: '#fff',
    padding: 0,
    margin: -15,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 3,
    paddingTop: 3,
    paddingBottom: 3,
    marginRight: 3,
  },
  textWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    padding: 8,
    paddingLeft: 26,
    paddingRight: 26,
  },
  divider: {
    height: 1,
    backgroundColor: '#fafafa',
  },
});

export default TrendingDialog;
