import React from 'react';
import Loader from '../Loader/Loader';
const sleepMs = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Image({ alt, ...rest }) {
    const [isLoading, setLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);

    const handleLoad = async () => {
        setLoading(false);
        setIsError(false);
        console.log('not loading');
    };

    const handleError = async () => {
        setLoading(false);
        setIsError(true);
    };

    return (
        <div>
            {isError && !isLoading && <div>*Error loading*</div>}
            {!isError && isLoading && (
                <div>
                    <Loader />
                </div>
            )}
            <img
                style={{
                    display: isError || isLoading ? 'none' : 'initial',
                }}
                alt={alt || 'Default Alt'}
                onLoad={handleLoad}
                onError={handleError}
                {...rest}
            />
        </div>
    );
}
