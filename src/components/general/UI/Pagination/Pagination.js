import React from 'react';
import classes from './Pagination.module.css';
import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Pagin = props => {

	let active = props.activePage;
	let items = [];
	for (let number = 1; number <= props.totalPages; number++) {
	  items.push(
	    <Pagination.Item 
	   		key={number}
	   		active={number === active}
	   		onClick={props.changePage.bind(this, number)}
	   		>
	      {number}
	    </Pagination.Item>,
	  );
	}

	return (
		<div className={classes.Pagination}>
			<Pagination>{items}</Pagination>
		</div>
	);
}

Pagin.propTypes = {
	totalPages: PropTypes.number.isRequired,
	activePage: PropTypes.number.isRequired,
	changePage: PropTypes.func.isRequired
}

export default Pagin;