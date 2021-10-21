<template>
	<div class="color-card">
		<div class="color-label">
			<label>Color Label</label>
			<input type="text" v-model="card.label" />
		</div>
		<div class="color-hex">
			<label>Hex Code</label>
			<div class="color-hex-input">
				<input
					type="text"
					v-model="card.hex"
					@change="$emit('colorUpdated', card)"
				/>
				<button @click="$emit('copyHexToClipboard', card)">
					<img src="../assets/icons/copy.svg" alt="Copy hex to clipboard" />
				</button>
			</div>
		</div>
		<div class="color-preview" :style="{ backgroundColor: card.hex }"></div>
		<color-panel
			v-model="card.hex"
			:class="card.showPicker ? 'show' : 'hide'"
			@change="$emit('colorUpdated', card)"
		></color-panel>
		<div class="color-actions">
			<button class="card-action">
				<img src="../assets/icons/move.svg" alt="Move Color Card" />
			</button>
			<button @click="$emit('togglePicker', card)" class="card-action">
				<img src="../assets/icons/color-picker.svg" alt="Color Picker" />
			</button>
			<button @click="$emit('duplicate', card)" class="card-action">
				<img src="../assets/icons/copy.svg" alt="Duplicate Color Card" />
			</button>
			<button @click="$emit('remove', card.id)" class="card-action">
				<img src="../assets/icons/trash.svg" alt="Remove Color Card" />
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ColorCard',
	props: {
		initialCard: {
			id: String,
			label: String,
			hex: String,
			showPicker: Boolean,
		},
	},
	data() {
		return {
			card: this.initialCard,
		};
	},
};
</script>

<style lang="less" scoped>
.color-card {
	position: relative;
	padding: 0.5rem;
	border: 1px solid black;
	border-radius: 5px;
	background: #fff;

	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-areas:
		'label preview'
		'hex preview'
		'actions actions';
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
		border: 1px solid #eeeeee;
		cursor: pointer;
	}

	.one-colorpanel {
		display: none;
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		z-index: 1;

		&.show {
			display: block;
		}
	}

	.color-actions {
		grid-area: actions;

		display: inline;

		button {
			width: 30px;
			margin-right: 0.5rem;
		}
	}

	.color-hex-input {
		display: inline-flex;

		input {
			width: 100%;
			padding-right: 20px;
		}
		button {
			padding: 0%;
			margin-left: -20px;
			width: 20px;
			height: 20px;
		}
	}
}
</style>
