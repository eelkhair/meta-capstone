const formatAsCurrency = (amount) => {
    const num = Number(amount);

    if (Number.isNaN(num)) {
        return 'Invalid';
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(num);
};

export default formatAsCurrency;
