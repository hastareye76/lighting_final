import { Lightning, Utils, Log } from '@lightningjs/sdk'
import { ImageConstants } from '../../../constants/ImageConstants'
import { Colors } from '../../../constants/ColorConstants'

//이상하다. App에는 하나의 default 만을 사용해야하는 것인가?
//그것이 아니다.
/*
default를 붙여서 export를 해주면 이를 받아서 사용하는 측에서는 {} 없이 import 구문을 사용해야한다. 이를 defualt export라고 부른다.
*/
export class trView extends Lightning.Component {
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
      color: Colors.YELLOW,

      Object1: {
        x: 10,
        y: 10,
        src: Utils.asset('images/blue_p.png'),
      },

      Object2: {
        x: 10,
        y: 210,
        src: Utils.asset('images/pink_p.png'),
      },

      Object3: {
        x: 10,
        y: 410,
        src: Utils.asset('images/yellow_p.png'),
      },
    }
  }

  _init() {
    this._setState('trViewState')
  }

  _focus() {
    console.log('trView: focus call')
    this.x = 230
    this.w = 1690
  }

  _unfocus() {
    console.log('trView: unfocus call')
    this.x = 440
    this.w = 1440
  }

  startTransitions() {
    //Face candidates to the right
    this.setCandidatesDirection('right')

    //Start transitions
    this.tag('Object1').setSmooth('x', 500)
    this.tag('Object2').setSmooth('x', 500, { duration: 2 })
    this.tag('Object3').patch({
      smooth: {
        x: [500, { duration: 2.5, delay: 1, timingFunction: 'ease-out' }],
      },
    })
  }

  resetTransitions() {
    //Face candidates to the left
    this.setCandidatesDirection('left')

    //Start transitions
    this.tag('Object1').patch({
      smooth: {
        x: [10, { duration: 0.5, delay: 0.2, timingFunction: 'ease-in' }],
      },
    })
    this.tag('Object2').patch({
      smooth: {
        x: [10, { duration: 0.5, delay: 0.4, timingFunction: 'ease-in' }],
      },
    })
    this.tag('Object3').patch({
      smooth: {
        x: [10, { duration: 0.5, delay: 0.6, timingFunction: 'ease-in' }],
      },
    })
  }

  setCandidatesDirection(direction) {
    let dir = direction === 'left' ? -1 : 1
    this.tag('Object1').scaleX = dir
    this.tag('Object2').scaleX = dir
    this.tag('Object3').scaleX = dir
  }

  /**
   * @static
   * @returns
   * @memberof GalleryView
   * GalleryView States
   */
  static _states() {
    return [
      class trViewState extends this {
        $enter() {
          Log.info('trViewState enter')
        }

        _handleEnter() {
          this.resetTransitions()
        }

        _handleRight() {
          this.startTransitions()
        }
      },
    ]
  }
}
