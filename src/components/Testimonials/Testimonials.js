import './testimonials.css';
import TestimonialCards from './TestimonialCards';
import TestimonialsProvider from '../../data/TestimonialsProvider';

const Testimonials = () => {
    return (
        <TestimonialsProvider>
            <section
                className="testimonials"
                data-testid="testimonials-section"
            >
                <div className="container" data-testid="testimonials-container">
                    <h1>Testimonials</h1>
                    <TestimonialCards />
                </div>
            </section>
        </TestimonialsProvider>
    );
};

export default Testimonials;
