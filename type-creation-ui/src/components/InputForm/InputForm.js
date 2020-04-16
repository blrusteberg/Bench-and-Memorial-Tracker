import React from "react";

class InputForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selected: props.selected.attributes
    };

      this.handleChange = this.handleChange.bind(this);
      this.addAttribute = this.addAttribute.bind(this);
      this.deleteAttribute = this.deleteAttribute.bind(this);
      this.saveAttributes = this.saveAttributes.bind(this);
    }

    saveAttributes(event){
      
    }

    handleChange(event){
      // console.log(this.state.selected);
      // this.setState({
      //   selected: this.state.selected.concat(newAttribute)
      // });
      this.state.selected[event.target.id].name = event.target.value
      // let newState = {'name' : event.target.value, "value": null, "required": false};
      // this.setState(prevState => {
      //   let selected = Object.assign({}, prevState.selected); 
      //   console.log(selected);
      //   selected[event.target.id] = newState;                     
      //   return selected;                          
      // })
      // document.getElementById(event.target.id).value = event.target.value;
    }

    handleSelected(type) {
      this.setState({selected: type.attributes});
    }

    addAttribute(event) {
      event.preventDefault();
      let newAttribute = {'name' : '', "value": null, "required": false};
      this.setState({
        selected: this.state.selected.concat(newAttribute)
      });
    }

    deleteAttribute(attribute, event) {
      event.preventDefault();
      const newSelected = this.state.selected.filter(item => {
        return item !== this.state.selected[attribute];
      });
      // delete this.state.selected[attribute];
      // let filtered = this.state.selected.filter(function (el) {
      //   return el != null;
      // });
      // this.state.selected = filtered;
      // this.setState(this.state.selected);
      this.setState({
        selected: newSelected
      })
      this.props.updateAttributes(newSelected);
    }

  
    render() {
      return (
        <div>
          <button onClick={this.addAttribute}>Add Attribute</button>
          <button onClick={this.saveAttributes}>Save</button>
          <form onChange={this.handleChange}>
            <label>
              {this.state.selected.map((item, n) => 
                <div><input type="text" key={item.name} defaultValue={item.name}  id={n} />
                <button onClick={this.deleteAttribute.bind(this, n)}>DELETE</button></div>
              )}
            </label>
          </form>
        </div>
      );
    }
}
  
export default InputForm;