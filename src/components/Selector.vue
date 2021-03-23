<template>
  <div class="selector">
    <div class="previewbox" :style="{ backgroundColor: selectedStyle.hex}"></div>
    <label v-bind:for="bindName">{{ selectName }}: </label>
    <select
      v-bind:name="bindName"
      v-model="selectedStyle.id"
      @change="$emit('change', bindName, $event.target.value)"
    >
      <option v-for="(color, index) in colorList" :key="bindName + index" :value="color.id">
        {{ color.label }}
      </option>
    </select>
  </div>
</template>


<script>
export default {
  name: "Selector",
  props: {
    selectName: String,
    bindName: String,
    selectedStyle: Object,
    colorList: Array,
  },
  data() {
    return {
      selectedStyleId: this.selectedStyle.id
    }
  }
};
</script>


<style lang="less" scoped>
.selector {
  display: grid;
  grid-template-columns: auto auto 3fr;
  column-gap: 0.5rem;
  margin-bottom: 0.4rem;

  .previewbox {
    height: 0.5rem;
    width: 0.5rem;
    place-self: center;
  }
}
</style>
