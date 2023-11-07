<template>
  <div class="form">
    <div class="form__inputs-container flex column">
      <div class="form__input-container flex items-center">
        <span class="text-white text-body1 text-bold form__label">Email</span>
        <div class="form__input-delimiter" />
        <q-input
          flat
          color="secondary"
          type="email"
          dark
          class="no-shadow text-white form__input q-px-lg"
        />
      </div>
      <div class="form__input-container flex items-center">
        <span class="text-white text-body1 text-bold form__label">Пароль</span>
        <div class="form__input-delimiter" />
        <q-input
          flat
          color="secondary"
          type="password"
          dark
          class="no-shadow text-white form__input q-px-lg"
        />
      </div>
    </div>

    <q-btn
      unelevated
      class="bg-secondary text-h6 text-weight-regular text-white form__button q-btn--no-uppercase"
    >
      Войти
    </q-btn>
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
    padding: 0 8px;
  }

  &__input-container {
    padding: 0 40px;
    @include background-blur-opacity($secondary-bg, 0.2, 20);
    border-radius: 20px;
    justify-content: space-between;
    width: 400px;

  }

  &__inputs-container {
    gap: 20px;
  }

  &__label {
    width: 60px;
  }

  &__input-delimiter {
    width: 1px;
    height: 25px;
    border-right: 2px solid $secondary-bg;
  }

  &__button {
    border-radius: 10px;
    padding: 15px 50px;
  }
}
</style>
