import { IEvents } from "../base/events";
import { getElementOrLogError } from '../../utils/utils';

export abstract class Form {
    protected form: HTMLFormElement;
    protected submitButton: HTMLButtonElement;
    protected errorMessages: HTMLElement;

    get errors(): HTMLElement {
        return this.errorMessages;
    }

    constructor(
        template: HTMLTemplateElement,
        protected events: IEvents,
        formSelector: string,
        submitButtonSelector: string,
        errorMessagesSelector: string
    ) {
        this.form = getElementOrLogError<HTMLFormElement>(formSelector, template.content).cloneNode(true) as HTMLFormElement;
        this.submitButton = getElementOrLogError<HTMLButtonElement>(submitButtonSelector, this.form);
        this.errorMessages = getElementOrLogError<HTMLElement>(errorMessagesSelector, this.form);

        this.form.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.handleSubmit();
        });
    }

    set isValid(value: boolean) {
        this.submitButton.disabled = !value;
    }

    render(): HTMLElement {
        return this.form;
    }

    protected abstract handleSubmit(): void;
}