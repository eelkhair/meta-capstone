import React from 'react';
import PropTypes from 'prop-types';

function formatPhone(phone) {
    return phone;
}

export default function ConfirmationModal({ values, onClose }) {
    const formattedDate = new Date(values.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    const guestText = `you and your ${values.guests} guest${values.guests > 1 ? 's' : ''}`;
    const occasionText = values.occasion?.value
        ? ` to celebrate your ${values.occasion.value.toLowerCase()}`
        : '';
    const phoneFormatted = formatPhone(values.phone);

    return (
        <div className="overlay">
            <div className="confirmation-box">
                <h2>Reservation Completed!</h2>
                <p>
                    Thank you for choosing Little Lemon! We’ll see {guestText}{' '}
                    on <strong>{formattedDate}</strong> at{' '}
                    <strong>{values.time.label}</strong>
                    {occasionText}. A text message has been sent to{' '}
                    <strong>{phoneFormatted}</strong>.
                </p>
                <button onClick={onClose} className="submit-button">
                    Close
                </button>
            </div>
        </div>
    );
}

ConfirmationModal.propTypes = {
    values: PropTypes.shape({
        date: PropTypes.string.isRequired,
        time: PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
        }).isRequired,
        guests: PropTypes.number.isRequired,
        phone: PropTypes.string.isRequired,
        occasion: PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
        }),
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};
