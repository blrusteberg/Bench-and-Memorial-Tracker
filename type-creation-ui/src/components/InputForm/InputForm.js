import React from "react";

class InputForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selected: props.selected.attributes,
    };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

    }

    handleSelected(type) {
      this.setState({selected: type.attributes});
    }
  
    handleSubmit(event) {
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            {this.state.selected.map((items) => (Object.keys(items)[0] === 'coordinates') ?
              <div><input type="text" value='latitude' name={Object.keys(items)[0]} /> 
              <br />
              <input type="text" value='longitude'name={Object.keys(items)[0]} /></div> :
              <div><input type="text" value={Object.keys(items)[0]} name={Object.keys(items)[0]} /></div>
            )}
          </label>
          <input type="submit" value="Save" />
        </form>
      );
    }
}
  
export default InputForm;