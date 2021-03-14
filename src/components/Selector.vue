<template>
  <div class="selector">
    <div class="previewbox" :style="{ backgroundColor: previewColor }"></div>
    <label v-bind:for="selectName">{{ selectName }}: </label>
    <select
      v-bind:name="bindName"
      @change="$emit('change', bindName, $event.target.value)"
    >
      <option v-for="color in colorList" :key="color.id" :value="color.id">
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
    previewColor: String,
    colorList: Array,
  },
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
