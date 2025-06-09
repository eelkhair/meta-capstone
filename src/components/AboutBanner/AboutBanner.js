import restaurant from '../../assets/restaurant.jpg';
import restaurantChef from '../../assets/restaurant chef B.jpg';
import './AboutBanner.css';
export default function AboutBanner() {
    return (
        <section className="about-banner container" data-testid="about-banner">
            <div className="about-text" data-testid="about-text">
                <h1>Little Lemon</h1>
                <h2>Chicago</h2>
                <p>
                    Tucked away in the vibrant streets of Chicago, Little Lemon
                    brings a fresh twist to classic Mediterranean cuisine. Our
                    handcrafted menu features bold flavors, from crisp Greek
                    salads and zesty bruschettas to mouthwatering grilled
                    entrées. Every dish is made with locally-sourced ingredients
                    and a passion for perfection, offering a dining experience
                    that&#39;s both comforting and elevated. Whether you&#39;re
                    planning a casual lunch, a romantic evening, or a
                    get-together with friends, Little Lemon delivers warmth,
                    flavor, and unforgettable memories. Join us in the heart of
                    Chicago for a taste that feels like home.
                </p>
            </div>
            <div className="about-images" data-testid="about-images">
                <img className="img-top" src={restaurantChef} alt="chef" />
                <img className="img-bottom" src={restaurant} alt="restaurant" />
            </div>
        </section>
    );
}
