import React, { useEffect, useState } from 'react';
import styles from './ColorSize.module.css';

const ColorSize = (props) => {
    const { product, setInputValue, inputValue, quantity, setQuantity, isCart } = props;
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (product.color && !isCart) {
            setInputValue((prev) => ({ ...prev, color: product.color.split(',')[0] }));
        }
        if (product.size && !isCart) {
            setInputValue((prev) => ({ ...prev, size: product.size.split(',')[0] }));
        }

        setTimeout(() => {
            setDataLoaded(true); // Data is now loaded, set the flag to true
        }, 400);
    }, [isCart, product, setInputValue]);

    const handleInput = (input, e) => {
        const newData = { ...inputValue };
        if (e.target.name === input) {
            newData[e.target.name] = e.target.value;
            setInputValue(newData);
        }
    };

    const handleQuantuty = (count, e) => {
        e.preventDefault();
        if (count === 'plus') {
            setQuantity(quantity + 1);
        }
        if (count === 'minus' && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const checkSize = inputValue.size

    return (
        <div>
            {dataLoaded && ( // Check if the data is loaded before rendering the inputs
                <>
                    <div className={styles.colorSize}>
                        {product.color && (
                            <>
                                <div>Colors</div>
                                <div>
                                    {product.color.split(',').map((data) => (
                                        <React.Fragment key={data}>
                                            <input
                                                value={data.trim()}
                                                onChange={(e) => handleInput('color', e)}
                                                className={styles.radioInput}
                                                type="radio"
                                                name="color"
                                                id={`color-${data.trim()}`}
                                                defaultChecked={data.trim() === inputValue.color}
                                            />
                                            <label className={styles.radioLabelColor} htmlFor={`color-${data.trim()}`}>
                                                {data.trim()}
                                            </label>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <div className={styles.colorSize}>
                        {product.size && (
                            <>
                                <div>Sizes</div>
                                <div>
                                    {product.size.split(',').map((data) => (
                                        <React.Fragment key={data}>
                                            <input
                                                value={data.trim()}
                                                onChange={(e) => handleInput('size', e)}
                                                className={styles.radioInput}
                                                type="radio"
                                                name="size"
                                                id={`size-${data.trim()}`}
                                                defaultChecked={data.trim() === checkSize}
                                            />
                                            <label className={styles.radioLabel} htmlFor={`size-${data.trim()}`}>
                                                {data.trim()}
                                            </label>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
            <div className={styles.colorSize}>
                <div>Quantity</div>
                <div>
                    <div className="d-flex ">
                        <button onClick={(e) => handleQuantuty('minus', e)} className="btn btn-outline-dark">
                            -
                        </button>
                        <div className="btn btn-outline-dark btn-qn">{quantity}</div>
                        <button onClick={(e) => { handleQuantuty('plus', e); e.stopPropagation(); }} className="btn btn-outline-dark">
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorSize;
