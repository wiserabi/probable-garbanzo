<template>
  <v-footer app class="footer">
    <v-row justify="center" no-gutters>
      <v-col class="text-center" cols="12" sm="3">
        <span>Privacy Policy</span>
        <span style="margin-left: 30px;">Terms of Use</span>
      </v-col>
      <v-col class="text-center" cols="12" sm="6" offset="3">
        <span>Copyright(c) Fastpace. Co, Ltd. All Rights Reserved</span>
      </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped>
  .footer {
    position: relative;
    bottom: 0;
    width: 100%;
    max-height: 50px;
    padding: 8px 0;
  }

  span {
    font-size: 12px;
    font-family: 'Inter';
    font-weight: 400;
    color: #000000;
  }
</style>
