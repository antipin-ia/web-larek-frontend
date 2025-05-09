import { IEvents } from "../base/events";
import { Form } from './Form';

export interface IContacts {
	inputs: HTMLInputElement[];
	render(): HTMLElement;
}

export class Contacts extends Form implements IContacts {
	inputs: HTMLInputElement[];

	constructor(template: HTMLTemplateElement, events: IEvents) {
		super(template, events, '.form', '.button', '.form__errors');
		this.inputs = Array.from(this.form.querySelectorAll('.form__input'));
		this.attachInputListeners();
	}

	private attachInputListeners(): void {
		this.inputs.forEach(input => {
			input.addEventListener('input', (event) => {
				const target = event.target as HTMLInputElement;
				const fieldName = target.name;
				const fieldValue = target.value;
				this.events.emit('contacts:inputChange', { field: fieldName, value: fieldValue });
			});
		});
	}

	protected handleSubmit(): void {
		this.events.emit('renderSuccessWindow:open');
	}
}
