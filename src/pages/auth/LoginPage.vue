<template>
  <div class="page-class">
    <div class="flex justify-center page-class__header-block">
      <span class="text-grey-2 text-weight-bold text-h4 cursor-pointer">Авторизация</span>
      <span class="text-grey-6 text-weight-bold text-h4 cursor-pointer" @click="gotoRegister">Регистрация</span>
    </div>
    <auth-form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import AuthForm from 'src/modules/core/components/AuthForm.vue';

export default defineComponent({
  components: { AuthForm },
  setup() {
    const router = useRouter();

    function gotoRegister() {
      router.push({ name: 'Signup' });
    }

    return {
      gotoRegister,
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
