import React, { Component } from 'react';
import Items from '../mockData/Items';
import Item from '../components/Item';
import SweetAlert from 'sweetalert-react';
import ItemEdit from '../components/ItemEdit';
import { orderBy as orderById } from 'lodash';

class ListItem extends Component {
    constructor(props) {
        super(props);
        let arrayLevel = [];
        if (Items.length > 0) {
            for (let i = 0; i < Items.length; i++) {
                if (arrayLevel.indexOf(Items[i].level) === -1) {
                    arrayLevel.push(Items[i].level);
                }
            }
        }
        this.props.handleGetDataLevel(arrayLevel);
        arrayLevel.sort(function (a, b) { return a - b });
        this.state = {
            items: Items,
            showAlert: false,
            titleAlert: '',
            idAlert: '',
            indexEdit: '',
            idEdit: '',
            nameEdit: '',
            levelEdit: 0,
            arrayLevel: arrayLevel,
            showForm: false
        }
    }

    renderItem = () => {
        let { items, idEdit, indexEdit, nameEdit, levelEdit, arrayLevel } = this.state;
        let { sortType, sortOrder,valueSearch } = this.props;
        if (items.length === 0) {
            return <Item item={0} />
        }
        if (sortType !== '' && sortOrder !== '') {
            items = orderById(items, [sortOrder],[sortType])
        }
        // if (valueSearch !== '') {
        //     items = items.filter((item,index)=>{
        //         return item.name.includes(valueSearch)
        //     })
            
        // }
        return items.map((item, index) => {
            if (item.id === idEdit) {
                return (
                    <ItemEdit
                        key={index}
                        indexEdit={indexEdit}
                        nameEdit={nameEdit}
                        levelEdit={levelEdit}
                        arrayLevel={arrayLevel}
                        handleEditClickCancel={this.handleEditClickCancel}
                        handleEditInputChange={this.handleEditInputChange}
                        handleEditSelectChange={this.handleEditSelectChange}
                        handleEditClickSubmit={this.handleEditClickSubmit}
                    />
                )
            }
            
            if (valueSearch !== ''){
                if (item.name.includes(valueSearch)) {
                    return (
                        <Item
                            key={index}
                            item={item}
                            index={index}
                            handleShowAlert={this.handleShowAlert}
                            handleEditItem={this.handleEditItem}
                        />
                    )
                }
                return null;
            }
            else{
                return (
                    <Item
                        key={index}
                        item={item}
                        index={index}
                        handleShowAlert={this.handleShowAlert}
                        handleEditItem={this.handleEditItem}
                    />
                )
            }
        });
        
    }
    handleShowAlert = (item) => {
        this.setState({
            showAlert: true,
            titleAlert: item.name,
            idAlert: item.id
        });
    }
    handleDeleteItem = () => {
        let { idAlert, items } = this.state;
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                const element = items[i];
                if (element.id === idAlert) {
                    items.splice(i, 1);
                    break;
                }
            }
        }
        this.setState({ showAlert: false });
    }
    handleEditItem = (index, item) => {
        this.setState({
            indexEdit: index,
            idEdit: item.id,
            nameEdit: item.name,
            levelEdit: item.level
        });
    }
    handleEditClickCancel = () => {
        this.setState({
            idEdit: ''
        });
    }
    handleEditInputChange = (value) => {
        this.setState({
            nameEdit: value
        })
    }
    handleEditSelectChange = (value) => {
        this.setState({
            levelEdit: value
        })
    }
    handleEditClickSubmit = () => {
        let { items, idEdit, nameEdit, levelEdit } = this.state;
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].id === idEdit) {
                    items[i].name = nameEdit;
                    items[i].level = +levelEdit;
                    break;
                }
            }
        }
        this.setState({
            idEdit: ''
        })
    }
    render() {
        return (
            <div className="panel panel-success" >
                <SweetAlert
                    show={this.state.showAlert}
                    title="Delete Item"
                    text={this.state.titleAlert}
                    showCancelButton
                    onOutsideClick={() => this.setState({ showAlert: false })}
                    onEscapeKey={() => this.setState({ showAlert: false })}
                    onCancel={() => this.setState({ showAlert: false })}
                    onConfirm={() => this.handleDeleteItem()}
                />
                <div className="panel-heading">List Item</div>
                <table className="table table-hover" >
                    <thead>
                        <tr>
                            <th style={{ width: '10%' }} className="text-center">#</th>
                            <th>Name</th>
                            <th style={{ width: '15%' }} className="text-center">Level</th>
                            <th style={{ width: '15%' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {this.renderItem()}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default ListItem;