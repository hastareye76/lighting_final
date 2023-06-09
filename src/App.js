import { Lightning, Utils, Log, Storage } from '@lightningjs/sdk'
import { HomeScreen } from './components/home/HomeScreen'

export default class App extends Lightning.Component {
  /**
   * Fonts to be used in accelerator UI
   */
  static getFonts() {
    console.log('hakisung getFonts')
    return [
      { family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') },
      { family: 'Medium', url: Utils.asset('fonts/Roboto-Medium.ttf') },
      { family: 'Bold', url: Utils.asset('fonts/Roboto-bold.ttf') },
    ]
  }

  /**
   * Language Support.
   * Define language specific string in locale/locale.json
   */
  static language() {
    console.log('hakisung language')
    return {
      file: Utils.asset('locale/locale.json'),
      language: Storage.get('selectedLanguage') || 'en',
    }
  }

  //HomeScreen 즉 메인 화면을 구성하는 template 정의 하였다.
  //UI 구성상 HomeScreen은 side navigation 부분과 설정된 메뉴의 세부 사항을 보여주는 galleryView 로 구성되어져 있다.
  //어플의 UI에 구조에 맞게 디렉토리 구조를 잡는다.
  //component 폴더를 만들고  home / HomeScreen 이 존재하고
  static _template() {
    console.log('hakisung _template')
    return {
      HomeScreen: { type: HomeScreen, visible: true },
    }
  }

  //App의 lifecycle 에서 호출되는 함수 테스트
  _setup() {
    console.log('hakisung _setup')
  }

  _attach() {
    console.log('hakisung _attach')
  }

  _firstEnable() {
    console.log('hakisung _firstEnable')
  }

  _init() {
    //App을 정보를 보여주기 위해서 데이타를 읽어오는 부분이다.
    console.log('hakisung _init')

    //App의 초기 상태는 HomeScreen 상태이다.
    //_state 함수내에서 상태를 정의 해줘야 한다.
    this._setState('HomeScreen')
  }

  /**
   * Function to define the different states of the Accelerator App.
   * 상태정의 함수 내에서 _getFocused 함수를 정의해서 v
   */
  static _states() {
    return [
      class HomeScreen extends this {
        //_init 함수내에서 상태를 HomeScreen 상태로 설정하였다.
        $enter() {
          Log.info('HomeScreen State')
          this.visible = true
          this.tag('HomeScreen').visible = true
        }
        //focuse를 획득하기 위해서
        _getFocused() {
          return this.tag('HomeScreen')
        }
        //App의 상태가 HomeScreen 상태를 벗어나게 되면 자동적으로 호출된다. HomeScreen의 visible을  off한다.
        $exit() {
          this.tag('HomeScreen').visible = false
        }
      },
    ]
  }
}
