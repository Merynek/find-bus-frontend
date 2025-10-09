interface IVerificationFeedback {
    created: Date;
    description: string;
}

export class VerificationFeedback {
    public created: Date;
    public description: string;

    constructor(settings: IVerificationFeedback) {
        this.created = settings.created;
        this.description = settings.description;
    }
}
