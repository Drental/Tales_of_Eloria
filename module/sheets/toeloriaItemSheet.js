export default class toeloriaItemSheet extends ItemSheet {
	get template() {
		return `systems/toeloria/templates/sheets/${this.item.data.type}-sheet.html`;		
	};
};