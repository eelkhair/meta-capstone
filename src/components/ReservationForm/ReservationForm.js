import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { IMaskInput } from 'react-imask';
import './ReservationForm.css';
import restaurant from '../../assets/restaurant.jpg';
import PropTypes from 'prop-types';
import ConfirmationModal from './ConfirmationModal';

const times = Array.from({ length: 26 }, (_, i) => {
    const hour = 11 + Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    const value = `${String(hour).padStart(2, '0')}:${minute}`;
    const label = new Date(`1970-01-01T${value}:00`).toLocaleTimeString(
        'en-US',
        {
            hour: 'numeric',
            minute: '2-digit',
        }
    );
    return { value, label };
});

const occasionOptions = [
    { value: 'Birthday', label: '🎉 Birthday' },
    { value: 'Anniversary', label: '💖 Anniversary' },
    { value: 'Engagement', label: '💍 Engagement' },
    { value: 'Other', label: '🎈 Other' },
];

const validationSchema = Yup.object({
    date: Yup.date().required('Date is required'),
    time: Yup.object().required('Time Required'),
    guests: Yup.number()
        .min(1)
        .max(20)
        .required('Number of guests is required'),
    occasion: Yup.object().nullable(),
    phone: Yup.string()
        .matches(/^\(\d{3}\)\s\d{3}-\d{4}$/, 'Phone must be (123) 456-7890')
        .required('Phone number is required'),
});

export default function ReservationForm() {
    const [submitted, setSubmitted] = useState(false);
    const [formValues, setFormValues] = useState(null);
    const dateInputRef = useRef(null);

    useEffect(() => {
        if (dateInputRef.current) {
            dateInputRef.current.focus();
        }
    }, []);
    const formik = useFormik({
        initialValues: {
            date: '',
            time: null,
            guests: '',
            occasion: null,
            phone: '',
        },
        validationSchema,
        onSubmit: (values) => {
            setFormValues(values);
            setSubmitted(true);
        },
    });

    const selectTheme = (theme) => {
        return {
            ...theme,
            borderRadius: 16,
            colors: {
                ...theme.colors,
                primary25: '#f4ce14',
                primary: '#495e57',
                neutral0: '#ffffff',
                neutral80: '#333333',
            },
        };
    };

    return (
        <>
            <form className="reservation-form" onSubmit={formik.handleSubmit}>
                <img
                    src={restaurant}
                    alt="Enjoy dining with us"
                    className="form-hero-image"
                />
                <h1 className="form-title">Table Reservation</h1>

                {/* Date */}
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        ref={dateInputRef}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.date}
                        className="styled-input"
                    />
                    {formik.touched.date && formik.errors.date && (
                        <div className="error">{formik.errors.date}</div>
                    )}
                </div>

                {/* Time */}
                <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <Select
                        id="time"
                        name="time"
                        options={times}
                        value={formik.values.time}
                        onChange={(option) =>
                            formik.setFieldValue('time', option)
                        }
                        onBlur={() => formik.setFieldTouched('time', true)}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="Select time..."
                        theme={selectTheme}
                    />
                    {formik.touched.time && formik.errors.time && (
                        <div className="error">{formik.errors.time}</div>
                    )}
                </div>

                {/* Guests */}
                <div className="form-group">
                    <label htmlFor="guests">Number of people</label>
                    <input
                        type="number"
                        id="guests"
                        name="guests"
                        min="1"
                        max="20"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.guests}
                        className="styled-input"
                    />
                    {formik.touched.guests && formik.errors.guests && (
                        <div className="error">{formik.errors.guests}</div>
                    )}
                </div>

                {/* Phone */}
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <IMaskInput
                        mask="(000) 000-0000"
                        id="phone"
                        name="phone"
                        value={formik.values.phone}
                        onAccept={(value) =>
                            formik.setFieldValue('phone', value)
                        }
                        onBlur={formik.handleBlur}
                        className="styled-input"
                        placeholder="(123) 456-7890"
                    />
                    {formik.touched.phone && formik.errors.phone && (
                        <div className="error">{formik.errors.phone}</div>
                    )}
                    <small>
                        We’ll send a text confirmation to this number.
                    </small>
                </div>

                {/* Occasion */}
                <div className="form-group">
                    <label htmlFor="occasion">
                        Occasion{' '}
                        <span style={{ fontWeight: 'normal', color: '#ccc' }}>
                            (optional)
                        </span>
                    </label>
                    <Select
                        id="occasion"
                        name="occasion"
                        options={occasionOptions}
                        value={formik.values.occasion}
                        onChange={(option) =>
                            formik.setFieldValue('occasion', option)
                        }
                        onBlur={() => formik.setFieldTouched('occasion', true)}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="Select occasion..."
                        theme={selectTheme}
                    />
                </div>

                <button type="submit" className="submit-button">
                    Book a table
                </button>
            </form>

            {submitted && formValues && (
                <ConfirmationModal
                    values={formValues}
                    onClose={() => {
                        formik.resetForm();
                        setFormValues(null);
                        setSubmitted(false);

                        // Focus after short delay to allow re-render
                        setTimeout(() => {
                            if (dateInputRef.current) {
                                dateInputRef.current.focus();
                            }
                        }, 0);
                    }}
                />
            )}
        </>
    );
}

ReservationForm.propTypes = {
    values: PropTypes.shape({
        date: PropTypes.string,
        time: PropTypes.object,
        guests: PropTypes.number,
        phone: PropTypes.string,
        occasion: PropTypes.object,
    }),
};
