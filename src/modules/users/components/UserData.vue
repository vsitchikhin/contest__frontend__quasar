<template>
  <div class="user-data row">
    <q-item v-ripple clickable dense class="user-data__item">
      <q-item-section>
        <q-item-label> {{ userName }}</q-item-label>
      </q-item-section>
      <q-item-section side class="q-pr-sm">
        <q-avatar
          rounded
          size="40px"
          font-size="35px"
          :icon="!userAvatar ? 'account_circle' : undefined"
          text-color="white"
        >
          <img v-if="userAvatar" :src="userAvatar" alt="Изображение пользователя">
        </q-avatar>
      </q-item-section>
    </q-item>
    <q-btn flat class="bg-secondary" @click="logout">
      Выйти
      <q-icon name="logout" class="q-pl-sm" />
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { UsersService } from 'src/modules/users/services/users.service';
import { CHANGE_TOKEN_CUSTOM_EVENT } from 'src/types/general.consts';
import { AuthService } from 'src/modules/core/services/auth/auth.service';
export default defineComponent({
  setup() {
    const usersService = new UsersService();
    const authService = new AuthService();

    const userAvatar = computed(() => false);
    const userName = computed(() => `${usersService.currentUser?.last_name ?? ''} ${usersService.currentUser?.name}`);

    async function logout() {
      await authService.logoutUser();
      window.dispatchEvent(new CustomEvent(CHANGE_TOKEN_CUSTOM_EVENT, { bubbles: true }));

      window.location.reload();
    }

    return {
      logout,
      userAvatar,
      userName,
    };
  },
});
</script>

<style scoped lang="scss">
 .user-data {
   font-size: 16px;
   line-height: 24px;

   &__item {
     border-radius: 10px;
   }
 }
</style>
