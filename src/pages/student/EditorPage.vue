<template>
  <q-page class="page-class editor">
    <div class="page-content-container">
      хуй тебе блять а не редактор кода долбоеб, пошел нахуй вообще, научиться он тут чему-то собрался, конч блять
    </div>
    <div class="page-content-container">
      content
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ConMonacoEditor from 'components/ConMonacoEditor/ConMonacoEditor.vue';

export default defineComponent({
  components: { ConMonacoEditor },

  setup() {

    return {};
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

.editor {
  color: $card-font
}

.page-class {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
