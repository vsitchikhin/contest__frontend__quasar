<template>
  <div class="page-class items-center">
    <div class="flex justify-center page-class__header-block">
      <span class="text-grey-6 text-weight-medium text-h4 cursor-pointer" @click="gotoAuth">Авторизация</span>
      <span class="text-grey-2 text-weight-medium text-h4 cursor-pointer">Регистрация</span>
    </div>
    <h2 class="text-h2 text-secondary">РЕГИСТРАЦИЯЯЯЯЯЯ</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();

    function gotoAuth() {
      router.push({ name: 'Signing' });
    }

    return {
      gotoAuth,
    };
  },
});
</script>

<style scoped lang="scss">
.page-class {
  &__header-block {
    gap: 20px;
    margin-bottom: 20px;
  }
}
</style>
