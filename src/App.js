import React from 'react';
import './App.css';
let productList = [   ];
class Header extends React.Component{
   render()     {
     return  (
         <div className="form-header">
           <h1>
             <center>
               Shopping Page
             </center>
           </h1>
         </div>
     );
   }
}
class ProductForm extends React.Component {
  submit(e) {
    e.preventDefault();
    var product = {
      name: this.refs.name.value,
      price: Number(this.refs.price.value),
      info: this.refs.info.value
    };
    this.props.handleProduct(product);
    this.refs.name.value = "";
    this.refs.price.value = 0;
    this.refs.info.value = "";
  }
  render() {
    return (
      <div className="data-component">
        <form onSubmit={this.submit.bind(this)}>
          <div className="add-product-main-component">
            <h1 className="add-product-header">Add New Product</h1>
            <div className="form-group">
              <label className="col-sm-form-label">NAME : </label>
              <div className="label-field">
                <input type="text" className="form-control" ref="name" placeholder="Enter Item Name" required />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-form-label">PRICE : </label>
              <div className="label-field">
                <input type="number" className="form-control" ref="price" placeholder="Enter the Price" required />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-form-label">INFORMATION : </label>
              <div className="label-field">
                <textarea className="form-control" ref="info" placeholder="Enter information like product company" />
              </div>
            </div>
            <div className="row form-group">
              <div className="offset-2 col-10">
                <button className="btn btn-outline-primary">CREATE PRODUCT</button>
              </div>
            </div>
            <hr />
          </div>
        </form>
      </div>
    );
  }
}
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0
    };
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.showInfo = this.showInfo.bind(this);
  }
  add() {
    this.setState({ quantity: this.state.quantity + 1 });
    this.props.handleTotal(this.props.price);
  }
  subtract() {
    this.setState({ quantity: this.state.quantity - 1 });
    this.props.handleTotal(-this.props.price);
  }
  showInfo() {
    this.props.handleShow(this.props.info);
  }
  render() {
    return (
      <div className="data-component">
        <div className="row form-group">
          <h1>{this.props.name}: ${this.props.price}</h1>
          <div className="col-sm-2 text-right">Quantity: {this.state.quantity}</div>
        </div>
        <div className="row btn-toolbar">
          <button className="btn btn-outline-primary" onClick={this.showInfo}>
            Show More Information
              </button>
          <div className="btn-content">
            <button className="btn btn-outline-primary" onClick={this.add}>
              Add to card
              </button>
            <button className="btn btn-outline-primary" onClick={this.subtract} disabled={this.state.quantity < 1}>
              Remove from cart
            </button>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
class Total extends React.Component {
  render() {
    let itemPrice = this.props.itemPrice.toFixed(2);
    let tax = (this.props.itemPrice * 0.15).toFixed(2);
    let totalTax = (+itemPrice + +tax).toFixed(2);
    return (
      <div className="total-component">
        <h3 className="total-component-data">
          <span className="col-6">Product Price :  </span>
          <span className="col-6 text-right">${itemPrice}</span>
        </h3>
        <h3 className="total-component-data">
          <span className="col-6">Tax (15%) :  </span>
          <span className="col-6 text-right">${tax}</span>
        </h3>
        <h3 className="total-component-data">
          <span className="col-6">Total Item Price  :   </span>
          <span className="col-6 text-right">${totalTax}</span>
        </h3>
      </div>
    );
  }
}
class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemPrice: 0,
      productList: ""
    };
    this.createProduct = this.createProduct.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.showProduct = this.showProduct.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ productList: productList });
    }, 1000);
  }
  createProduct(product) {
    this.setState({
      products: this.state.productList.push(product)
    });
  }

  calculateTotal(price) {
    this.setState({
      itemPrice: this.state.itemPrice + price
    });
    console.log(this.state.itemPrice);
  }

  showProduct(info) {
    console.log(info);
    alert(info);
  }

  render() {
    if (!this.state.productList) return <h1><center>Please Wait....Loading</center></h1>;

    var component = this;
    var products = this.state.productList.map(function (product) {
      return (
        <Product
          name={product.name}
          price={product.price}
          info={product.info}
          handleShow={component.showProduct}
          handleTotal={component.calculateTotal}
        />
      );
    });

    return (
      <div>
        <Header/>
        <ProductForm handleProduct={this.createProduct} />
        {products}
        <Total itemPrice={this.state.itemPrice} />
      </div>
    );
  }
}
export default ProductList;
