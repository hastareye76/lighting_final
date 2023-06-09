import { Utils, Lightning } from '@lightningjs/sdk'
import { SideNavBarItem } from './SideNavBarItem'
import { ImageConstants } from '../../../constants/ImageConstants'
import { Colors } from '../../../constants/ColorConstants'
import { StringConstants } from '../../../constants/StringConstants'

/**
 * @export
 * @class SideNavBar
 * @extends {Lightning.Component}
 * Renders SideNavBar Component
 */
export class SideNavBar extends Lightning.Component {
  /**
   * @static
   * @returns
   * @memberof SideNavBar
   * Renders the template
   */
  static _template() {
    return {
      //배경화면을 보여주고 여기에 보이스 버튼을 넣어주었따.
      SideNavBg: {
        w: 180,
        h: 1080,
        rect: true,
        color: Colors.TRANSPARENT_BLACK,
        clipping: true,
        MenuList: {
          y: 296,
          itemSize: 100,
          w: 400,
          h: 800,
          //lightning sdk 에서 지원하고 있는 list 형태의 컴포넌트이다.
          type: Lightning.components.ListComponent,
          roll: true,
          rollMax: 0,
          rollMin: 0,
          horizontal: false,
          invertDirection: true,
        },
      },
    }
  }

  _init() {
    //lightning 의 ListComponent의 list에 items 에 항목을 추가한다.
    this.tag('MenuList').items = [
      {
        /**
         * Setting Icons for HOME,TV GUIDE,VOD,APPS,SETTINGS
         */
        menuName: StringConstants.TransitonView,
        iconNormal: ImageConstants.HOME_ICON_NORMAL,
        iconSelected: ImageConstants.HOME_ICON_SELECTED,
        iconSelection: ImageConstants.HOME_ICON_SELECTION,
      },
      {
        menuName: StringConstants.FlexBoxView,
        iconNormal: ImageConstants.TV_GUIDE_ICON_NORMAL,
        iconSelected: ImageConstants.TV_GUIDE_ICON_SELECTED,
        iconSelection: ImageConstants.TV_GUIDE_ICON_SELECTION,
      },
      {
        menuName: StringConstants.ContainerAniView,
        iconNormal: ImageConstants.VOD_ICON_NORMAL,
        iconSelected: ImageConstants.VOD_ICON_SELECTED,
        iconSelection: ImageConstants.VOD_ICON_SELECTION,
      },
      {
        menuName: StringConstants.SeminarAniView,
        iconNormal: ImageConstants.APPS_ICON_NORMAL,
        iconSelected: ImageConstants.APPS_ICON_SELECTED,
        iconSelection: ImageConstants.APPS_ICON_SELECTION,
      },
      {
        menuName: StringConstants.AnimationsView,
        iconNormal: ImageConstants.SETTINGS_ICON_NORMAL,
        iconSelected: ImageConstants.SETTINGS_ICON_SELECTED,
        iconSelection: ImageConstants.SETTINGS_ICON_SELECTION,
      },
    ].map((data, index) => {
      return {
        //JS의
        ref: 'SideNavBarItem_' + index,
        type: SideNavBarItem,
        items: data,
      }
    })
    this._setState('UnFocussedState')
  }

  /**
   * Sidenavbar Items under Highlight
   * Set selected icon and background
   */
  _highlight() {
    //선택되면 Icon 선택아이콘으로 변경되고 반투명 백그라운드가 그려준디,.
    this.tag('MenuList')
      .element.tag('Icon')
      .patch({
        src: Utils.asset(this.tag('MenuList').element._iconSelected),
      })
    this.tag('MenuList')
      .element.tag('HighLight')
      .patch({
        //반투명을 처리를 해준다.
        src: Utils.asset(ImageConstants.COLLAPSED_BACKGROUND),
        visible: true,
        alpha: 1,
      })
  }

  /**
   * Setting reduced width and background clipping for shrinked state
   */
  _shrinkedState() {
    this._highlight()
    this.tag('SideNavBg').w = 180
    this.tag('SideNavBg').clipping = true //sideNav 바를 넘어가는 그래픽은 안그려주기 위해서 clipping 속성을 줘야한다.
  }

  /**
   * Setting expanded width ,removing clipping ,highlight on item for expanded state of sidenavbar
   */
  _expandedState() {
    //
    //"images/menu/ExpandedmenuselectionGradient.png",
    this.tag('SideNavBg').w = 400
    this.tag('SideNavBg').clipping = false
    this.tag('MenuList')
      .element.tag('HighLight')
      .patch({
        src: Utils.asset(ImageConstants.SIDEBAR_SELECTION_GRADIENT),
      })
  }

  /**
   * @static
   * @returns
   * @memberof sidenavbar
   * Set Sidenavbar States
   */
  static _states() {
    return [
      class FocussedState extends this {
        $enter() {
          /**
           * Sets expanded state of sidenavbar on pressing enter key
           */
          this._expandedState()
        }
        $exit() {}
        /**
         * Directs to corresponding page on pressing enter on sidenavbar item
         * 선택되면 signal을 부모에게 보내준다.
         */
        _handleEnter() {
          this.fireAncestors('$setView', this.tag('MenuList').element._menuName)
        }
        /**
         * Navigate to next sidenavbar item on pressing down arrow key
         */
        _handleDown() {
          if (this.tag('MenuList').length - 1 != this.tag('MenuList').index) {
            this.tag('MenuList').setNext()
          }
        }
        /**
         * navigate to previous sidenavbar item on pressing up arrow key
         */
        _handleUp() {
          if (0 != this.tag('MenuList').index) {
            this.tag('MenuList').setPrevious()
          }
        }

        //
        _getFocused() {
          return this.tag('MenuList').element
        }
      },
      class UnFocussedState extends this {
        $enter() {
          //init 에서 side의 첫 상태는 요 상태로 진입한다.
          console.log('hakisung :: UnFocussedState')
          this._shrinkedState()
        }
        $exit() {}
      },
    ]
  }
}
