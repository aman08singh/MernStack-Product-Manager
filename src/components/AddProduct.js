// New component for adding products

import React, { Component } from 'react';

class AddProduct extends Component 
{
  constructor(props)
  {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Creating onSubmit method
  // It will take an event
  onSubmit(event)
  {
    // We will first do event.preventDefault, to prevent the page from refreshing
    event.preventDefault();
    //Lets call this.props.onSubmit with the name and price
    this.props.onAdd(this.nameInput.value, this.priceInput.value);
    // Removing the name from the input field after product is added
    this.nameInput.value = '';
    this.priceInput.value = '';
  }

  render()
  {
    return(
      // Adding onSubmit event handler to the form
      // Which is equal to this.onSubmit which we will also bind in the constructor
        <form onSubmit={ this.onSubmit }>
            <h3>Add Product</h3>
            {/* lets create an input with a placeholder as Name */}
            {/* We want the value of the name and the inputs. TO do that we will add ref attributes to the inputs */}
            <input placeholder="Name" ref={ nameInput=>this.nameInput=nameInput }></input>
            {/* lets create an input with a placeholder as Price */}
            <input placeholder="Price" ref={ priceInput=>this.priceInput=priceInput }></input>
            <button>Add</button>
            <hr></hr>
        </form>
    );
  }
}
export default AddProduct;
