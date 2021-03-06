## Grid List

Grid Lists are best suited for presenting homogeneous data, typically images.
Each item in a grid list is called a tile. Tiles maintain consistent width,
height, and padding across screen sizes.

```html
<mdc-grid-list with-support-text>
  <mdc-grid-tile ratio="16x9"  
    v-for="(item, index) in tiles" :key="index"
    :src="item.src"
    :title="item.title"
    :support-text="item.desc"
    >
  </mdc-grid-tile>
</mdc-grid-list>
```

```javascript
var vm = new Vue({
  data:{
    tiles: [
      {
        src: 'image1.jpg',
        title: 'First Image',
        desc: 'lore ipsum'
      },
      {
        src: 'image2.jpg',
        title: 'Second Image',
        desc: 'lore ipsum'
      }
    ]
  },
})
```


### props

#### mdc-grid-list

| prop | Type | Default | Description |
|-------|------|---------|-------------|
|`width`|Number|| tile's width |
|`ratio`|String| 1x1 | tiles's aspect ratio `16x9 2x3 3x2 4x3 3x4` (default is 1x1) |
|`narrow-gutter`| Boolean|| set's tiles padding to 1px (default is 4px) |
|`header-caption`| Boolean|| whether tiles have header caption (default is footer) |
|`icon-align-start`| Boolean|| whether tiles have a start icon |
|`icon-align-end`| Boolean|| whether tiles have an end icon |
|`with-support-text`| Boolean|| whether tiles have support text |

#### mdc-grid-tile

| prop | Type | Default | Description |
|-------|------|---------|-------------|
|`src`|String|| image source |
|`cover`|Boolean|| image cover  |
|`icon`|String|| icon name |
|`title`|String|| title name |
|`support-text`|String|| support text |


### Image only tiles

```html
  <mdc-grid-list>
    <mdc-grid-tile 
      v-for="(item, index) in tiles" :key="index"
      :src="item.src"
      >
    </mdc-grid-tile>
  </mdc-grid-list>
```

### Image only tiles

```html
  <mdc-grid-list>
    <mdc-grid-tile 
      v-for="(item, index) in tiles" :key="index"
      :src="item.src"
      >
    </mdc-grid-tile>
  </mdc-grid-list>
```

### tiles with icon
```html
<mdc-grid-list with-support-text icon-align-start>
  <mdc-grid-tile  
    v-for="(item, index) in tiles" :key="index"
    :src="item.src"
    :title="item.title"
    :support-text="item.desc"
    :icon="item.icon"
    >
  </mdc-grid-tile>
</mdc-grid-list>
```

### Reference
- https://material.io/components/web/catalog/grid-lists


