<template>
  <div ref="codeEditorElement" class="con-code-editor" style="height: 100px" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { monaco } from 'src/plugins/CustomMonaco';

export default defineComponent({
  setup () {
    const solution = ref('');
    const codeEditorElement = ref<HTMLElement | null>(null);

    watch(solution, () => {
      console.log(solution.value);
    });

    watch(codeEditorElement, () => {
      if (codeEditorElement.value) {
        monaco.editor.create(codeEditorElement.value, {
          value: solution.value,
          language: 'python',
          theme: 'vs-dark',
        }).onDidChangeModelContent(value => {
          console.log(value);
          console.log(monaco.editor.getEditors()[0].getValue());
        });
      }
    });

    return {
      solution,
      codeEditorElement,
    };
  },
});
</script>

<style scoped lang="scss">

</style>
