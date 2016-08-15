import React from 'react';
import Typography from 'components/kitchensink/typography/Typography';
import styles from 'components/kitchensink/KitchenSink.css';

function KitchenSink() {
    return (
        <div className={styles.root}>
            <Typography className={styles.module} />
        </div>
    );
}

export default KitchenSink;
