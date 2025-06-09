import PropTypes from 'prop-types';

export default function TestimonialCard({ card }) {
    return (
        <article className="testimonial-card">
            <div className="stars">{'★'.repeat(card.stars)}</div>
            <div className="user-info">
                <img
                    src={card.avatar}
                    alt={`avatar for ${card.author.toLowerCase()}`}
                />
                <span className="author-name">{card.author}</span>
            </div>

            <div className="testimonial">{card.testimonial}</div>
        </article>
    );
}

TestimonialCard.propTypes = {
    card: PropTypes.shape({
        stars: PropTypes.number.isRequired,
        avatar: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        testimonial: PropTypes.string.isRequired,
    }).isRequired,
};
