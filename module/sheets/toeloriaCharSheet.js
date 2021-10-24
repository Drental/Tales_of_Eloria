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
			html.find("[data-toe-roll], [data-toe-ability]").on("click", this._rollAbilityCheck.bind(this));
			html.find(".item-delete").on("click", (event) => this.onClickDeleteItem(event));
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

		return {
			...baseData,
			owners,
			skills,
		};
	}

	async _rollAbilityCheck(event) {
		event.preventDefault();
		const { toeRoll, toeAbility } = event.currentTarget.dataset;
		let mod,
			flavor = "";
		flavor = this.actor.name + " würfelt";
		if (toeAbility) {
			console.log(this.actor.data);
			if (this.actor.data.data[toeAbility]?.value !== undefined) {
				mod = `+${this.actor.data.data[toeAbility].value}`;
				flavor = flavor + ` auf ${this.actor.data.data[toeAbility]?.name}`;
			}
		}
		const roll = new Roll(toeRoll + mod);
		await roll.evaluate({ async: true });
		roll.toMessage({ flavor });
	}

	async onClickDeleteItem(event) {
        const li = $(event.currentTarget).closest(".item");
        const itemId = li.attr("data-item-id") ?? "";
        const item = this.actor.items.get(itemId);

		await item.delete();
    }
}
