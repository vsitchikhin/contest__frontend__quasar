<template>
  <div ref="codeEditorElement" class="con-code-editor" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { monaco } from 'src/plugins/CustomMonaco';

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },

  emits: {
    'update:model-value': null,
  },

  setup (props, ctx) {
    const codeEditorElement = ref<HTMLElement | null>(null);

    watch(codeEditorElement, () => {
      if (codeEditorElement.value) {
        monaco.editor.create(codeEditorElement.value, {
          value: props.modelValue,
          language: 'python',
          theme: 'vs-dark',
        }).onDidChangeModelContent(() => {
          ctx.emit('update:model-value', monaco.editor.getEditors()[0].getValue());
        });
      }
    });

    return {
      codeEditorElement,
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

.con-code-editor {
  @include background-blur-opacity($main-bg, 0.1);

  height: calc(100vh - #{$header-height} - #{$page-gap} * 4 - #{$main-padding} * 10)
}
</style>
