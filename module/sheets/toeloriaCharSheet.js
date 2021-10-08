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
            html.find('[data-toe-roll], [data-toe-ability]').on("click", this._rollAbilityCheck.bind(this));
        }
    }
    
    async _rollAbilityCheck(event) {
        event.preventDefault();
        const { toeRoll, toeAbility } = event.currentTarget.dataset;
        let mod, flavor = "";
        flavor = this.actor.name + " würfelt";
        if (toeAbility) {
            console.log(this.actor.data);
			if (this.actor.data.data[toeAbility]?.value !== undefined) {
                mod = `+${this.actor.data.data[toeAbility].value}`;
                flavor = flavor + ` auf ${this.actor.data.data[toeAbility]?.name}`;
            }
        }
        const roll = new Roll(toeRoll + mod);
        await roll.evaluate({async: true});
        roll.toMessage({flavor});
    }
};