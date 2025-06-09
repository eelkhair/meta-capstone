import { useRef } from 'react';
import formatAsCurrency from '../../utils/formatAsCurrency';
import PropTypes from 'prop-types';

export default function SpecialsCard({ card }) {
    const imgRef = useRef(null);

    return (
        <article className="card">
            <img
                className="menu-img"
                src={card.image}
                alt="greek salad"
                ref={imgRef}
            />
            <div className="name-price">
                <p className="item-name">{card.title}</p>
                <p className="item-price">{formatAsCurrency(card.price)}</p>
            </div>
            <div className="item-desc">
                <p>{card.description}</p>
            </div>
            <div className="delivery">
                <p>Order a delivery</p>
            </div>
        </article>
    );
}

SpecialsCard.propTypes = {
    card: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};
