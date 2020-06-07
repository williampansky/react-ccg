import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const CardTypeBadge = ({ badgeImgSrc, typeImgSrc }) => {
  return (
    <div className={styles['card__type__image__wrapper']}>
      <div className={styles['card__type__image__icon__wrapper']}>
        <img
          alt=""
          className={styles['card__type__image']}
          role="presentation"
          src={typeImgSrc}
        />
      </div>
      <img
        alt=""
        className={styles['card__type__image__badge']}
        role="presentation"
        src={badgeImgSrc}
      />
    </div>
  );
};

CardTypeBadge.propTypes = {
  badgeImgSrc: PropTypes.string.isRequired,
  typeImgSrc: PropTypes.string.isRequired
};

export default CardTypeBadge;
