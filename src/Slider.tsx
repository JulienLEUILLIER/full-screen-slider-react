import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import { StyledThumb, StyleSlider, StyledCoordinates } from './Slider.styles'

const Slider = () => {

    const thumbRef = useRef<null | HTMLDivElement>(null);
    const sliderRef = useRef<null | HTMLDivElement>(null);
    const diff = useRef<number>(0)
    const [coordinates, setCoordinates] = useState({x: 0, y: 0});
    const [percentages, setPercentages] = useState({x: "", y: ""});

    useEffect(() => {
        if (thumbRef.current) {
            thumbRef.current.style.left = percentages.x;
            thumbRef.current.style.top = percentages.y;
            setCoordinates({
                x: Math.floor(thumbRef.current.getBoundingClientRect().left),
                y: Math.floor(thumbRef.current.getBoundingClientRect().top),
            })
        }
    }, [percentages]);

    const getPercentage = (current: number, max: number) => (100 * current) / max;

    const newStyleCoordinates = (percentage: number) => `calc(${percentage}% - 5px)`;

    const handleMouseMove = (event: MouseEvent) => {
        if (sliderRef.current && thumbRef.current) {

            let newCoordinates = {
                x: event.clientX - diff.current - sliderRef.current.getBoundingClientRect().left,
                y: event.clientY - diff.current - sliderRef.current.getBoundingClientRect().top,
            }

            const endCoordinates = {
                x: sliderRef.current.offsetWidth - thumbRef.current.offsetWidth,
                y: sliderRef.current.offsetHeight - thumbRef.current.offsetHeight,
            }

            const start = 0;

            if (newCoordinates.x < start) {
                newCoordinates.x = 0;
            }

            if (newCoordinates.y < start) {
                newCoordinates.y = 0;
            }

            if (newCoordinates.x > endCoordinates.x) {
                newCoordinates.x = endCoordinates.x;
            }

            if (newCoordinates.y > endCoordinates.y) {
                newCoordinates.y = endCoordinates.y;
            }

            const percentages = {
                x: getPercentage(newCoordinates.x, endCoordinates.x),
                y: getPercentage(newCoordinates.y, endCoordinates.y)
            }

            setPercentages({
                x: newStyleCoordinates(percentages.x),
                y: newStyleCoordinates(percentages.y)
            });
        }
    }

    const handleMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
        if (thumbRef.current) {
            diff.current = event.clientX - thumbRef.current.getBoundingClientRect().left;
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    const handleMouseUp = () => {
        document.removeEventListener('mousedown', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
    }

    return (
        <div>
            <StyleSlider ref={sliderRef}>
                <StyledThumb ref={thumbRef} onMouseDown={handleMouseDown} />
                <StyledCoordinates>
                    <p>X = {coordinates.x}</p>
                    <p>Y = {coordinates.y}</p>
                </StyledCoordinates>
            </StyleSlider>
        </div>
    )
}

export default Slider