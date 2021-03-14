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

          <h2 class="subheader" style="margin: 2rem 0 0.3rem 0">How to Use</h2>
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
              selectName="Text"
              bindName="text"
              :previewColor="styles.text"
              :colorList="colorList"
              @change="colorUpdated"
            />
            <Selector
              selectName="Secondary Text"
              bindName="secondaryText"
              :previewColor="styles.secondaryText"
              :colorList="colorList"
              @change="colorUpdated"
            />
            <Selector
              selectName="Link Text"
              bindName="linkText"
              :previewColor="styles.linkText"
              :colorList="colorList"
              @change="colorUpdated"
            />
            <Selector
              selectName="Header Text"
              bindName="headerText"
              :previewColor="styles.headerText"
              :colorList="colorList"
              @change="colorUpdated"
            />
            <Selector
              selectName="Footer Text"
              bindName="footerText"
              :previewColor="styles.footerText"
              :colorList="colorList"
              @change="colorUpdated"
            />

            <hr class="select-divider" />

            <Selector
              selectName="Nav"
              bindName="nav"
              :previewColor="styles.nav"
              :colorList="colorList"
              @change="colorUpdated"
            />
            <Selector
              selectName="Nav Item Text"
              bindName="navItemText"
              :previewColor="styles.navItemText"
              :colorList="colorList"
              @change="colorUpdated"
            />

            <hr class="select-divider" />

            <Selector
              selectName="Button"
              bindName="button"
              :previewColor="styles.button"
              :colorList="colorList"
              @change="colorUpdated"
            />
            <Selector
              selectName="Button Text"
              bindName="buttonText"
              :previewColor="styles.buttonText"
              :colorList="colorList"
              @change="colorUpdated"
            />
            <Selector
              selectName="Button Border"
              bindName="buttonBorder"
              :previewColor="styles.buttonBorder"
              :colorList="colorList"
              @change="colorUpdated"
            />

            <hr class="select-divider" />

            <Selector
              selectName="Page Background"
              bindName="pageBackground"
              :previewColor="styles.pageBackground"
              :colorList="colorList"
              @change="colorUpdated"
            />
            <Selector
              selectName="Content Background"
              bindName="contentBackground"
              :previewColor="styles.contentBackground"
              :colorList="colorList"
              @change="colorUpdated"
            />
            <Selector
              selectName="Main Content"
              bindName="mainContent"
              :previewColor="styles.mainContent"
              :colorList="colorList"
              @change="colorUpdated"
            />
            <Selector
              selectName="Sidebar 1"
              bindName="sidebar1"
              :previewColor="styles.sidebar1"
              :colorList="colorList"
              @change="colorUpdated"
            />
            <Selector
              selectName="Sidebar 2"
              bindName="sidebar2"
              :previewColor="styles.sidebar2"
              :colorList="colorList"
              @change="colorUpdated"
            />
            <Selector
              selectName="Footer"
              bindName="footer"
              :previewColor="styles.footer"
              :colorList="colorList"
              @change="colorUpdated"
            />
          </div>

          <div
            class="display"
            :style="{ backgroundColor: styles.pageBackground }"
          >
            <nav class="main-nav" :style="{ backgroundColor: styles.nav }">
              <ul>
                <li :style="{ color: styles.navItemText }">Home</li>
                <li :style="{ color: styles.navItemText }">About</li>
                <li :style="{ color: styles.navItemText }">Contact</li>
              </ul>
            </nav>
            <div
              class="page-content"
              :style="{ backgroundColor: styles.contentBackground }"
            >
              <article
                class="main-content"
                :style="{ backgroundColor: styles.mainContent }"
              >
                <h1 :style="{ color: styles.headerText }">Main Content</h1>
                <p :style="{ color: styles.text }">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                  <span :style="{ color: styles.secondaryText }">
                    Excepteur sint occaecat cupidatat non proident,
                  </span>
                  sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Example
                  <a href="#" :style="{ color: styles.linkText }">link here</a>
                </p>

                <figure>
                  <blockquote>
                    <p :style="{ color: styles.secondaryText }">
                      "Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae ab illo inventore veritatis et
                      quasi architecto beatae vitae dicta sunt explicabo."
                    </p>
                  </blockquote>
                  <figcaption :style="{ color: styles.text }">
                    —Cicero, <cite>de Finibus Bonorum et Malorum</cite>
                  </figcaption>
                </figure>

                <button
                  :style="{
                    backgroundColor: styles.button,
                    color: styles.buttonText,
                    borderColor: styles.buttonBorder,
                  }"
                >
                  Button 1</button
                >&nbsp;
                <button
                  :style="{
                    backgroundColor: styles.button,
                    color: styles.buttonText,
                    borderColor: styles.buttonBorder,
                  }"
                >
                  Button 2</button
                >&nbsp;
                <button
                  :style="{
                    backgroundColor: styles.button,
                    color: styles.buttonText,
                    borderColor: styles.buttonBorder,
                  }"
                >
                  Button 3
                </button>
              </article>
              <div
                class="sidebar1"
                :style="{ backgroundColor: styles.sidebar1 }"
              >
                <h4 :style="{ color: styles.headerText }">Sidebar 1</h4>
                <p>
                  Here is some more example text. Here is example text
                  <span :style="{ color: styles.secondaryText }"
                    >in the secondary color</span
                  >. Also, here is
                  <a href="#" :style="{ color: styles.linkText }"
                    >another link</a
                  >.
                </p>
              </div>
              <div
                class="sidebar2"
                :style="{ backgroundColor: styles.sidebar2 }"
              >
                <h4 :style="{ color: styles.headerText }">Sidebar 2</h4>
                <button
                  :style="{
                    backgroundColor: styles.button,
                    color: styles.buttonText,
                    borderColor: styles.buttonBorder,
                  }"
                >
                  Button 1
                </button>
                <button
                  :style="{
                    backgroundColor: styles.button,
                    color: styles.buttonText,
                    borderColor: styles.buttonBorder,
                  }"
                >
                  Button 2
                </button>
                <button
                  :style="{
                    backgroundColor: styles.button,
                    color: styles.buttonText,
                    borderColor: styles.buttonBorder,
                  }"
                >
                  Button 3
                </button>
              </div>
              <footer
                class="main-footer"
                :style="{
                  backgroundColor: styles.footer,
                  color: styles.footerText,
                }"
              >
                Footer Info Here 2021
              </footer>
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
        {
          id: ++nextColorId,
          label: "Grey",
          hex: "#333333",
        },
        {
          id: ++nextColorId,
          label: "Background",
          hex: "#cccccc",
        },
        {
          id: ++nextColorId,
          label: "Text",
          hex: "#222222",
        },
        {
          id: ++nextColorId,
          label: "Header Text",
          hex: "#ffaa33",
        },
      ],
      // Styles set to default
      styles: {
        text: "#222222",
        secondaryText: "#c0ffee",
        linkText: "#ffaa33",
        headerText: "#333333",
        button: "#ffffff",
        buttonText: "#222222",
        buttonBorder: "#cccccc",
        nav: "#c0ffee",
        navItemText: "#333333",
        pageBackground: "#cccccc",
        contentBackground: "#ffffff",
        mainContent: "#eeeeee",
        sidebar1: "#eeeeee",
        sidebar2: "#eeeeee",
        footer: "#c0ffee",
        footerText: "#333333",
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
      const selectedColor = this.colorList.find((color) => {
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

        hr {
          border: none;
          height: 1px;
          color: #cccccc;
          background-color: #cccccc;
          margin: 1rem 0;
        }
      }

      .display {
        height: 32rem;
        border: 1px solid #bbb;

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
                opacity: 0.7;
              }
            }
          }
        }

        .page-content {
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
          }
          .sidebar2 {
            grid-area: sidebar2;
            padding: 0.5rem;

            button {
              margin-top: 3px;
            }
          }
          .main-footer {
            grid-area: footer;
            padding: 0.5rem;
            text-align: center;
            font-size: 0.9rem;
          }
        }

        button {
          padding: 0.5rem 1rem;
          border-radius: 4px;

          &:hover {
            opacity: 0.7;
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
