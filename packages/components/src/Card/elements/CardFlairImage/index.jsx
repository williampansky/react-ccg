import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { Img } from 'react-image';

const CardFlairImage = ({ imageSrc, name, placeholderSrc }) => (
  <div className={styles['card__flair__image__wrapper']}>
    <Img
      alt={name}
      className={styles['card__flair__image']}
      src={imageSrc}
      loader={<div className={styles['card__flair__loader']} />}
      unloader={
        <img
          alt=""
          className={styles['card__flair__image']}
          src={placeholderSrc}
        />
      }
    />
  </div>
);

CardFlairImage.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholderSrc: PropTypes.string.isRequired
};

export default CardFlairImage;
