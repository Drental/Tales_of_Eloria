import toeloriaItemSheet from "./sheets/toeloriaItemSheet.js";
import toeloriaCharSheet from "./sheets/toeloriaCharSheet.js";

Hooks.once("init", function(){
	console.log("toeloria | Initialising Tales of Eloria System");
	
	Items.unregisterSheet("core", ItemSheet);
	Items.registerSheet("toeloria", toeloriaItemSheet, { makeDefault: true });

	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet("toeloria", toeloriaCharSheet, { makeDefault: true });
});