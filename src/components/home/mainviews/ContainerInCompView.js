import { Lightning, Utils, Log } from '@lightningjs/sdk'
import { ImageConstants } from '../../../constants/ImageConstants'
import { Colors } from '../../../constants/ColorConstants'

export class ContainerInCompView extends Lightning.Component {
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
      color: Colors.PURPLE,

      Container1: {
        x: 10,
        y: 10,
        w: 500,
        h: 500,
        rect: true,
        clipping: true,
        color: Colors.MEDIUM_GREY,

        ImageCom1: {
          x: 2,
          y: 2,
          src: Utils.asset('images/logo.png'),
        },
      },

      Container2: {
        x: 600,
        y: 200,
        w: 500,
        h: 500,
        rect: true,
        clipping: true,
        color: Colors.YELLOW,

        ImageCom1: {
          x: 2,
          y: 2,
          src: Utils.asset('images/pink_t.png'),
        },
      },
    }
  }

  _init() {
    this._setState('ContainerInCompViewState')
    this._myAnimation1 = this.tag('Container1').animation({
      duration: 3,
      repeat: -1,
      stopMethod: 'immediate',
      actions: [
        {
          p: 'y',
          v: {
            0: { v: 450, sm: 0 },
            0.5: { v: 100, sm: 1 },
            1: { v: 450, sm: 0 },
          },
        },
      ],
    })

    this._myAnimation2 = this.tag('Container2').animation({
      duration: 3,
      repeat: -1,
      stopMethod: 'immediate',
      actions: [
        {
          p: 'x',
          v: { 0: 50, 0.25: 250, 0.5: 500, 0.75: 450, 1: 50 },
        },
      ],
    })
  }

  _focus() {
    console.log('ContainerInCompView: focus call')
    this.x = 230
    this.w = 1690
  }

  _unfocus() {
    console.log('ContainerInCompView: unfocus call')
    this.x = 440
    this.w = 1440
  }

  startAnimation() {
    //container1
    this.tag('Container1')
  }

  /**
   * @static
   * @returns
   * @memberof trView
   * trView States
   */
  static _states() {
    return [
      class ContainerInCompViewState extends this {
        $enter() {
          Log.info('ContainerInCompViewState enter')
        }

        _handleEnter() {
          this._myAnimation1.start()
          this._myAnimation2.start()
        }

        _handleRight() {
          this.startTransitions()
        }
      },
    ]
  }
}
