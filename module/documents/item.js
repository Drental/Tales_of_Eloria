export default class toeloriaItem extends Item {
	prepareData() {
		super.prepareData();
	}

	getRollData() {
		// If present, return the actor's roll data.
		if (!this.actor) return null;
		const rollData = this.actor.getRollData();
		rollData.item = foundry.utils.deepClone(this.data.data);

		return rollData;
	}

	// getFormula() {
	// 	const item = this.data;
	// 	if (this.type = "Skills") {
	// 		const anwendungsstufe = item.SkillUsage?.value;
	// 		let formula = `1d12 + ${anwendungsstufe}`;
	// 		return formula;
	// 	}
	// 	return null;
	// }

	async roll() {
		const item = this.data;

		const speaker = ChatMessage.getSpeaker({ actor: this.actor });
		const rollMode = game.settings.get("core", "rollMode");
		let label = `[${item.type}] ${item.name}`;

		let content = item.data.description ?? "";

		if (!item.data.formula) {
			ChatMessage.create({
				speaker: speaker,
				rollMode: rollMode,
				flavor: label,
				content,
			});
		}
		else {
			const rollData = this.getRollData();
			const roll = new Roll(rollData.item.formula, rollData).roll();

			label = this.enhanceRollFlavor(roll, label, item);

			roll.toMessage({
				speaker: speaker,
				rollMode: rollMode,
				flavor: label,
			});
			return roll;
		}
	}

	enhanceRollFlavor(roll, label, item) {
		if (this.type === "Skills") {
			const anwendungsstufe = item.data.SkillUsage?.value ?? 0;
			const SkillDifficult = (8 - anwendungsstufe);
			if ( roll.total > SkillDifficult ) {
				return label + ` Erfolg (diff: ${SkillDifficult})`
			} else {
				return label + ` Misserfolg (diff: ${SkillDifficult})`
			}
		}
	}
}
