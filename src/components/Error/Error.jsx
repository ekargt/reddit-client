import "./Error.css";

function Error({ message = "Something went wrong.", onRetry }) {
    return (
        <div className="error-card">
            <div className="error-icon">⚠️</div>

            <h2 className="error-title">
                We couldn't load the content
            </h2>

            <p className="error-message">
                {message}
            </p>

            {onRetry && (
                <button
                    className="retry-button"
                    onClick={onRetry}
                >
                    Try Again
                </button>
            )}
        </div>
       
    );
}

export default Error;