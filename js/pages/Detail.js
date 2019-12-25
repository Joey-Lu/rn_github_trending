import React, {useState, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationUtil from '../navigator/NavigationUtil';

const TRENDING_URL = 'https://github.com/';
const THEME_COLOR = '#678';

const Detail = props => {
  const {navigation} = props;
  const [projectModes, setProjectModes] = useState(() => {
    return navigation.state.params.projectModes.item;
  });
  const [url, setUrl] = useState(() => {
    return projectModes.html_url || TRENDING_URL + projectModes.fullName;
  });

  const [title, setTitle] = useState(
    projectModes.full_name || projectModes.fullName,
  );
  const [canGoBack, setCanGoBack] = useState(false);
  const webRef = useRef();

  const onBack = () => {
    if (canGoBack) {
      webRef.goBack();
    } else {
      NavigationUtil.goBack(navigation);
    }
  };

  console.log(url)

  const handleNavigationChange = e => {
    setCanGoBack(e.canGoBack);
  };

  const getRightButton = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => this.onFavoriteButtonClick()}>
          <FontAwesome
            name={'star-o'}
            size={20}
            style={{color: 'white', marginRight: 10}}
          />
        </TouchableOpacity>
        {ViewUtil.getShareButton(() => {})}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <NavigationBar
        titleLayoutStyle={{paddingRight:30}}
        leftButton={ViewUtil.getLetBackButton(() => onBack())}
        title={title}
        style={{background: THEME_COLOR}}
        rightButton={getRightButton()}
      />
      <WebView
        ref={webRef}
        startInLoadingState={true}
        onNavigationStateChange={e => handleNavigationChange(e)}
        source={{uri: url}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Detail;
