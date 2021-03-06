<template>
  <component :is="type" :multiple="multiple" 
    :max-size="multiple ? maxSize : undefined"
    :disabled="disabled" :label="label" :value="value" @change="onChange"
  >
    <slot></slot>
  </component>
</template>

<script lang="babel">
import MDCNativeSelect from './mdc-native-select.vue'
import MDCMenuSelect from './mdc-menu-select.vue'
import MDCMultiSelect from './mdc-multi-select.vue'

const media = new class {
  get mobile () {
    return this._mobile || (this._mobile =
      window.matchMedia('(max-width: 600px) and (pointer: coarse)'))
  }
}()

export default {
  name: 'mdc-select',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    'multiple': Boolean,
    'value': [String, Array],
    'disabled': Boolean,
    'label': String,
    'max-size': {
      type: [String, Number],
      default: 8
    }
  },
  provide () {
    return {mdcSelect: this}
  },
  components: {
    'mdc-native-select': MDCNativeSelect,
    'mdc-menu-select': MDCMenuSelect,
    'mdc-multi-select': MDCMultiSelect
  },
  data () {
    return {
      mobile: (window) ? media.mobile.matches : true
    }
  },
  computed: {
    type () {
      return this.multiple ? 'mdc-multi-select'
        : this.native ? 'mdc-native-select'
          : 'mdc-menu-select'
    },
    native () {
      return this.multiple || this.mobile
    }
  },
  methods: {
    onChange (value) {
      this.$emit('change', value)
    },
    refreshMedia () {
      this.mobile = media.mobile.matches
    }
  },
  beforeMount () {
    media.mobile.addListener(this.refreshMedia)
    this.refreshMedia()
  },
  beforeDestroy () {
    media.mobile.removeListener(this.refreshMedia)
  }
}
</script>
