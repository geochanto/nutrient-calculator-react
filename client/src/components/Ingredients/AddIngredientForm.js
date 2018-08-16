import React from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import API from '../../utils/API';
import IngredientForm from './IngredientForm'

export default class AddIngredientForm extends React.Component {
  state = {
    IngredientName: "",
    Calories: "",
    Carbs: "",
    Sugar: "",
    Fat: "",
    Protein: "",
    hasGluten: false,
    isNut: false,
    isGMO: false
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.addIngredient(this.state).then(
      this.props.getIngredients()
    )
    this.setState({
      IngredientName: "",
      Calories: "",
      Carbs: "",
      Sugar: "",
      Fat: "",
      Protein: "",
      hasGluten: false,
      isNut: false,
      isGMO: false
    });
  };

  render() {
    return (
      <div className="addIngredientForm">
        <Row className="ingredientTitleRow">
          <Col>
            <strong>Add an Ingredient:</strong>
          </Col>
        </Row>
        <IngredientForm
          handleInputChange={this.handleInputChange}
          state={this.state}
        />
        <Button onClick={this.handleFormSubmit}>Submit</Button>
      </div>
    )
  }
}