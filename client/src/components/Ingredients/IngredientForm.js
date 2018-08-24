import React from 'react';
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import Promise from 'promise-polyfill';

const IngredientForm = props => {
  const { handleInputChange } = props
  const { IngredientName, Calories, Carbs, Sugar, Fat, Protein, hasGluten, isNut, isGMO } = props.state
  return (
    <AvForm>
      <Row>
        <Col>
          <AvGroup>
            <Label for="IngredientName">Ingredient Name</Label>
            <AvInput type="text" name="IngredientName" value={IngredientName} onChange={handleInputChange} validate={{required: true}}/>
          </AvGroup>
        </Col>
        <Col>

          <AvGroup>
            <Label for="Calories">Calories per oz</Label>
            <AvInput type="number" name="Calories" value={Calories} onChange={handleInputChange}  validate={{required: true, number: true}}/>
          </AvGroup>
        </Col>
        <Col>
          <AvGroup>
            <Label for="Carbs">Carbs per oz</Label>
            <AvInput type="number" name="Carbs" value={Carbs} onChange={handleInputChange} validate={{required: true, number: true}}/>
          </AvGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <AvGroup>
            <Label for="Sugar">Sugar per oz</Label>
            <AvInput type="number" name="Sugar" value={Sugar} onChange={handleInputChange} validate={{required: true, number: true}}/>
          </AvGroup>
        </Col>
        <Col>
          <AvGroup>
            <Label for="Fat">Fat per oz</Label>
            <AvInput type="number" name="Fat" value={Fat} onChange={handleInputChange} validate={{required: true, number: true}}/>
          </AvGroup>
        </Col>
        <Col>
          <AvGroup>
            <Label for="Protein">Protein per oz</Label>
            <AvInput type="number" name="Protein" value={Protein} onChange={handleInputChange} validate={{required: true, number: true}}/>
          </AvGroup>
        </Col>
      </Row>
      <Row>
        <Col md="2">
          <AvGroup check>
            <Label check>
              <AvInput type="checkbox" name="hasGluten" checked={hasGluten} onChange={handleInputChange}/>
              Has Gluten?
                      </Label>
          </AvGroup>
        </Col>
        <Col md="2">
          <AvGroup check>
            <Label check>
              <AvInput type="checkbox" name="isNut" checked={isNut} onChange={handleInputChange} />
              Is a Nut?
                      </Label>
          </AvGroup>
        </Col>
        <Col md="2">
          <AvGroup check>
            <Label check>
              <AvInput type="checkbox" name="isGMO" checked={isGMO} onChange={handleInputChange} />
              is GMO?
                      </Label>
          </AvGroup>
        </Col>
      </Row>
    </AvForm>
  )
}

export default IngredientForm;