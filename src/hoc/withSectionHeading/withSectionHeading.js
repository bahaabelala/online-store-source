import React from 'react';
import classes from './withSectionHeading.module.css';

import { Row } from 'react-bootstrap';

const withSectionHeading = (WrappedComponent, sectionTitle) => {

  return props => (
    <section className={classes.Section}>
      <div className={classes.titleContainer}>
        <h2 className={classes.title}>{sectionTitle}</h2>
        <hr className={classes.titleLine} />
      </div>
      <div>
      {sectionTitle === 'Best Sellers' ? (
          <Row xs={1} lg={2} className='g-3'>
            <WrappedComponent {...props}/>
          </Row>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className='g-3'>
            <WrappedComponent {...props}/>
          </Row>
        )}
      </div>
    </section>
  );
}

export default withSectionHeading;