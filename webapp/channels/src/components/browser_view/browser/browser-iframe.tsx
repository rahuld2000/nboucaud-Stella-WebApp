import React from "react";

interface UrlIframeProps {
    url: string;
}

const UrlIframe: React.FC<UrlIframeProps> = ({ url }) => {
    const formatUrl = (url: string) => {
        // Check if the URL starts with 'http://' or 'https://'
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            return `https://${url}`;
        }
        return url;
    };

    const formattedUrl = formatUrl(url);
    return (
        <div className="iframe-container">
            <iframe
                src={formattedUrl}
                width="100%"
                height="100%"
                title={`URL Iframe - ${url}`}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                style={{ border: "none" }}
            />
        </div>
    );
};

export default UrlIframe;
