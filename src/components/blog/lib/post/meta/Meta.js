import React, { PropTypes } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import {
    BodyText,
    ActionText
} from '../../../../lib/typography/Typography';
import Image from '../../../../lib/image/Image';
import styles from './Meta.css';

const DATE_FORMAT = 'Do MMMM, YYYY';

function Meta({ name, website, image, publishedAt, className }) {
    image = <Image src={image} className={styles.image} />;
    return (
        <div className={classNames(styles.root, className)}>
            {website ? (
                <a href={website}>
                    {image}
                </a>
            ) : image}
            <BodyText className={styles.text}>
                {website ? (
                    <ActionText href={website}>{name}</ActionText>
                ) : name} on the {moment(publishedAt).format(DATE_FORMAT)}
            </BodyText>
        </div>
    );
}

Meta.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    website: PropTypes.string,
    publishedAt: PropTypes.string,
    className: PropTypes.string
};

export default Meta;
