<template>
  <div class="barcode">
    <svg ref="barcode"></svg>
  </div>
</template>

<script>
import JsBarcode from "jsbarcode";

export default {
  name: "Barcode",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  mounted() {
    JsBarcode(this.$refs.barcode, this.value);
  },
};
</script>

<style scoped>
.barcode {
  display: inline-block;
}
</style>
