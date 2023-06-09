import { Utils, Lightning, Language } from '@lightningjs/sdk'
import { ImageConstants } from '../../../constants/ImageConstants'
import { Colors } from '../../../constants/ColorConstants'
/**
 * 사이드 바에 각각의 메뉴에 대한 UI를 관장하는
 * @export
 * @class SideNavBarItem
 * @extends {Lightning.Component}
 * Renders SideNavBarItem Component
 */
export class SideNavBarItem extends Lightning.Component {
  /**
   * @static
   * @returns
   * @memberof SideNavBarItem
   * Renders the template
   */
  static _template() {
    return {
      HighLight: {
        w: 400,
        h: 80,
        //선택이 되었을 경우 해당 nav 메뉴의 백그라운드 이미지를
        src: Utils.asset(ImageConstants.SIDEBAR_SELECTION_GRADIENT),
        visible: false,
      },
      //이미지
      Icon: {
        x: 83,
        y: 15,
      },
      //텍스트.
      Label: {
        x: 180,
        y: 25,
      },
    }
  }

  /*
  자바 스트립트의 객체 property의 Getter와 Setter
  최신 자바스크립트에서 이를 위해서 get/set 키워드만
  붙여서 Getter / Setter를 정의 할 수 있게 추가되었다.
  따로 정의 되어져 있지는 않지만 JS는 아래와 같이 함수내에서 
  property 정의해서 사용할 수 있다.

  */
  /**
   * Set icons for respective menu item
   */
  set items(v) {
    console.log('Add sideNavBarItem [' + v.menuName + ']')
    this._menuName = v.menuName
    console.log('Add sideNavBarItem [' + v.iconNormal + ']')
    this._iconNormal = v.iconNormal
    this._iconSelected = v.iconSelected
    this._iconSelection = v.iconSelection
  }

  //_init() 함수내에서 Lable의 text 명을 넣어주고 Icon 에는 이미지를 넣어준다.
  _init() {
    this.patch({
      Label: {
        text: {
          text: Language.translate(this._menuName),
          fontSize: 24,
          textColor: Colors.LIGHT_WHITE,
          fontFace: 'Medium',
        },
      },
    })
    //각 메뉴의 icon의 이미지를 Icon 에 넣어준다.
    this.patch({ Icon: { src: Utils.asset(this._iconNormal) } })
  }

  /**
   * Focus on sidenavbar with expanded icon and highlight visible
   */
  _focus() {
    this.patch({ Icon: { src: Utils.asset(this._iconSelection), alpha: 1 } })
    this.patch({ HighLight: { visible: true } })
  }

  /**
   * Focus out of sidenavbar
   */
  _unfocus() {
    this.patch({ Icon: { src: Utils.asset(this._iconNormal) } })
    this.patch({ HighLight: { visible: false } })
  }
}
