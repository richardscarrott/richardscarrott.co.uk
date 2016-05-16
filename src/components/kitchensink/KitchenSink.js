import React from 'react';
import Typography from './typography/Typography';
import styles from './KitchenSink.css';

function KitchenSink() {
    return (
        <div className={styles.root}>
            <Typography className={styles.module} />
        </div>
    );
}

export default KitchenSink;
