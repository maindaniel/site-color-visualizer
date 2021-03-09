<template>
  <div class="selector">
    <div
      class="previewbox"
      :style="{ backgroundColor: previewColor }"
    ></div>
    <label v-bind:for="selectName">{{ selectName }}: </label>
    <select
      v-bind:name="selectName"
      @change="$emit('change', selectName, $event.target.value)"
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
    previewColor: String, 
    colorList: Array,
  },
};
</script>


<style lang="less" scoped>
</style>
