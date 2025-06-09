import './Specials.css';
import SpecialsHeader from './SpecialsHeader';
import SpecialsCards from './SpecialsCards';
import SpecialsList from './SpecialsList';
const Specials = () => {
    return (
        <>
            <section className="container">
                <SpecialsHeader />
                <SpecialsCards SpecialsList={SpecialsList} />
            </section>
        </>
    );
};
export default Specials;
