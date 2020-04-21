import React from "react";
import axios from "axios";
import {
  Form,
  Button,
  FormControl,
  Container,
  Col,
  Row,
} from "react-bootstrap";

import styles from "./TaggerForm.module.css";

class TaggerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memorialTypes: [
        {
          name: null,
          attributes: [{ name: null, value: null, required: null }],
        },
      ],
      memorials: [
        {
          type: null,
          attributes: [
            {
              name: null,
              value: null,
            },
          ],
        },
      ],
      typeSelectedIndex: null,
      error: null,
      isLoaded: false,
      submitMessage: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:1337/memorials/types").then(
      (res) => {
        this.setState({
          memorialTypes: res.data.memorialTypes,
          isLoaded: true,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error: error,
        });
      }
    );
  }

  dropDownChange(event) {
    const memorialType = [...this.state.memorialTypes][event.target.value];
    const memorial = {};
    memorial.type = memorialType.name;
    memorial.attributes = memorialType.attributes.map((attribute) => {
      return { name: attribute.name, value: attribute.value };
    });
    const newMemorials = [...this.state.memorials];
    newMemorials[0] = memorial;

    this.setState({
      typeSelectedIndex: event.target.value,
    });
    this.setState({ memorials: newMemorials });
  }

  inputChange(event, index) {
    const memorials = [...this.state.memorials];
    memorials[0].attributes[index].value = event.target.value;

    this.setState({ memorials: memorials });
  }

  taggerSubmitHandler(event) {
    event.preventDefault();
    this.setState({ submitMessage: "" });
    axios
      .post("http://localhost:1337/memorials", {
        memorials: this.state.memorials,
      })
      .then((res) => this.setState({ submitMessage: "Memorial submitted" }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <Container className={styles.mainContainer}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <Form.Group className={styles.dropDown}>
          <label>Memorial Types</label>
          <FormControl
            as="select"
            onChange={(event) => this.dropDownChange(event)}
          >
            {!this.state.typeSelectedIndex ? (
              <option>Select a type</option>
            ) : (
              ""
            )}
            {this.state.memorialTypes.map((type, n) => (
              <option key={n} value={n}>
                {type.name}
              </option>
            ))}
          </FormControl>
        </Form.Group>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Form onSubmit={(event) => this.taggerSubmitHandler(event)}>
          {!this.state.typeSelectedIndex ? (
            ""
          ) : (
            <Form.Group>
              {this.state.memorialTypes[
                this.state.typeSelectedIndex
              ].attributes.map((attribute, index) => (
                <div>
                  <Form.Label>{attribute.name}</Form.Label>

                  <Form.Control
                    onChange={(event) => this.inputChange(event, index)}
                    className={styles.required}
                    placeholder={attribute.value}
                    required={attribute.required}
                  />
                </div>
              ))}
              <br />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          )}
        </Form>
        <div className={styles.submitMessage}>{this.state.submitMessage}</div>
      </Container>
    );
  }
}

export default TaggerForm;
