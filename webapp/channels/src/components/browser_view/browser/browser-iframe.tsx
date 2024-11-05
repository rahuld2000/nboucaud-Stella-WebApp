import React from "react";
import { connect } from "react-redux";
import { nextTabUrl, prevTabUrl, reloadTabUrl } from "./browser-state";

interface UrlIframeProps {
    url: string;
}
interface UrlIframeProps {
    url: string;
    prevTabUrl: () => void;
    nextTabUrl: () => void;
    reloadTabUrl: () => void;
}
const UrlIframe: React.FC<UrlIframeProps> = ({
    url,
    prevTabUrl,
    nextTabUrl,
    reloadTabUrl,
}) => {
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
const mapStateToProps = (state: any) => ({
    url: state.urlManager.tabs[state.urlManager.activeTabIndex].url || "",
});

const mapDispatchToProps = {
    prevTabUrl,
    nextTabUrl,
    reloadTabUrl,
};

export default connect(mapStateToProps, mapDispatchToProps)(UrlIframe);
