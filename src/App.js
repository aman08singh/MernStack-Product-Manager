import React, { Component } from 'react';
import './App.css';

// Importing local components
import ProductItem from './components/ProductItem';
import AddProduct from './components/AddProduct';

// Importing json file as a form of data
import products from './json/Data.json';

// This is an another way of storing data, if you are storing data like this, then you don't have to import json
// Creating array with some products
// const products = [
//   {
//       name:'ipad',
//       price:200
//   },
//   {
//       name:'iphone',
//       price:650
//   }
// ];


// Initiating local storage database
// local storage with some initial products
// Set products as the json stringify version of the array, that we just created
localStorage.setItem('products', JSON.stringify(products));

class App extends Component {

  // creating a state that we're going to store this array in
  // And then instead of reading and writing to local storage all the time, just interact with the state to make things little simpler
  // Whenever we interact with the state we can also write code to store the new state into local storage or whatever database, you want to use.
  // Fteching/Reading products data from local storage
  // Creating a constructor method
  constructor(props)
  {
    super(props);
    
    //Creating a state object
    // Having only one property called products
    // It will start as an empty array
    this.state = 
    {
      products:JSON.parse(localStorage.getItem('products'))
    };

    // Binding context to this in the constructor
    this.onDelete = this.onDelete.bind(this);
    // Binding onAdd method to the constructor
    this.onAdd = this.onAdd.bind(this);
    // Binding onEditSubmit method in the construstor
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  componentWillMount()
    {
      // We need the getProducts method to just return the list of products
      // Let set the this.products in componentwillmount to be a variable
      const products = this.getProducts();
      // move the this.setState up the component willmout
      this.setState({ products });
    }

    // Creating seperate method getting products
    getProducts()
    {
      // Converting JSON stringify version to JavaScript version, by using JSON.parse
      // Let return the list of products
      // We actually want our getProducts to return the products from the state instead from localStorage, which we aren't updating in our app.
      // Refactoring done
      // Lets have our initial state and constructor be directly from localStorage
      // Change our getProducts to get products from the state
      // After we get the products
      // Using setState to set the products we got from local storage
      this.setState({ products });
      return this.state.products;
    }

    // Adding code to add products
    // Passing name and the price of the product of the product we want to add as parameter
    onAdd(name, price)
    {
      // Add the product to the state
      const products = this.getProducts();
      // Adding an object with the name and price of the product
      products.push({
        name, price
      });
      // Setting state to products
      this.setState({ products });
    }
    
    // OnDelete method
    // It is going to take name as a parameter
    onDelete(name)
    {
      const products = this.getProducts();
      // For each product we only want the ones that don't match the name of the product we clicked to delete
      const filteredProducts = products.filter(product=>{
        return product.name !== name;
      });
      // Console log the make sure we get what we delete
      console.log(filteredProducts);
      // console.log(name);
      // Since we are going to use this.setState in this method, we will need to bind the context to this in the constructor first
      // Set the state of products to the filteredProducts
      this.setState({ products: filteredProducts });
    }

    // Creating onEditSubmit method which will take name, price, and originalName
    onEditSubmit(name, price, originalName)
    {
      // Since we are changing the products variable, we need to change the const to let.
      let products = this.getProducts();
      products = products.map(product => 
      {
        // If a product name equals the name we pass in, then we will set the product name and the price to the new values in the inputs
        if(product.name === originalName)
        {
          product.name = name;
          product.price = price;
        }
        // And since we are using map we need to return the products at the end of the function
        return product;
      });
      // Saving with this.setState
      this.setState({ products });
      // You can uncomment below statement to view the changed data being passed. In the console.
      // console.log(name, price, originalName);
    }

  render() {
    return (
      <div className="App">
        <h1>Product Manager</h1>
        <hr></hr>
        {/* Passing onAdd method as a prop into the addProduct Component */}
        <AddProduct onAdd={ this.onAdd }></AddProduct>
        {/* Displaying products */}
        {
          this.state.products.map(product => 
          {
            return(
              // Using ProductItem component
              // Giving the key as product name
              // And pass the name and the price of the product
              // <ProductItem key={ products.name } name={ products.name } price={ products.price }></ProductItem> or
              // This is the ES6 way of passing multiple props.
              // Passing onDelete function into productItem component.
              // Passing onEditSubmit function into productItem component.
              <ProductItem key={ product.name } {...product} onDelete={ this.onDelete } onEditSubmit={ this.onEditSubmit }></ProductItem>
                // We are going to pass the name of the product we want to delete into our delete eventhandler.
                // Binding to methods in the render method isn't the best practice. Since that bound method would be recreated every time the state changes.
            );
          })
        }
      </div>
    );
  }
}

export default App;
