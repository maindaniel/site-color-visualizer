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
          <button @click="addColorCard">
            <img src="./assets/icons/plus.svg" alt="Add Color Card" />
          </button>
        </div>
        <div class="color-cards">
          <ColorCard
            v-for="card in colorList"
            :key="card.id"
            :initialCard="card"
            @remove="removeColorCard"
            @duplicate="duplicateColorCard"
          />
        </div>
      </section>

      <section id="visualizer">
        <h2 class="subheader">Visualize <button>Reset</button></h2>
        <div class="grid-container">
          <div class="selectors">
            <Selector
              selectName="navigation"
              :previewColor="styles.navigation"
              :colorList="colorList"
              @change="colorUpdated"
            />
          </div>

          <div class="display">
            <nav class="main-nav" :style="{ backgroundColor: styles.navigation }">
              <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </nav>
            <div class="page-content">
              <article class="main-content">
                <h1>Main Content</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>

                <figure>
                  <blockquote>
                    <p>
                      "Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae ab illo inventore veritatis et
                      quasi architecto beatae vitae dicta sunt explicabo."
                    </p>
                  </blockquote>
                  <figcaption>
                    —Cicero, <cite>de Finibus Bonorum et Malorum</cite>
                  </figcaption>
                </figure>

                <button>Button 1</button> <button>Button 2</button> <button>Button 3</button>
              </article>
              <div class="sidebar1">
                <h4>Sidebar 1</h4>
              </div>
              <div class="sidebar2">
                <h4>Sidebar 2</h4>
                <button>Button 1</button>
                <button>Button 2</button>
                <button>Button 3</button>
              </div>
              <footer class="main-footer">The footer</footer>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import ColorCard from "./components/ColorCard.vue";
import Selector from "./components/Selector.vue";

let nextColorId = 1;

export default {
  name: "App",
  components: {
    ColorCard,
    Selector,
  },
  data() {
    return {
      colorList: [
        {
          id: nextColorId,
          label: "Default",
          hex: "#c0ffee",
        },
      ],
      styles: {
        navigation: "blue"
      },
    };
  },
  methods: {
    /** Add brand new color card set to card defaults. */
    addColorCard() {
      this.colorList.push({
        id: ++nextColorId,
        label: "",
        hex: "",
      });
    },

    /** Remove a color card based on unique id. */
    removeColorCard(id) {
      this.colorList = this.colorList.filter((card) => {
        return card.id !== id;
      });
    },

    /** Duplicate a color card based on other card's id. */
    duplicateColorCard(card) {
      this.colorList.push({
        id: ++nextColorId,
        label: card.label,
        hex: card.hex,
      });
    },

    /** On Change of a color selector, update the inputted style by name.
     * @param styleName: Name of the object in 'styles' that represents something in the visualizer
     * @param selectedId: Color id the was selcted.
     */
    colorUpdated(styleName, selectedId) {
      const selectedColor = this.colorList.find(color => {
        return color.id == selectedId;
      });

      if (selectedColor) {
        this.styles[styleName] = selectedColor.hex;
      }
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
      margin-left: 1rem;
    }
  }

  #start {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));

    .introduction {
      h1 {
        margin-top: 0rem;
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

  #visualizer {
    .grid-container {
      display: grid;
      grid-template-columns: 1fr 3fr;
      column-gap: 1rem;

      .selectors {
        padding: 0.5rem;
        border: 2px dashed #ccc;

        .selector {
          display: grid;
          grid-template-columns: auto auto 3fr;
          column-gap: 0.5rem;

          .previewbox {
            height: 0.5rem;
            width: 0.5rem;
            place-self: center;
          }
        }
      }

      .display {
        height: 32rem;
        border: 1px solid #bbb;
        background-color: #ccc;

        display: grid;
        grid-template-rows: 1fr 8fr;

        .main-nav {
          ul {
            padding: 0;
            height: 100%;
            list-style-type: none;

            display: grid;
            grid-template-columns: repeat(auto-fill, 10rem);

            li {
              height: 100%;
              width: 100%;
              cursor: pointer;
              color: white;

              display: grid;
              place-items: center;

              &:hover {
                background-color: red;
              }
            }
          }
        }

        .page-content {
          background-color: #fff;
          max-width: 60rem;
          padding: 1rem;
          margin: 0 auto;

          display: grid;
          gap: 1rem;
          grid-template-columns: 5fr 1fr;
          grid-template-rows: 5fr 5fr 1fr;
          grid-template-areas:
            "main-content sidebar1"
            "main-content sidebar2"
            "footer       footer";

          .main-content {
            grid-area: main-content;
            padding: 0.5rem;

            background-color: lightskyblue;

            blockquote {
              p {
                padding: 1rem;
                font-style: italic;
                color: #333;
              }
            }
          }
          .sidebar1 {
            grid-area: sidebar1;
            padding: 0.5rem;

            background-color: lightcoral;
          }
          .sidebar2 {
            grid-area: sidebar2;
            padding: 0.5rem;

            button {
              margin-top: 3px;
            }

            background-color: lightgreen;
          }
          .main-footer {
            grid-area: footer;
            padding: 0.5rem;

            background-color: lightseagreen;
          }
        }

        button {
          padding: 0.5rem 1rem;
          background-color: #ffffff;
          border: 1px solid #d04422;
          border-radius: 4px;

          &:hover {
            background-color: #81bd89;
            cursor: pointer;
          }
        }

        h1,
        h4 {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
