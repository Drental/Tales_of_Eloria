export default class toeloriaItemSheet extends ItemSheet {
	
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
        width: 530,
		hight: 340,
        classes: ["toeloria", "sheet", "ItemSheet"]
        });
	};

	get template() {
		return `systems/toeloria/templates/sheets/${this.item.data.type}-sheet.html`;		
	};

	getData() {
		const data =super.data();
		data.config = CONFIG.toeloria;

		return data;
	};
};