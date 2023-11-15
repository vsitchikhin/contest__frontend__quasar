<template>
  <div class="form">
    <div class="form__inputs-container flex column">
      <div class="form__input-container flex">
        <span class="text-white text-body1 text-bold form__label">Email</span>
        <input v-model="login" type="email" class="no-shadow text-white form__input q-px-lg">
      </div>
      <div class="form__input-container flex">
        <span class="text-white text-body1 text-bold form__label">Пароль</span>
        <input v-model="password" type="password" class="no-shadow text-white form__input q-px-lg">
      </div>
    </div>

    <q-btn
      unelevated
      class="bg-secondary text-h6 text-weight-regular text-white form__button q-btn--no-uppercase"
      @click="signing"
    >
      Войти
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { AuthService } from 'src/modules/core/services/auth/auth.service';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const authService = new AuthService();

    const login = ref<string | null>(null);
    const password = ref<string | null>(null);

    async function signing() {
      if (login.value && password.value) {
        const isLogin = await authService.authUser(login.value, password.value);
        console.log('isLogin - ', isLogin);

        if (isLogin) {
          await router.push({ path: '/' });
        }

        return;
      }
      // todo: добавить валидацию
    }

    return {
      login,
      password,

      signing,
    };
  },
});

</script>

<style scoped lang="scss">
@import 'src/css/app';
.form {
  @include background-blur-opacity($secondary-bg, 0.1, 20);
  padding: 30px 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 600px;

  &__input {
    padding: 20px 12px;
    background: none;
    outline: none;
    border: none;
  }

  &__input-container {
    padding: 0 40px;
    @include background-blur-opacity($secondary-bg, 0.2, 20);
    border-radius: 10px;
    justify-content: space-between;
    width: 400px;
    align-items: center;

  }

  &__inputs-container {
    gap: 20px;
  }

  &__label {
    width: 60px;
  }

  &__button {
    border-radius: 10px;
    padding: 15px 50px;
  }
}
</style>
