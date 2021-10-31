import {attributeRoll} from '../helpers/dice.js'

export default class toeloriaCharSheet extends ActorSheet {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			template: "systems/toeloria/templates/sheets/CharSheet.hbs",
			classes: ["toeloria", "sheet", "CharSheet"],
			tabs: [{ navSelector: ".tabs", contentSelector: ".sheet-body", initial: "stats" }],
		});
	}

	activateListeners(html) {
		super.activateListeners(html);
		if (this.isEditable) {
			html.find(".rollable").on("click", this._onRoll.bind(this));
			html.find(".item-delete").on("click", (event) => this.onClickDeleteItem(event));
			html.find(".changeable-value").on("click", (event) => this.onChangeValue(event));
		}
	}

	async getData() {
		const character = this.actor;
		// find all owners, which are the list of all potential masters
		const owners = Object.entries(character.data.permission)
			.filter(([_id, permission]) => permission === CONST.ENTITY_PERMISSIONS.OWNER)
			.flatMap(([userID]) => game.users.get(userID) ?? []);

		// TEMPORARY solution for change in 0.8 where actor in super.getData() is an object instead of the data.
		// The correct solution is to subclass ActorSheetPF2e, but that is a more involved fix.
		const actorData = this.actor.toObject(false);
		const baseData = await super.getData();
		baseData.actor = actorData;
		baseData.data = actorData.data;
		const skills = actorData.items.filter((s) => s.type === "Skills")
		const features = actorData.items.filter((s) => s.type === "Fertigkeiten")

		return {
			...baseData,
			owners,
			skills,
			features,
		};
	}

	async _onRoll(event) {
		event.preventDefault();
		const element = event.currentTarget;
		const dataset = element.dataset;
	
		// Handle rolls.
		if (dataset.rollType) {
			if (dataset.rollType === 'item') {
				const itemId = element.closest('.item').dataset.itemId;
				const item = this.actor.items.get(itemId);
				if (item) return item.roll();
			} else if (dataset.rollType === "attribute") {
				return attributeRoll( dataset.attribute, this.actor );  
			}
		}
		// let mod,
		// 	flavor = "";
		// flavor = this.actor.name + " würfelt";
		// if (toeAbility) {
		// 	console.log(this.actor.data);
		// 	if (this.actor.data.data[toeAbility]?.value !== undefined) {
		// 		mod = `+${this.actor.data.data[toeAbility].value}`;
		// 		flavor = flavor + ` auf ${this.actor.data.data[toeAbility]?.name}`;
		// 	}
		// }
		// const roll = new Roll(toeRoll + mod);
		// await roll.evaluate({ async: true });
		// roll.toMessage({ flavor });
	}

	async onClickDeleteItem(event) {
        const li = $(event.currentTarget).closest(".item");
        const itemId = li.attr("data-item-id") ?? "";
        const item = this.actor.items.get(itemId);

		await item.delete();
    }

	async onChangeValue(event) {
		const element = event.currentTarget;
		const dataset = element.dataset;
		const $select = $(event.delegateTarget);
		const selectedValue = Number($select.val());
        const li = $(event.currentTarget).closest(".item") ?? "";
        const itemId = li?.attr("data-item-id") ?? "";
		const item = this.actor.items.get(itemId);
		const oldvalue = getProperty(item, "data."+dataset.property)
		if (item) {
			if (oldvalue != selectedValue) {
				await this.actor.updateEmbeddedDocuments("Item", [
					{
						_id: itemId,
						[dataset.property]: selectedValue,
					},
				]);
			}
		} else {

		}
	}
}
