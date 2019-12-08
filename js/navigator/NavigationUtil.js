export default class NavigationUtil {
  static resetToHomePage(params) {
    const {navigation} = params;
    navigation.navigate('Main');
  }

  static goBack(navigation) {
    navigation.goBack();
  }

  static toPage(params, page) {
    const navigation = NavigationUtil.navigation;
    if (!navigation) {
      console.log('NavigationUtil.navigation cannot be null');
      return;
    }
    navigation.navigate(page, {
      ...params,
    });
  }
}
