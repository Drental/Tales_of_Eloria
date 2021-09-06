import toeloriaItemSheet from "./sheets/toeloriaItemSheet.js";

Hooks.once("init", function(){
	console.log("toeloria | Initialising Tales of Eloria System");
	
	Items.unregisterSheet("core", ItemSheet);
	Items.registerSheet("toeloria", toeloriaItemSheet, { makeDefault: true });
});