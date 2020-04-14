import React from "react";

class InputForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        change: props.selected.attributes,
        selected: props.selected.attributes,
        testObj: []
    };

  
      this.addAttribute = this.addAttribute.bind(this);
      this.deleteAttribute = this.deleteAttribute.bind(this);
      this.saveAttributes = this.saveAttributes.bind(this);
    }

    saveAttributes(event){
      
    }

    handleSelected(type) {
      this.setState({selected: type.attributes});
    }

    addAttribute(event) {
      event.preventDefault();
      let newAttribute = {'' : null};
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
    }

  
    render() {
      return (
        <div>
          <button onClick={this.addAttribute}>Add Attribute</button>
          <button onClick={this.saveAttributes}>Save</button>
          <form>
            <label>
              {this.state.selected.map((items, n) => (Object.keys(items)[0] === 'coordinates') ?
                <div><input type="text" defaultValue='latitude' readOnly = {true} /> 
                <br />
                <input type="text" defaultValue='longitude' readOnly = {true} /></div> :
                <div><input type="text" key={Object.keys(items)[0]} defaultValue={Object.keys(items)[0]}  id={n} />
                <button onClick={this.deleteAttribute.bind(this, n)}>DELETE</button></div>
              )}
            </label>
          </form>
        </div>
      );
    }
}
  
export default InputForm;