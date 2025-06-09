import SpecialsCard from './SpecialsCard';
import PropTypes from 'prop-types';

export default function SpecialsCards({ SpecialsList }) {
    return (
        <div className="cards">
            {SpecialsList.map((card) => (
                <SpecialsCard card={card} key={card.id} />
            ))}
        </div>
    );
}

SpecialsCards.propTypes = {
    SpecialsList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            image: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        })
    ).isRequired,
};
