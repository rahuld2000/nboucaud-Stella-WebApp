import React from "react";
import UrlInput from "./browser-input";
import UrlTabs from "./browser-tab";
import UrlIframe from "./browser-iframe";

const App: React.FC = () => {
    return (
        <div>
            <h1>URL Manager</h1>
            <UrlInput />
            <UrlTabs />
            <UrlIframe />
        </div>
    );
};

export default App;
