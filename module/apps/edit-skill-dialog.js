/**
 * A specialized Dialog subclass for editing skills
 * @type {Dialog}
 */
export class AddEditSkillDialog extends Dialog {
    constructor(skill, dialogData={}, options={}) {
        super(dialogData, options);
        this.options.classes = ["starfinder", "dialog"];

        /**
         * Store a reference to the skill being edited
         * @type {Object}
         */
        this.skill = skill;
    }

    activateListeners(html) {
        super.activateListeners(html);
    }

    /**
     * A factory method which displays the Edit Skill dialog for a given skill.
     * 
     * Returns a Promise which resolves to the dialog FormData once the workflow has been completed.
     * @param {String} skillId The internal ID for the skill
     * @param {Object} skill The skill being updated
     * @param {Boolean} isEdit Flag to let the method know if a skill is being added or being edited
     * @returns {Promise}
     */
    static async create(skillId, skill, isEdit = true) {
        let hasSubName = typeof skill.subname !== "undefined";
        const html = await renderTemplate("systems/starfinder/templates/apps/add-edit-skill.html", {
            skill: skill,
            hasSubName,
            config: CONFIG.STARFINDER
        });

        return new Promise((resolve, reject) => {
            const dlg = new this(skill, {
                title: `${CONFIG.STARFINDER.skills[skillId]}: ${(isEdit ? "Edit Skill" : "Add Skill")}`,
                content: html,
                buttons: {
                    submit: {
                        label: "Submit",
                        callback: html => resolve(new FormData(html[0].querySelector('#add-edit-skill-form')))
                    },
                    cancel: {
                        icon: '<i class="fas fa-times"></i>',
                        label: "Cancel",
                        callback: () => resolve(false)
                    }
                },
                default: "submit"
            });
            dlg.render(true);
        });
    }
}