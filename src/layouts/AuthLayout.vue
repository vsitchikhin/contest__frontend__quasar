<template>
  <div class="auth-layout">
    <div class="auth-layout__page-container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

.auth-layout {
  background-color: $primary;
  background-image: url('assets/static/Logo.png');
  // todo: доработать для адаптивов
  background-size: 60vw;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  max-height: 100vh;
}
</style>
