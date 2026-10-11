type Toast = { id: number; text: string; action?: { href: string; label: string } };

/** Короткі повідомлення внизу екрана (озвучуються через role="status") */
class Toasts {
	items = $state<Toast[]>([]);
	private seq = 0;
	show(text: string, action?: Toast['action']) {
		const id = ++this.seq;
		this.items = [...this.items.slice(-2), { id, text, action }];
		setTimeout(() => this.dismiss(id), 4000);
	}
	dismiss(id: number) {
		this.items = this.items.filter((t) => t.id !== id);
	}
}

export const toast = new Toasts();
