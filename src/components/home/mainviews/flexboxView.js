import { Lightning, Utils, Log } from '@lightningjs/sdk'
import { ImageConstants } from '../../../constants/ImageConstants'
import { Colors } from '../../../constants/ColorConstants'

//이상하다. App에는 하나의 default 만을 사용해야하는 것인가?
//그것이 아니다.
/*
default를 붙여서 export를 해주면 이를 받아서 사용하는 측에서는 {} 없이 import 구문을 사용해야한다. 이를 defualt export라고 부른다.
*/
export class flexboxView extends Lightning.Component {
  /**
   * @static
   * @returns
   * @memberof trView
   * Renders the template
   */
  static _template() {
    return {
      x: 232,
      y: 296,
      w: 1690,
      h: 1000,
      rect: true,
      clipping: true,
      color: Colors.DIM_GREY,

      Wrapper: {
        x: 50,
        y: 50,
        w: 250,
        flex: { direction: 'row', padding: 20, wrap: true },
        rect: true,
        color: 0xff2d2d2d,
        paddingLeft: 200,
        Item1: {
          w: 50,
          h: 100,
          flexItem: { margin: 10 },
          rect: true,
          color: 0xff797979,
        },
        Item2: {
          w: 50,
          h: 100,
          flexItem: { margin: 10 },
          rect: true,
          color: 0xffa7a7a7,
        },
        Item3: {
          w: 50,
          h: 100,
          flexItem: {
            margin: 10,
            alignSelf: 'stretch',
            grow: 1,
            maxWidth: 190,
            maxHeight: 100,
          },
          rect: true,
          color: 0xffd3d3d3,
        },
        Item4: {
          w: 90,
          h: 50,
          flexItem: {
            margin: 10,
            alignSelf: 'stretch',
            grow: 1,
            maxWidth: 230,
            maxHeight: 100,
          },
          rect: true,
          color: 0xff74b4a7,
        },

        Sub: {
          flex: { direction: 'column', padding: 20 },
          flexItem: {
            margin: 10,
            alignSelf: 'stretch',
            grow: 1,
            maxWidth: 380,
          },
          rect: true,
          color: 0xff486f67,
          children: [
            { text: { text: 'line 1' } },
            { text: { text: 'line 2' } },
            { text: { text: 'line 3' } },
            { text: { text: 'line 4' } },
          ],
        },
      }, //
    }
  }

  _init() {
    this._setState('trViewState')
    this._myFlexAnimation = this.tag('Wrapper').animation({
      duration: 4,
      repeat: -1,
      stopMethod: 'immediate',
      actions: [{ p: 'w', v: { 0: 250, 0.5: 700, 1: 250 } }],
    })
    this._myFlexAnimation.start()
  }

  _focus() {
    this.x = 230
    this.w = 1690
  }

  _unfocus() {
    this.x = 440
    this.w = 1440
  }
}
