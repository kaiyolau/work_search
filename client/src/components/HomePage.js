import React, { useState } from 'react';
import { Button } from 'semantic-ui-react'
import styles from './HomePage.module.css';

function HomePage() {
    return (
        <div className={styles.homePage}>
            {/* <h1>Search your favourite job near you</h1> */}

            <Button primary as='a' href='/posts' className={styles.customButton}>Welcome</Button>
            {/* <Button primary as='a' href='/posts' className={styles.customButton} onClick={() => alert("You clicked the button!")}>Welcome</Button> */}
        </div>
    );
}

export default HomePage

