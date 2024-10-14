<template>
  <v-dialog v-model="props.show" max-width="360">
    <v-card>
      <div class="x-btn-container">
        <button class="x-btn" @click="closeDialog(false)">
          <i class="mdi mdi-close" />
        </button>
      </div>
      <v-card-title align="center" class="mt-7">
        <v-icon
          color="#003366"
          icon="mdi-check-circle"
          size="small"
        />
      </v-card-title>
      <v-card-title align="center" class="headline">
        {{ props.title }}
      </v-card-title>
      <v-card-text align="center">
        <span v-html="props.message" />
      </v-card-text>
      <div align="center" style="text-align: center; margin-bottom: 40px;">
        <v-btn border class="btn-cancel" flat @click="closeDialog(false)">취소</v-btn>
        <v-btn class="btn-save" color="#003366" flat @click="closeDialog(true)">확인</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  const props = defineProps({
    show: Boolean,
    title: String,
    message: String,
  });

  const emit = defineEmits<{(e: 'close', value: boolean): void}>();

  const closeDialog = (answer: boolean) => {
    emit('close', answer);
  };
</script>

<style scoped>

  .x-btn-container {
    position: relative;
  }

  .x-btn {
    position: absolute;
    top: 20px;           /* 위쪽에서 10px 떨어진 위치 */
    right: 25px;         /* 오른쪽에서 10px 떨어진 위치 */
    cursor: pointer;
    font-size: 14px;
  }

  .headline {
    font-size: 18px;
    font-weight: bold;
    color: #000000;
  }

  span {
    font-size: 14px;
    display: block;
    color: #111111;
  }

  .btn-save {
    border-radius: 4px;
    font-size: 14px;
    margin-left: 15px;
    width: 65px;
    height: 40px;
  }

  .btn-cancel {
    border: 1px solid #003366;
    border-radius: 4px;
    font-size: 14px;
    width: 65px;
    height: 40px;
  }
</style>
