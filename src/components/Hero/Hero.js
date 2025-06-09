import img from '../../assets/restauranfood.jpg';
import './Hero.css';

export default function Hero() {
    return (
        <section className="hero" data-testid="hero">
            <div className="container" data-testid="container">
                <div className="hero-inner" data-testid="hero-inner">
                    <div className="hero-text" data-testid="hero-text">
                        <h1>Little Lemon</h1>
                        <h2>Chicago</h2>
                        <p data-testid="hero-description">
                            We are a family owned Mediterranean restaurant,
                            focused on traditional recipes served with a modern
                            twist.
                        </p>
                        <button
                            className="reserve-btn"
                            data-testid="reserve-button"
                        >
                            Reserve a Table
                        </button>
                    </div>

                    <div
                        className="hero-image-wrapper"
                        data-testid="hero-image-wrapper"
                    >
                        <img
                            src={img}
                            alt="Chef holding appetizers"
                            data-testid="hero-image"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
