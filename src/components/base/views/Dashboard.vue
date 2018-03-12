<template>
<q-page class="container">
    <div v-for="item in widgets" v-bind:class="{ edit: editMode }" :key="item.guid" :itemId="item.guid" :x="item.x" :y="item.y" class="box">
      <div v-bind:style="{ width: item.width + 'px', height: item.height + 'px'  }" :key="item.guid" :is="widgettypes[item.type].components.main" :itemId="item.guid" :widget="item"></div>
      <div :itemId="item.guid" class="edit-mode" v-if="editMode">
        <div class="close" v-show="editMode">
          <q-btn round color="red" icon="delete" @click="removeWidget(item)" /></div>
          <div class="edit" v-show="editMode">
            <q-btn round color="orange" @click="editWidget(item)" icon="edit" /></div>
      </div>
    </div>

  <widgetsmodal />
  <editwidget/>
</q-page>
</template>

<script>
import widgettypes from 'components/widget-system/'
import widgetsmodal from 'components/base/views/Widgets'
import editwidget from 'components/base/views/EditWidget'

import Draggabilly from 'draggabilly'
import _ from 'lodash'
Draggabilly.prototype.setPosition = function (x, y) {
  this.position.x = x
  this.position.y = y
  this.setLeftTop()
}

export default {
  data () {
    return {
      editMode: false,
      draggies: [],
      widgettypes: widgettypes
    }
  },
  components: {
    widgetsmodal,
    editwidget
  },
  mounted () {
    this.$root.$on('editMode', (value) => {
      this.editMode = value
      _.forEach(this.draggies, box => {
        if (value) {
          box.enable()
        } else {
          box.disable()
        }
      })
    })
    this.$root.$on('saveWidget', (widget) => {
      this.$store.commit('saveWidget', widget)
    })

    this.$root.$on('exitEdit', () => {
      this.widgets = this.$store.getters['widgets/getWidgets']
    })

    this.$root.$on('widgetAdded', () => {
      _.forEach(this.draggies, box => {
        box.destroy()
      })
      setTimeout(() => {
        this.createDrag()
      }, 100)
    })

    this.createDrag()
  },
  beforeDestroy () {
    this.$root.$off('editMode')
    this.$root.$off('saveWidget')
    this.$root.$off('exitEdit')
    this.$root.$off('widgetAdded')
  },
  methods: {
    createDrag () {
      this.draggies = []
      var draggableElems = document.querySelectorAll('.box')
      // init Draggabillies
      for (var i = 0, len = draggableElems.length; i < len; i++) {
        var draggableElem = draggableElems[i]
        var draggie = new Draggabilly(draggableElem, {
          containment: '.container',
          grid: [5, 5]
        })
        // Set properties

        draggie.setPosition(draggableElem.getAttribute('x'), draggableElem.getAttribute('y'))
        draggie.id = draggableElem.getAttribute('itemId')
        if (this.editMode) {
          draggie.enable()
        } else {
          draggie.disable()
        }
        draggie.on('dragEnd', (event, pointer) => {
          var index = this.widgets.findIndex(item => item.guid === event.target.getAttribute('itemId'))
          this.widgets[index].x = this.draggies[index].position.x
          this.widgets[index].y = this.draggies[index].position.y
          this.$store.commit('widgets/updateWidgets', this.widgets)
        })
        this.draggies.push(draggie)
      }
    },
    removeWidget (widget) {
      this.$store.commit('widgets/removeWidget', widget)
    },
    async editWidget (widget) {
      this.$root.$emit('editWidget', widget)
    }
  },
  computed: {
    widgets: {
      get () {
        return this.$store.getters['widgets/getWidgets']
      },
      set (value) {
        console.log('set new widgets!')
        this.$store.commit('widgets/updateWidgets', value)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'

.container
  position absolute
  top 55px
  bottom 50px
  right 0
  left 0
  // margin 10px 10px 10px 10px

.edit
  /* background-color rgba(255, 0, 0, 0.29)!important */

.box
  position absolute
  overflow hidden
  top 0
  left 0
  background-color rgba(0, 0, 0, 0.5)
  border-radius 10px
  color white

.edit-mode
  position absolute
  /* overflow hidden */
  background-color rgba(#009688, 0.29)!important
  top 0
  left 0
  right 0
  bottom 0
  border-radius 10px
  color white
  .close
    position absolute
    top -6px
    right -6px
    text-align right
    z-index 10
  .edit
    position absolute
    top -6px
    left -6px
    text-align left
    z-index 10

</style>
