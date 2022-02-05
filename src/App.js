import React, { Component } from 'react';
import Title from './components/Title';
import Search from './components/Search';
import Sort from './components/Sort';
import Form from './components/Form';
import ListItem from './components/ListItem';
import Items from './mockData/Items';
import { v4 as uuidv4 } from 'uuid';

class App extends Component {
  constructor(props) {
    let arrayLevel = [];
    super(props);
    this.state = {
      items: Items,
      showForm: false,
      arrayLevel: arrayLevel,
      valueItem: '',
      levelItem: 0,
      sortType: '',
      sortOrder: '',
      valueSearch: ''
    }
  }

  handleShowForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  }
  handleGetDataLevel = (arrayLevel) => {
    this.setState({
      arrayLevel: arrayLevel
    });
  }
  handleFormInputChange = (valueItem) => {
    this.setState({
      valueItem: valueItem
    });
  }
  handleFormSelectChange = (levelItem) => {
    this.setState({
      levelItem: levelItem
    });
  }
  handleFormClickCancel = () => {
    this.setState({
      showForm: !this.state.showForm,
      valueItem: '',
      levelItem: 0
    });
  }
  handleFormClickSubmit = () => {
    let { valueItem, levelItem } = this.state
    if (valueItem.trim() === 0) return false;
    let newItem = {
      id: uuidv4(),
      name: valueItem,
      level: +levelItem
    }
    Items.push(newItem);
    this.setState({
      items: Items,
      showForm: false,
      valueItem: '',
      levelItem: 0
    });
  }

  handleSort = (sortType, sortOrder) => {
    this.setState({
      sortType: sortType,
      sortOrder: sortOrder
    })
  }
  handleButtonClearClick = () => {
    this.setState({
      valueSearch: ''
    })
  }
  handleSearchInputChange = (searchValue) => {
    this.setState({
      valueSearch: searchValue
    })
  }
  render() {
    return (
      <div className="container">
        <Title />
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <Search
              valueSearch={this.state.valueSearch}
              handleSearchInputChange={this.handleSearchInputChange}
              handleButtonClearClick={this.handleButtonClearClick}
            />
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <Sort
              sortOrder={this.state.sortOrder}
              sortType={this.state.sortType}
              handleSort={this.handleSort}
            />
          </div>
          <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
            <button type="button" className="btn btn-info btn-block marginB10" onClick={this.handleShowForm}>{(this.state.showForm) ? 'Close Item' : 'Add Item'}</button>
          </div>
        </div>
        <div className="row marginB10">
          <div className="col-md-offset-7 col-md-5">
            <Form
              arrayLevel={this.state.arrayLevel}
              showForm={this.state.showForm}
              valueItem={this.state.valueItem}
              levelItem={this.state.levelItem}
              handleFormInputChange={this.handleFormInputChange}
              handleFormSelectChange={this.handleFormSelectChange}
              handleFormClickCancel={this.handleFormClickCancel}
              handleFormClickSubmit={this.handleFormClickSubmit}
            />
          </div>
        </div>
        <ListItem
          valueSearch={this.state.valueSearch}
          handleGetDataLevel={this.handleGetDataLevel}
          sortType={this.state.sortType}
          sortOrder={this.state.sortOrder}
        />
      </div>
    );
  }
}

export default App;
