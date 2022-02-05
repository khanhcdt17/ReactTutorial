/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

class Sort extends Component {
    renderSort = () => {
        let { sortType, sortOrder } = this.props;
        if (sortType !== '' && sortOrder !== '') {
            return (
                <span className="label label-success label-medium text-uppercase">
                    {sortType} - {sortOrder}
                </span>
            )
        }
    }
    handleClick = (sortType, sortOrder) => {
        this.props.handleSort(sortType, sortOrder);
    }
    render() {
        return (
            <div className="dropdown">
                <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Sort by <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" >
                    <li onClick={() => this.handleClick('asc', 'name')}>
                        <a role="button" className="text-uppercase">Name ASC</a>
                    </li>
                    <li onClick={() => this.handleClick('desc', 'name')}>
                        <a role="button" className="text-uppercase">Name DESC</a>
                    </li>
                    <li role="separator" className="divider" />
                    <li onClick={() => this.handleClick('asc', 'level')}>
                        <a role="button" className="text-uppercase">Level ASC</a>
                    </li>
                    <li onClick={() => this.handleClick('desc', 'level')}>
                        <a role="button" className="text-uppercase">Level DESC</a>
                    </li>
                </ul>
                {this.renderSort()}
            </div>
        )
    }
}

export default Sort;