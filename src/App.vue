<template>
  <div id="content">
    <main class="wrapper">
      <section id="start">
        <div class="introduction">
          <h1 class="header">Site Color Visualizer</h1>
          <p>
            An open source tool to help create basic color themes for websites,
            and to also visualize how they could look on a template website.
          </p>

          <h2 class="subheader">How to Use</h2>
          <p>
            Add colors to your color pool below by clicking the + button near
            the section header
          </p>
        </div>
        <div class="sidenav">
          <ul>
            <li>
              <button>Generate Example Layout</button>
            </li>
            <li>
              <button>Export Colors</button>
            </li>
            <li>
              <button>Test</button>
            </li>
          </ul>
        </div>
      </section>

      <hr />

      <section id="color-pool">
        <div class="subheader">
          <h2>Color Pool</h2>
          <button @click="addColorCard">+</button>
        </div>
        <div class="color-cards">
          <ColorCard
            v-for="card in colorList"
            :key="card.id"
            :card="card"
            @remove="removeColorCard"
          />
        </div>
      </section>

      <section id="visualizer">
        <h2 class="subheader">Visualize <button>Reset</button></h2>
        <div class="display"></div>
      </section>
    </main>
  </div>
</template>

<script>
import ColorCard from "./components/ColorCard.vue";

let nextColorId = 1;

export default {
  name: "App",
  components: {
    ColorCard,
  },
  data() {
    return {
      colorList: [
        {
          id: nextColorId,
          label: "Default",
          hex: "#ffffff",
        },
      ],
    };
  },
  methods: {
    addColorCard() {
      this.colorList.push({
        id: ++nextColorId,
        label: "",
        color: "",
      });
    },
    removeColorCard(id) {
      this.colorList = this.colorList.filter((card) => {
        return card.id !== id;
      });
    },
  },
};
</script>

<style lang="less">
@import "./assets/css/styles.css";

.wrapper {
  max-width: 90rem;
  margin: 0 auto;
  padding: 1rem;
  background-color: #ffffff;

  .subheader {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    button {
      margin-left: 0.5rem;
    }
  }

  #start {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));

    .introduction {
      h1 {
        margin-top: 0.5rem;
      }
    }
  }

  #color-pool {
    margin-bottom: 2rem;
    .color-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, 21.2rem);
      column-gap: 1rem;
      row-gap: 1rem;
    }
  }
}
</style>
