import toeloriaItemSheet from "./sheets/toeloriaItemSheet.js";
import toeloriaCharSheet from "./sheets/toeloriaCharSheet.js";

Hooks.once("init", async function () {
	console.log("toeloria | Initialising Tales of Eloria System");

	Items.unregisterSheet("core", ItemSheet);
	Items.registerSheet("toeloria", toeloriaItemSheet, { makeDefault: true });

	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet("toeloria", toeloriaCharSheet, { makeDefault: true });

	await preloadHandlebarsTemplates();
});

async function preloadHandlebarsTemplates() {
	const templatesPath = [
		"systems/toeloria/templates/sheets/character/actor-notes.html",
		"systems/toeloria/templates/sheets/character/actor-attributes.html",
		"systems/toeloria/templates/sheets/character/actor-features.html",
		"systems/toeloria/templates/sheets/character/actor-inventory.html",
		"systems/toeloria/templates/sheets/character/actor-spellbook.html",
		"systems/toeloria/templates/sheets/character/actor-stats.html",
		"systems/toeloria/templates/sheets/CharSheet.hbs",
	];
	return loadTemplates(templatesPath);
}
