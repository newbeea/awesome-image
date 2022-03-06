import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  name: 'Counter',
  setup(props, context) {
    const count = ref(0)
    return {
      count,
    }
  },
  render() {
    const add = () => this.count += 1
    return (
      <button type="button" onClick={add}>
        count is: { this.count }
      </button>
    )
  },
})
