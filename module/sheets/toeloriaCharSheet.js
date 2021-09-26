export default class toeloriaCharSheet extends ActorSheet {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
        template: "systems/toeloria/templates/sheets/CharSheet.hbs",
        classes: ["toeloria", "sheet", "CharSheet"],
        tabs: [{navSelector: ".tabs", contentSelector: ".sheet-body", initial: "stats"}]   
        });
	};
};