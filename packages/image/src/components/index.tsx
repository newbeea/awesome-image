import { defineComponent, isVue2 } from 'vue-demi'
import ImageComponent from './ImageComponent'

export default defineComponent({
  name: 'AsImage',
  components: {
    ImageComponent,
  },
  inheritAttrs: false,
  setup() {},
  render() {
    if (isVue2) {
      const loading = () => {
        return this.$slots.loading
          ? <template slot="loading">
            {this.$slots.loading}
          </template>
          : null
      }
      return (

        <ImageComponent { ...{ props: this.$attrs }} { ...{ on: this.$listeners }}
          { ...{
            scopedSlots: {
              webglfilter: this.$scopedSlots.webglfilter,
            },
          }
          }
        >
          {loading()}
        </ImageComponent>
      )
    }
    else {
      return (
        <ImageComponent {...this.$attrs} v-slots={this.$slots}>
        </ImageComponent>
      )
    }
  },
})
