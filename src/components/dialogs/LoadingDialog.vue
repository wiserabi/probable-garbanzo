<template>
  <v-dialog
    v-model="props.show"
    max-width="300"
    persistent
  >
    <v-list
      class="py-2"
      color="primary"
      elevation="12"
      rounded="lg"
    >
      <v-list-item
        align="center"
        prepend-icon="mdi-login"
        :title="props.title"
      >
        <template #prepend>
          <div>
            <v-icon color="primary" size="x-large" />
          </div>
        </template>

        <template #append>
          <v-progress-circular
            color="primary"
            indeterminate="disable-shrink"
            size="25"
            width="3"
          />
        </template>
      </v-list-item>
    </v-list>
  </v-dialog>
</template>

<script setup lang="ts">
  const props = defineProps({
    show: Boolean,
    title: String,
    message: String,
  });
</script>
