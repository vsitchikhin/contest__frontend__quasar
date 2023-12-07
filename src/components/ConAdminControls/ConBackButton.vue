<template>
  <div class="con-back-button flex items-center justify-center text-white" @click="goBack">
    <q-icon size="30px" name="chevron_left" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();

    function goBack() {
      router.push({ name: 'AdminCourses' });
    }

    return {
      goBack,
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/css/app';

.con-back-button {
  min-width: 70px;
  width: 70px;
  height: 70px;
  border-radius: 10px;

  @include background-blur-opacity($back-button, 0.5);
  transition: 0.3s;

  &:hover {
    @include background-blur-opacity($back-button, 0.8);
    transition: 0.3s;
  }
}
</style>
