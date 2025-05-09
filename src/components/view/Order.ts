import { IEvents } from "../base/events";
import { Form } from './Form';

export interface IOrder {
	buttons: HTMLButtonElement[];
	paymentMethod: string;
	render(): HTMLElement;
}

export class Order extends Form implements IOrder {
	buttons: HTMLButtonElement[];

	constructor(template: HTMLTemplateElement, events: IEvents) {
		super(template, events, '.form', '.order__button', '.form__errors');
		this.buttons = Array.from(this.form.querySelectorAll('.button_alt'));

		this.buttons.forEach(button => {
			button.addEventListener('click', () => {
				this.paymentMethod = button.name;
				events.emit('order:paymentMethod', { method: button.name });
			});
		});

		this.form.addEventListener('input', (event: Event) => {
			const target = event.target as HTMLInputElement;
			this.events.emit('order:changeAddressValue', { field: target.name, value: target.value });
		});
	}

	set paymentMethod(payment: string) {
		this.buttons.forEach(button => {
			button.classList.toggle('button_alt-active', button.name === payment);
		});
	}

	protected handleSubmit(): void {
		this.events.emit('contacts:open');
	}
}
