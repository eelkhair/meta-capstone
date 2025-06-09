import TestimonialCard from './TestimonialCard';
import { useTestimonials } from '../../data/TestimonialsProvider';

export default function TestimonialCards() {
    var testimonials = useTestimonials();

    return (
        <div className="cards">
            {testimonials.map((card) => (
                <TestimonialCard card={card} key={card.id} />
            ))}
        </div>
    );
}
