import React, { Component } from 'react';
import Items from './Items';
import NewItem from './NewItem';

class Application extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [
				{
					value: 'Pants',
					id: Date.now(),
					packed: false
				}
			]
		};

		this.addItem = this.addItem.bind(this);
		this.markAsPacked = this.markAsPacked.bind(this);
		this.markAllAsUnpacked = this.markAllAsUnpacked.bind(this);
	}

	addItem(item) {
		this.setState({ items: [item, ...this.state.items]});
	}

	markAsPacked(item) {
		const otherItems = this.state.items.filter(
			other => other.id !== item.id
		);

		const updateItem = { ...item, packed: !item.packed };
		this.setState({ items: [updateItem, ...otherItems]});
	}

	markAllAsUnpacked() {
		const items = this.state.items.map(item => ({ ...item, packed:false }));
		this.setState({ items });
	}

	render() {
		const { items } = this.state;
		const unpackedItems = items.filter(item => !item.packed);
		const packedItems = items.filter(item => item.packed);

		return(
			<div className="application">
				<NewItem onSubmit={this.addItem} />
				<Items
					title="Unpacked Items"
				  items={unpackedItems}
				  onCheckOff={this.markAsPacked}
				/>
				<Items
					title="Packed Items"
					items={packedItems}
					onCheckOff={this.markAsPacked}
				/>
				<button
					className="button full-width"
					onClick={this.markAllAsUnpacked}>
					Mark All As Unpacked
				</button>
			</div>
		);
	}
}

export default Application;