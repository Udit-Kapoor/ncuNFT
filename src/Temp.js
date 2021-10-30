import React, { Component } from "react";

class RecipeForm extends Component {
  state = {
    name: "",
    ingredients: [{ ingredient_name: "", qty: "", units: "" }],
  };

  handleFieldChange = (event) => {
    if (["ingredient_name", "qty", "units"].includes(event.target.name)) {
      let ingredients = [...this.state.ingredients];
      ingredients[event.target.id][event.target.name] = event.target.value;
      this.setState({ ingredients });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };
  addIngredient = (event) => {
    event.preventDefault();
    this.setState({
      ingredients: [
        ...this.state.ingredients,
        { ingredient_name: "", qty: "", units: "" },
      ],
    });
  };

  removeIngredient = (index) => {
    this.state.ingredients.splice(index, 1);
    this.setState({
      ingredients: this.state.ingredients,
    });
  };
  //NOT APPLICABLE TO THIS EXAMPLE BUT HERE IF YOU NEED REFERENCE
  // handleFormSubmit = event => {
  // event.preventDefault();
  // let newRecipe this.state;
  // this.props.addNewRecipe(newRecipe); // this function could send a post request with your next
  // object
  // };
  //
  render() {
    return (
      <div>
        <h1>New Recipe </h1>
        <form
          onSubmit={this.handleFormSubmit}
          onChange={this.handleFieldChange}
        >
          <input
            fluid
            label="Name"
            placeholder="Recipe Name"
            name=" name"
            value={this.state.name}
          />
          <br />
          <h2>Ingredients</h2>
          <button onclick={this.addIngredient}>Add Ingredient</button>
          {this.state.ingredients.map((ingredient, index) => {
            return (
              <div key={index}>
                {/* ingredient name */}
                <input
                  type="text"
                  id={index}
                  placeholder="Ingredient Name"
                  name="ingredient_name"
                  value={ingredient.ingredient_name}
                />
                {/* ingredient qty */}
                <input
                  type="number"
                  fluid
                  id={index}
                  label="Qty"
                  placeholder="Quantity"
                  name="qty"
                  value={ingredient.qty}
                />
                {/* ingredient units */}
                <input
                  type="text"
                  fluid
                  id={index}
                  label="Units"
                  placeholder="Units"
                  name="units"
                  value={ingredient.units}
                />
                <button onClick={() => this.removeIngredient(index)}>
                  Remove
                </button>
              </div>
            );
          })}
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
export default RecipeForm;
