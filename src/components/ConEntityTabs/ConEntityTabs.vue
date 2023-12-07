<template>
  <div class="con-entity-tabs">
    <h6
      v-for="item in tabs"
      :key="item.id"
      class="con-entity-tabs__tab text-h6 q-ma-none"
      :class="getTabClass(item)"
      @click="setActiveTab(item)"
    >
      {{ item.title }}
    </h6>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IEntityTab } from 'components/ConEntityTabs/tabs.types';

export default defineComponent({
  props: {
    tabs: {
      type: Array as PropType<IEntityTab[]>,
      required: true,
    },
    modelValue: {
      type: Object as PropType<IEntityTab>,
      required: true,
    },
  },

  emits: {
    'update:modelValue': null,
  },

  setup(props, ctx) {
    function getTabClass(tab: IEntityTab) {
      return {
        'con-entity-tabs__tab--active': tab.id === props.modelValue.id,
      };
    }

    function setActiveTab(tab: IEntityTab) {
      ctx.emit('update:modelValue', tab);
    }

    return {
      getTabClass,
      setActiveTab,
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

.con-entity-tabs {
  @include background-blur-opacity($main-bg, 0.1, 20);
  border-radius: 10px;
  height: $tabs-height;
  gap: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  &__tab {
    color: $card-font;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      opacity: 0.8;
      color: $main-font;
      transition: 0.3s;
    }

    &--active {
      color: $main-font;
      transition: 0.3s;
      cursor: default;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
