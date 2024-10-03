// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import classnames from 'classnames';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import './dual_range_slider.scss';

interface MultiRangeSliderProps {
    min: number;
    max: number;
    priceRangeHandler: (value: { min: number; max: number }) => void;
}

const MultiRangeSlider = (props: MultiRangeSliderProps) => {
    const {min, max, priceRangeHandler} = props;

    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef<HTMLInputElement>(null);
    const maxValRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max],
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(Number(maxValRef.current.value)); // Preceding with '+' converts the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(Number(minValRef.current.value));
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        priceRangeHandler({min: minVal, max: maxVal});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minVal, maxVal]);

    return (
        <div className='range_slider_container'>
            <div className='header_wrapper'>
                <div className='header_label'>{'Label'}</div>
                <div className='header_price'>{`$${minVal} - ${maxVal}`}</div>
            </div>

            <div className='search_container'>
                <input
                    type='range'
                    min={min}
                    max={max}
                    value={minVal}
                    ref={minValRef}
                    onChange={(event) => {
                        const value = Math.min(
                            Number(event.target.value),
                            maxVal - 1,
                        );
                        setMinVal(value);
                        event.target.value = value.toString();
                    }}
                    className={classnames('thumb thumb--zindex-3', {
                        'thumb--zindex-5': minVal > max - 100,
                    })}
                />
                <input
                    type='range'
                    min={min}
                    max={max}
                    value={maxVal}
                    ref={maxValRef}
                    onChange={(event) => {
                        const value = Math.max(
                            Number(event.target.value),
                            minVal + 1,
                        );
                        setMaxVal(value);
                        event.target.value = value.toString();
                    }}
                    className='thumb thumb--zindex-4'
                />

                <div className='slider'>
                    <div className='slider__track'/>
                    <div
                        ref={range}
                        className='slider__range'
                    />
                </div>
            </div>
        </div>
    );
};

export default MultiRangeSlider;
