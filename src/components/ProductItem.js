// Component that have self contained state, with a single product name and price.

import React, { Component } from 'react';

class ProductItem extends Component {
  // Binding onDelete method in the constructor
  // Binding onEdit method in the constructor
  constructor(props) 
  {
    super(props);

    // Adding this.state property. This property will tell us whether we are in edit mode or normal view mode unless default is edit to false
    this.state = 
    {
      // Defaulting onEdit to false
      isEdit: false
    };
    // Binding onDelete in the constructor
    this.onDelete = this.onDelete.bind(this);
    // Binding onEdit in the constructor
    this.onEdit = this.onEdit.bind(this);
    // Binding onEditSubmit in the constructor
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  // Defininy onDelete method
  // We are just going to pass the name into the onDelete method that's being passed in as a prop from App.js
  onDelete() {
    // Using destructing to make a little cleaner
    const { onDelete, name } = this.props;
    // We can write directly like this = this.props.onDelete(this.props.name);
    // But after using destructuring, it's like this
    onDelete(name);
  }

  // Creating onEdit method
  // Here we set isEdit to true
  onEdit() 
  {
    this.setState({ isEdit: true });
  }

  // Creating onEditSubmmit method
  onEditSubmit(event) 
  {
    event.preventDefault();
    // Calling this.props. Passing parameters in the onEditSubmit method
    // Since we are going to find the product in the full list with its original name, so we also have to pass the original name as well.
    // Normally we would use an unique id for something like this.
    this.props.onEditSubmit(this.nameInput.value, this.priceInput.value, this.props.name);
    // After we submit we need to change back the productItem to false
    this.setState({ isEdit: false });
  }

  render() {
    // Getting the name and price from the props
    // Defyning onDelete from the props
    const { name, price } = this.props;
    return (
      <div>
      {
        this.state.isEdit
          ?
          (
            // If this.state.isEdit is true, then we will render the edit version
            <form onSubmit={ this.onEditSubmit }>
            {/* When we will click edit the name and price inputs, will be defaulted to the products name and price. */}
            {/* But, if we use value, we also need to include an unchanged event handler to make it a controlled input */}
            {/* To attain this, we initialise defaultValue */}
            {/* Setting the default of the text values, so we have values as the name and price */}
              <input placeholder="Name" ref={ nameInput=>this.nameInput=nameInput } defaultValue={ name }></input>
              {/* lets create an input with a placeholder as Price */}
              {/* Setting the default of the text values, so we have values as the name and price */}
              <input placeholder="Price" ref={ priceInput=>this.priceInput=priceInput } defaultValue={ price }></input>
              <button>
                Save
              </button>
            </form>
          )
          :
          (
            // If not true
            <div>
              <span>{name}</span>
              {' : '} {/* //Single curly braces and backtick, preserves the spaces. which is a ES6 feature */}
              <span>{price}</span>
              {' | '}
              {/* Its actually make it a reference to an unDelete method in this file to avoid having to bind anything in the render method */}
              <button onClick={this.onEdit}>
                Edit
              </button>
              {' | '}
              {/* Delete button */}
              {/* Adding click handler for onDelete inside button. */}
              <button onClick={this.onDelete}>
                Delete
              </button>
            </div>
          )
        }
      </div>
    );
  }
}
export default ProductItem;
