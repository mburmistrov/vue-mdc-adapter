<template>
  <a class="mdc-toolbar__icon--menu"
    :class="{'material-icons':!!icon}"
    @click="dispatchEvent">
    <slot>{{icon}}</slot>
  </a>
</template>

<script lang="babel">
import {DispatchEventMixin} from '../util'

export default {
  name: 'mdc-toolbar-menu',
  mixins: [DispatchEventMixin],
  props: {
    icon: {type: String, 'default': "menu"}
  }
}
</script>
