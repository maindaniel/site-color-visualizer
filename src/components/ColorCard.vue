<template>
  <div class="color-card">
    <div class="color-label">
      <label>Color Label</label>
      <input type="text" v-model="card.label" />
    </div>
    <div class="color-hex">
      <label>Hex Code</label>
      <input type="text" v-model="card.hex" />
    </div>
    <div class="color-preview"></div>
    <div class="color-actions">
      <button @click="$emit('duplicate', card)" class="card-action">D</button>
      <button @click="$emit('remove', card.id)" class="card-action">X</button>
    </div>
  </div>
</template>


<script>
export default {
  name: "ColorCard",
  props: {
    initialCard: {
      id: Number,
      label: String,
      hex: String,
    },
  },
  data() {
    return {
      card: this.initialCard,
    };
  },
  methods: {
  },
};
</script>


<style lang="less" scoped>
.color-card {
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 5px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "label preview"
    "hex preview"
    "actions actions";
  column-gap: 0.5rem;
  row-gap: 0.5rem;

  .color-label,
  .color-hex {
    label,
    input {
      display: block;
    }
  }

  .color-label {
    grid-area: label;
  }

  .color-hex {
    grid-area: hex;
  }

  .color-preview {
    grid-area: preview;
    border-radius: 5px;
    background-color: deeppink;
  }

  .color-actions {
    grid-area: actions;

    display: inline;

    button {
      margin-right: .5rem;
    }
  }
}
</style>
