<template>
  <nav class="mdc-tab-bar" :class="classes">
    <slot></slot>
    <span ref="indicator" class="mdc-tab-bar__indicator" 
      :style="indicatorStyles"></span>
  </nav>  
</template>

<script lang="babel">
import MDCTabBarFoundation from '@material/tabs/tab-bar/foundation'
import MDCTabFoundation from '@material/tabs/tab/foundation'

export default {
  props: {
    'indicator-primary': Boolean,
    'indicator-accent': Boolean
  },
  data () {
    return {
      classes: {
        'mdc-tab-bar--indicator-primary': this.indicatorPrimary,
        'mdc-tab-bar--indicator-accent': this.indicatorAccent
      },
      indicatorStyles: {},
      tabs: []
    }
  },
  methods: {
    onSelect ({detail}) {
      const {tab} = detail
      const index = this.tabs.indexOf(tab)
      if (index < 0) {
        throw new Error('mdc-tab-bar internal error: index not found')
      }
      this.foundation.switchToTabAtIndex(index, true)
    }
  },
  mounted () {
    this.foundation = new MDCTabBarFoundation({
      addClass: (className) =>
        this.$set(this.classes, className, true),
      removeClass: (className) =>
        this.$delete(this.classes, className),
      bindOnMDCTabSelectedEvent: () => {
        this.$el.addEventListener(
          MDCTabFoundation.strings.SELECTED_EVENT, this.onSelect)
      },
      unbindOnMDCTabSelectedEvent: () =>
        this.$el.removeEventListener(
          MDCTabFoundation.strings.SELECTED_EVENT, this.onSelect),
      registerResizeHandler: (handler) =>
        window.addEventListener('resize', handler),
      deregisterResizeHandler: (handler) =>
        window.removeEventListener('resize', handler),
      getOffsetWidth: () =>
        this.$el.offsetWidth,
      setStyleForIndicator: (propertyName, value) =>
        this.$set(this.indicatorStyles, propertyName, value),
      getOffsetWidthForIndicator: () =>
        this.$refs.indicator.offsetWidth,
      notifyChange: (evtData) => {
        this.$emit('change', evtData.activeIndex)
      },
      getNumberOfTabs: () =>
        this.tabs.length,
      isTabActiveAtIndex: (index) =>
        this.tabs[index].isActive(),
      setTabActiveAtIndex: (index, isActive) => {
        this.tabs[index].setActive(isActive)
      },
      isDefaultPreventedOnClickForTabAtIndex: (index) =>
        this.tabs[index].isDefaultPreventedOnClick(),
      setPreventDefaultOnClickForTabAtIndex: (index, preventDefaultOnClick) => {
        this.tabs[index].setPreventDefaultOnClick(preventDefaultOnClick)
      },
      measureTabAtIndex: (index) =>
        this.tabs[index].measureSelf(),
      getComputedWidthForTabAtIndex: (index) =>
        this.tabs[index].getComputedWidth(),
      getComputedLeftForTabAtIndex: (index) =>
        this.tabs[index].getComputedLeft()
    })

    const resetTabs = () => {
      const tabElements = [].slice.call(
        this.$el.querySelectorAll(MDCTabBarFoundation.strings.TAB_SELECTOR))
      this.tabs = tabElements.map((el) => el.__vue__)

      let hasText, hasIcon
      const tabs = this.tabs
      for (let tab of tabs) {
        if (tab.hasText) {
          hasText = true
          break
        }
      }
      for (let tab of tabs) {
        if (tab.hasIcon) {
          hasIcon = true
          break
        }
      }

      if (hasText && hasIcon) {
        this.$set(this.classes, 'mdc-tab-bar--icons-with-text', true)
      } else if (hasIcon) {
        this.$set(this.classes, 'mdc-tab-bar--icon-tab-bar', true)
      }

      if (this.foundation) {
        const activeTabIndex = this.foundation.getActiveTabIndex()
        if (activeTabIndex >= 0) {
          this.foundation.switchToTabAtIndex(activeTabIndex, true)
        } else {
          this.foundation.switchToTabAtIndex(0, true)
        }
        this.foundation.layout()
      }
    }

    resetTabs()

    this.slotObserver = new MutationObserver(() => resetTabs())
    this.slotObserver.observe(this.$el, { childList: true })

    this.foundation.init()
  },
  beforeDestroy () {
    this.slotObserver.disconnect()
    this.foundation.destroy()
  }
}
</script>
