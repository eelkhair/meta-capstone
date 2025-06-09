import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TestimonialsContext = createContext();

const testimonialsList = [
    {
        stars: 4,
        testimonial:
            'Little Lemon has such a warm, inviting vibe. The Bruschetta was fresh and flavorful, and the service was quick. The Greek salad was crisp, but I would’ve liked a touch more seasoning. Still, everything felt homemade and cared for.',
    },
    {
        stars: 5,
        testimonial:
            'Incredible! From the moment we walked in, we felt like family. The Lemon Dessert was the perfect balance of tangy and sweet—just like my grandmother used to make. Every bite of the Bruschetta was a burst of freshness. Highly recommend!',
    },
    {
        stars: 4,
        testimonial:
            'Lovely place with a cozy charm. The Greek salad was colorful and fresh, and I enjoyed the generous portion size. The Lemon Dessert was light and satisfying. One star off only because the Bruschetta could’ve used more garlic punch',
    },
];

const TestimonialsProvider = ({ children }) => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    'https://randomuser.me/api/?results=3'
                );
                const data = await response.json();

                const formattedTestimonials = data.results.map(
                    (user, index) => ({
                        id: crypto.randomUUID(),
                        author: user.name.first + ' ' + user.name.last,
                        avatar: user.picture.large,
                        testimonial: testimonialsList[index].testimonial,
                        stars: testimonialsList[index].stars,
                    })
                );
                setTestimonials(formattedTestimonials);
            } catch (error) {
                console.error('Failed to fetch testimonials:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <TestimonialsContext.Provider value={testimonials}>
            {children}
        </TestimonialsContext.Provider>
    );
};

export const useTestimonials = () => useContext(TestimonialsContext);

export default TestimonialsProvider;

TestimonialsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
