<template>
	<div id="content">
		<main class="wrapper">
			<section id="start">
				<div class="introduction">
					<h1 class="header">Site Color Visualizer</h1>
					<p>
						An open source tool to help visualize how a color palette may look
						on a website.
					</p>

					<h2 class="subheader" style="margin: 2rem 0 0.3rem 0">How to Use</h2>
					<p>
						Add colors to your color pool below by clicking the + button near
						the "Color Pool" section header, or by overwriting the cards in the
						default layout. Cards in the color pool will appear in the select
						dropdowns in the "Visualize" section. The select menus represent
						elements in the visualizer, which change to the selected color of
						your choice.
					</p>
				</div>
				<div class="sidenav">
					<ul></ul>
				</div>
			</section>

			<hr />

			<section id="color-pool" v-if="styles">
				<div class="subheader">
					<h2>Color Pool</h2>
					<button @click="addColorCard">
						<img src="./assets/icons/plus.svg" alt="Add Color Card" />
					</button>
					<button @click="exportColors">
						Export
					</button>
				</div>
				<div class="color-cards">
					<ColorCard
						v-for="card in colorList"
						:key="card.id"
						:initialCard="card"
						@remove="removeColorCard"
						@duplicate="duplicateColorCard"
						@colorUpdated="colorUpdated"
						@copyHexToClipboard="copyHexToClipboard"
						@togglePicker="togglePicker"
					/>
				</div>
			</section>

			<section id="visualizer" v-if="styles">
				<h2 class="subheader">
					Visualize <button @click="confirmReset">Reset</button>
				</h2>
				<div class="grid-container">
					<div class="selectors">
						<Selector
							v-for="select in selectList"
							:key="select"
							:selectName="select.name"
							:bindName="select.bindName"
							:selectedStyle="styles[select.bindName]"
							:colorList="colorList"
							@change="selectorUpdated"
						/>
					</div>

					<div
						class="display"
						:style="{ backgroundColor: styles.pageBackground.hex }"
					>
						<nav class="main-nav" :style="{ backgroundColor: styles.nav.hex }">
							<ul>
								<li :style="{ color: styles.navItemText.hex }">Home</li>
								<li :style="{ color: styles.navItemText.hex }">About</li>
								<li :style="{ color: styles.navItemText.hex }">Contact</li>
							</ul>
						</nav>
						<div
							class="page-content"
							:style="{ backgroundColor: styles.contentBackground.hex }"
						>
							<article
								class="main-content"
								:style="{ backgroundColor: styles.mainContent.hex }"
							>
								<h1 :style="{ color: styles.headerText.hex }">Main Content</h1>
								<p :style="{ color: styles.text.hex }">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut aliquip ex ea commodo consequat. Duis aute
									irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur.
									<span :style="{ color: styles.secondaryText.hex }">
										Excepteur sint occaecat cupidatat non proident,
									</span>
									sunt in culpa qui officia deserunt mollit anim id est laborum.
									Example
									<a href="#" :style="{ color: styles.linkText.hex }">
										link here
									</a>
								</p>

								<figure>
									<blockquote>
										<p :style="{ color: styles.secondaryText.hex }">
											"Sed ut perspiciatis unde omnis iste natus error sit
											voluptatem accusantium doloremque laudantium, totam rem
											aperiam, eaque ipsa quae ab illo inventore veritatis et
											quasi architecto beatae vitae dicta sunt explicabo."
										</p>
									</blockquote>
									<figcaption :style="{ color: styles.text.hex }">
										—Cicero, <cite>de Finibus Bonorum et Malorum</cite>
									</figcaption>
								</figure>

								<button
									:style="{
										backgroundColor: styles.button.hex,
										color: styles.buttonText.hex,
										borderColor: styles.buttonBorder.hex,
									}"
								>
									Button 1</button
								>&nbsp;
								<button
									:style="{
										backgroundColor: styles.button.hex,
										color: styles.buttonText.hex,
										borderColor: styles.buttonBorder.hex,
									}"
								>
									Button 2</button
								>&nbsp;
								<button
									:style="{
										backgroundColor: styles.button.hex,
										color: styles.buttonText.hex,
										borderColor: styles.buttonBorder.hex,
									}"
								>
									Button 3
								</button>
							</article>
							<div
								class="sidebar1"
								:style="{ backgroundColor: styles.sidebar1.hex }"
							>
								<h4 :style="{ color: styles.headerText.hex }">Sidebar 1</h4>
								<p :style="{ color: styles.secondaryText.hex }">
									Here is some more example text, this time entirely in the
									secondary text color. Also, here is
									<a href="#" :style="{ color: styles.linkText.hex }">
										another link </a
									>.
								</p>
							</div>
							<div
								class="sidebar2"
								:style="{ backgroundColor: styles.sidebar2.hex }"
							>
								<h4 :style="{ color: styles.headerText.hex }">Sidebar 2</h4>
								<button
									:style="{
										backgroundColor: styles.button.hex,
										color: styles.buttonText.hex,
										borderColor: styles.buttonBorder.hex,
									}"
								>
									Button 1
								</button>
								<button
									:style="{
										backgroundColor: styles.button.hex,
										color: styles.buttonText.hex,
										borderColor: styles.buttonBorder.hex,
									}"
								>
									Button 2
								</button>
								<button
									:style="{
										backgroundColor: styles.button.hex,
										color: styles.buttonText.hex,
										borderColor: styles.buttonBorder.hex,
									}"
								>
									Button 3
								</button>
							</div>
							<footer
								class="main-footer"
								:style="{
									backgroundColor: styles.footer.hex,
									color: styles.footerText.hex,
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
import ColorCard from './components/ColorCard.vue';
import Selector from './components/Selector.vue';
import { uuid } from 'vue-uuid';

export default {
	name: 'App',
	components: {
		ColorCard,
		Selector,
	},
	data() {
		return {
			colorList: [],
			styles: undefined,
		};
	},
	methods: {
		/** Add brand new color card set to card defaults. */
		addColorCard() {
			this.colorList.push({
				id: uuid.v1(),
				label: '',
				hex: '',
				showPicker: false,
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
				id: uuid.v1(),
				label: card.label,
				hex: card.hex,
				showPicker: card.showPicker,
			});
		},

		/** On Change of a color card, update the visualizer.
		 * @param card: The card that was changed
		 */
		colorUpdated(card) {
			if (this.styles) {
				for (let style in this.styles) {
					if (this.styles[style].id === card.id) {
						this.styles[style] = Object.assign({}, card);
					}
				}
			}
		},


		/** On clik to copy the selected hex color.
		 * @param card: The card with the selected color.
		 */
		copyHexToClipboard(card) {
			const el = document.createElement('textarea');  
			el.value = card.hex;                                 
			el.setAttribute('readonly', '');                
			document.body.appendChild(el);                  
			el.select();                                    
			document.execCommand('copy');                   
			document.body.removeChild(el);
		},


		/** Toggle the visibility of the color picker. Only one
		 * color picker will be open at a time.
		 * @param card: The card that was changed
		 */
		togglePicker(card) {
			for (let colorCard in this.colorList) {
				if (this.colorList[colorCard].id === card.id) {
					this.colorList[colorCard].showPicker = !this.colorList[colorCard]
						.showPicker;
				} else {
					this.colorList[colorCard].showPicker = false;
				}
			}
		},

		/** On Change of a color selector, update the inputted style by name.
		 * @param styleName: Name of the object in 'styles' that represents something in the visualizer
		 * @param selectedId: Color id the was selcted.
		 */
		selectorUpdated(styleName, selectedId) {
			const selectedColorCard = this.colorList.find((colorCard) => {
				return colorCard.id == selectedId;
			});

			if (selectedColorCard) {
				this.styles[styleName] = Object.assign({}, selectedColorCard);
			}
		},

		/**
		 * Confirmation menu pop-up to prevent user from accidentally reseting the color pool and selection.
		 */
		confirmReset() {
			if (
				confirm(
					'Are you sure? This will reset both the color pool and the selectors to the default configuration.'
				)
			) {
				this.setDefault();
			}
		},

		/**
		 * Exports the colors as a JSON file.
		 */
		exportColors() {
			const fileJSON = {
				colorList: this.colorList,
				styles: this.styles,
			};
			const jsonString = JSON.stringify(fileJSON);
			const dataUri =
				'data:application/json;charset=utf-8,' + encodeURIComponent(jsonString);
			const fileName = 'colors.json';
			let linkElement = document.createElement('a');
			linkElement.setAttribute('href', dataUri);
			linkElement.setAttribute('download', fileName);
			linkElement.click();
		},

		/** Clears the color pool and visualizer and sets everything to a default scheme.
		 * Used on page load and when the user clicks the "Reset" button.
		 */
		setDefault() {
			// First, reset the lists.
			this.colorList = [];
			this.styles = {};

			// Then, set defaults.
			this.colorList = [
				{
					id: uuid.v1(),
					label: 'Primary',
					hex: '#80d6ff',
					showPicker: false,
				},
				{
					id: uuid.v1(),
					label: 'Compliment',
					hex: '#ffa980',
					showPicker: false,
				},
				{
					id: uuid.v1(),
					label: 'Darkest',
					hex: '#222222',
					showPicker: false,
				},
				{
					id: uuid.v1(),
					label: 'Dark',
					hex: '#cccccc',
					showPicker: false,
				},
				{
					id: uuid.v1(),
					label: 'Light',
					hex: '#f0f0f0',
					showPicker: false,
				},
				{
					id: uuid.v1(),
					label: 'Lightest',
					hex: '#ffffff',
					showPicker: false,
				},
			];

			this.styles = {
				text: Object.assign({}, this.colorList[2]),
				secondaryText: Object.assign({}, this.colorList[0]),
				linkText: Object.assign({}, this.colorList[1]),
				headerText: Object.assign({}, this.colorList[1]),
				button: Object.assign({}, this.colorList[5]),
				buttonText: Object.assign({}, this.colorList[2]),
				buttonBorder: Object.assign({}, this.colorList[3]),
				nav: Object.assign({}, this.colorList[0]),
				navItemText: Object.assign({}, this.colorList[2]),
				pageBackground: Object.assign({}, this.colorList[3]),
				contentBackground: Object.assign({}, this.colorList[5]),
				mainContent: Object.assign({}, this.colorList[4]),
				sidebar1: Object.assign({}, this.colorList[2]),
				sidebar2: Object.assign({}, this.colorList[4]),
				footer: Object.assign({}, this.colorList[0]),
				footerText: Object.assign({}, this.colorList[2]),
			};

			this.selectList = [
				{ name: 'Text', bindName: 'text' },
				{ name: 'Secondary Text', bindName: 'secondaryText' },
				{ name: 'Link Text', bindName: 'linkText' },
				{ name: 'Header Text', bindName: 'headerText' },
				{ name: 'Button', bindName: 'button' },
				{ name: 'Button Text', bindName: 'buttonText' },
				{ name: 'Button Border', bindName: 'buttonBorder' },
				{ name: 'Nav', bindName: 'nav' },
				{ name: 'Nav Text', bindName: 'navItemText' },
				{ name: 'Page Background', bindName: 'pageBackground' },
				{ name: 'Content Background', bindName: 'contentBackground' },
				{ name: 'Main Content', bindName: 'mainContent' },
				{ name: 'Sidebar 1', bindName: 'sidebar1' },
				{ name: 'Sidebar 2', bindName: 'sidebar2' },
				{ name: 'Footer', bindName: 'footer' },
				{ name: 'Footer Text', bindName: 'footerText' },
			];
		},
	},
	created() {
		this.setDefault();
	},
};
</script>

<style lang="less">
@import './assets/css/styles.css';

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
						'main-content sidebar1'
						'main-content sidebar2'
						'footer       footer';

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
