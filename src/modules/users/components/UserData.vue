<template>
  <div class="user-data">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { UsersService } from 'src/modules/users/services/users.service';
export default defineComponent({
  setup() {
    const usersService = new UsersService();

    const userAvatar = computed(() => false);
    const userName = computed(() => `${usersService.currentUser?.last_name ?? ''} ${usersService.currentUser?.name}`);

    return {
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
