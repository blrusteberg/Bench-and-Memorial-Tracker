import React from "react";

class InputForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selected: props.selected.attributes,
        number: 0
    };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      // this.handleSelected = this.handleSelected.bind(this);
      this.addAttribute = this.addAttribute.bind(this);
      this.deleteAttribute = this.deleteAttribute.bind(this);
    }

    handleChange(event) {

    }

    handleSelected(type) {
      this.setState({selected: type.attributes});
    }
  
    handleSubmit(event) {
    }

    addAttribute(e) {
      e.preventDefault();
      let newAttribute = {};
      this.setState({
        selected: this.state.selected.concat(newAttribute)
      });
    }

    deleteAttribute(attribute, e) {
      e.preventDefault();
      delete this.state.selected[attribute];
      let filtered = this.state.selected.filter(function (el) {
        return el != null;
      });
      this.setState({ selected : filtered });
    }
  
    render() {
      return (
        <div>
          <button onClick={this.addAttribute}>Add Attribute</button>
          <input type="submit" value="Save" />
          <form onSubmit={this.handleSubmit}>
            <label>
              {this.state.selected.map((items, n) => (Object.keys(items)[0] === 'coordinates') ?
                <div><input type="text" defaultValue='latitude'/> 
                <br />
                <input type="text" defaultValue='longitude'/></div> :
                <div><input type="text" key={Object.keys(items)[0]} defaultValue={Object.keys(items)[0]} />
                <button onClick={this.deleteAttribute.bind(this, n)}>DELETE</button></div>
              )}
            </label>
          </form>
        </div>
      );
    }
}
  
export default InputForm;