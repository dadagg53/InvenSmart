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
    this.generateBarcode();
  },
  watch: {
    value: "generateBarcode", // Generuj ponownie kod, gdy zmienia się wartość
  },
  methods: {
    generateBarcode() {
      JsBarcode(this.$refs.barcode, this.value, {
        format: "CODE128", // Format kodu kreskowego
      });
    },
  },
};
</script>

<style scoped>
.barcode {
  display: inline-block;
}
</style>
