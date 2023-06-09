import { Lightning, Utils } from '@lightningjs/sdk'
import { ImageConstants } from '../../constants/ImageConstants'
//side menu bar UI 컴포넌트 모듈
import { SideNavBar } from './sideNavBar/SideNavBar'
import { trView } from './mainviews/trView'
import { flexboxView } from './mainviews/flexboxView'
import { ContainerInCompView } from './mainviews/ContainerInCompView'

/**
 *
 * @export
 * @class HomeScreen
 * @extends Lightning.Component
 * RDK-M UI Home Screen.Renders HomeScreen
 */
export class HomeScreen extends Lightning.Component {
  /**
   * @static
   * @returns
   * @memberof HomeScreen
   * Renders template
   */
  static _template() {
    return {
      //전체 화면
      TextureBg: {
        x: 0,
        y: 0,
        w: 1920,
        h: 1080,
      },

      TransitonView: {
        type: trView,
        visible: true,
      },

      SideNavBar: { type: SideNavBar },

      FlexBoxView: {
        /*
        x: 900,
        y: 500,
        text: { text: "To be Implemented FlexBoxView" },
        visible: false,
        */
        type: flexboxView,
        visible: false,
      },
      ContainerAniView: {
        /*
        x: 900,
        y: 500,
        text: { text: 'To be Implemented for ContainerAniView' },
        visible: false,
        */
        type: ContainerInCompView,
        visible: false,
      },
      SeminarAniView: {
        x: 900,
        y: 500,
        text: { text: 'To be Implemented SeminarAniView' },
        visible: false,
      },
      //자식 컴포넌트로 SettingsScreen 을 갖고 있다. 여기서 발생한 siganl을 보내주도록 설계되었다.
      AnimationsView: {
        x: 900,
        y: 500,
        text: { text: 'To be Implemented AnimationsView' },
        visible: false,
      },
    }
  }

  _init() {
    /**
     * DataService is called to add data in JSON files
     */
    console.log('HomeScreen _init()')
    //배경 이미지를 patch는 속성을 추가해 줄 수 있다.
    this.tag('TextureBg').patch({ src: Utils.asset(ImageConstants.TEXTURE) })

    this._setState('TransitonViewState') //첫 상태는 TransitonViewState
  }

  /**
   * * @param {*} menu
   * To switch between different screens
   * 하위 노드에서 이벤트를 발생해서 상위 노드에게 signal을 보낼 경우
   * fireAncestors 라는 함수가 존재하는데 여기에 인자로 첫번재 들어가는
   * signal의 이름을 prefix '$'를 붙인다음 signal 이름을 붙여야 한다.
   * 그럼 이를 받는 부모첫의 함수명도 동일하게 '$'포함한 signal 이름으로 함수가 구현되어져 있어야 한다.
   * SideNavBar.js 에서 함수에서 상태가 변경 경우
   *  this.fireAncestors('$setView', this.tag('MenuList').element._menuName)
   * 를 호출하여 부모에게 signal을 날리는데 HomeScreen.js에 아래의 함수가 구현되어져 있어야 정상처리된다.
   *
   *
   */
  //_handleEnter() SideNavBar에서 확인키 이벤트가 발생할 경우 이를 상위인 HomeScreen에게 signal을 해준다. 그래서 상태가 side -> 각 상태로 변경되고 ...
  $setView(menu) {
    console.log('hakisung: side상태에서 fireAncestors 함수를 호출하여 signal [' + menu + ']')
    switch (menu) {
      case 'TransitonView':
        this._setState('TransitonViewState')
        break
      case 'FlexBoxView':
        this._setState('FlexBoxViewState')
        break
      case 'ContainerAniView':
        this._setState('ContainerAniViewState')
        break
      case 'SeminarAniView':
        this._setState('SeminarAniViewState')
        break
      case 'AnimationsView':
        this._setState('AnimationsViewState')
        break
    }
  }

  /**
   * To goto side navigation bar //
   * 자식 컴포넌트인 SettingsScreen 에서 fireAncestors() 함수를 통해서 호출되면 상태를 변경해 준다.
   * 여기에서 보면
   * this.fireAncestors('$signalName', arg1, arg2... argx)
   * 여기에 보면 prefix 로 '$' 표시가 존재 한다, 해당 함수는 상위노드에 모두 동일하게 '구현되어져 있어야 한다.
   *
   */
  $setSideNav() {
    this._setState('SideNavState')
  }

  //_states() 의 함수내에서 각 상태로 변경될때 $enter() 함수가 호출되는데 이때 this.view = this.view = this.tag("TransitonView");
  //이렇게 함수를 호출하고 있다. 참 이상한 함수 호출이다.
  set view(currentview) {
    console.log('view func call currentview : ' + currentview)
    this.tag('TransitonView').visible = false
    this.tag('FlexBoxView').visible = false
    this.tag('ContainerAniView').visible = false
    this.tag('SeminarAniView').visible = false
    this.tag('AnimationsView').visible = false
    currentview.visible = true
  }

  /**
   * @static
   * @returns
   * @memberof HomeScreen
   * HomeScreen states
   *
   * init 함수내에서 HomeScreen 의 첫 상태는 GalleryState 설정하고 있다.
   */
  static _states() {
    return [
      class TransitonViewState extends this {
        $enter() {
          console.log('hakisung : TransitonViewState : enter')
          //해당 view의 visible을 true로 설정하기 위해서...
          this.view = this.tag('TransitonView')
          this.tag('SideNavBar')._highlight()
        }

        //주의 할점은 _getFocused는 반드시 하위 즉 자식 구성 요소를 반환해야 한다.
        _getFocused() {
          return this.tag('TransitonView')
        }

        _handleLeft() {
          console.log('hakisung :: TransitonViewState : handleLeft')
          this._setState('SideNavState') //상태가 변경되면 자동적으로
        }
        $exit() {}
      },
      class SideNavState extends this {
        $enter() {
          console.log('hakisung :: SideNavState : enter')
          this.tag('SideNavBar')._highlight()
          this.tag('SideNavBar')._setState('FocussedState') //
        }
        //side 상태일 경우에는 SideNavBar가 focus를 획득하게 되면 이렇게 되면 이전 componet의 _unfocus() 함수가 호출되게 된다.
        _getFocused() {
          return this.tag('SideNavBar')
        }
        $exit() {
          //$setView 함수에서 side 상태에서 각 세부 상태로 변경되면서 자동적으로 side 상태에대한 exit 함수가 호출되면서 side는 unfocus 상태로 진입
          console.log('hakisung :: SideNavState : exit')
          this.tag('SideNavBar')._setState('UnFocussedState')
        }
      },
      class FlexBoxViewState extends this {
        $enter() {
          this.view = this.tag('FlexBoxView')
          this.tag('SideNavBar')._highlight()
        }

        /*
        key 이벤트를 처리 하기 위해서, Lightning 은 어떤 componet가 활성화 되어는지를 확인해야 하는데 
        각각의 componet의 구성요소와 그 하위(=자식) componet를 focus path 라고 부른다.
        
        focus path는  App object의 _getFocused() 함수를 호출로 정해 진다. 

        만약 _getFocused() 함수에서 undefined 를 리턴하면 focus path 는 중지되고 
        App 자체에만 focus path가 할당된다.

        그러나 _getFocused() 함수에서 하위 즉 자식 componet의 를 반환하는 경우 리턴된 자식 component가 
        focus path에 추가되고 연결되며 연결된 componet가 또다른 하위 자식 componet가 있다면 이를 넘겨 줄 수 있있는
        이를 delegate focus 라고 부른다.
        */
        _getFocused() {
          console.log(
            'FlexBoxView 에게 focus path를 연결해 준다. 즉 sidebar에서 FlexBoxView 메뉴를 선택하면 focus path FlexBoxView 가 추가된다.',
          )
          return this.tag('FlexBoxView')
        }
        /* TO DO */
        _handleLeft() {
          this._setState('SideNavState')
        }
        $exit() {
          this.tag('SideNavBar')._setState('UnFocussedState')
        }
      },
      class ContainerAniViewState extends this {
        $enter() {
          this.view = this.tag('ContainerAniView')
          this.tag('SideNavBar')._highlight()
        }

        _getFocused() {
          return this.tag('ContainerAniView')
        }

        _handleLeft() {
          this._setState('SideNavState')
        }
        $exit() {
          this.tag('SideNavBar')._setState('UnFocussedState')
        }
      },
      class SeminarAniViewState extends this {
        $enter() {
          this.view = this.tag('SeminarAniView')
          this.tag('SideNavBar')._highlight()
        }
        /* TO DO */
        _handleLeft() {
          this._setState('SideNavState')
        }
        $exit() {
          this.tag('SideNavBar')._setState('UnFocussedState')
        }
      },
      class AnimationsViewState extends this {
        $enter() {
          this.view = this.tag('AnimationsView')
          this.tag('SideNavBar')._highlight()
        }

        /*
        _getFocused() {
          return this.tag("AnimationsView");
        }
        */

        _handleLeft() {
          this._setState('SideNavState')
        }

        $exit() {
          this.tag('SideNavBar')._setState('UnFocussedState')
        }
      },
    ]
  }
}
