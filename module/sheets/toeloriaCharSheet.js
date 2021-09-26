export default class toeloriaCharSheet extends ActorSheet {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
        template: "systems/toeloria/templates/sheets/CharSheet.hbs",
        classes: ["toeloria", "sheet", "CharSheet"],
        tabs: [{navSelector: ".tabs", contentSelector: ".sheet-body", initial: "stats"}]   
        });
	};
	activateListeners(html) {
		if ( this.isEditable ) {
			html.find('.rollable [data-toe-roll]').on("click", (event) => {
				const { toeRoll } = event.currentTarget.dataset;
				const roll = new Roll(toeRoll + "+2");
				roll.evaluate();
				roll.toMessage();
			});
		}
	}
};
