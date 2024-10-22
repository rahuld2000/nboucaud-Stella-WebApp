import React from "react";
import { useSelector } from "react-redux";
import {
    amphion,
    code,
    dawg,
    imageeditor,
    losslesscut,
    lumen,
    motion,
    notable,
    omniclip,
    playbook,
    plexocore,
    viewerjs,
    Office,
    online3dviewer,
} from "./apps_iframe"; // Import your iframes

// Mapping of active tab names to iframe components
const iframeMap: { [key: string]: React.FC } = {
    Office: Office,
    vscode: code,
    notes: notable,
    motion: motion,
    viewerjs: viewerjs,
    imageeditor: imageeditor,
    lumen: lumen,
    dawg: dawg,
    amphion: amphion,
    losslesscut: losslesscut,
    omniclip: omniclip,
    playbook: playbook,
    plexocore: plexocore,
    online3dviewer: online3dviewer,
};

interface AppState {
    tabs: {
        activeApp: string | null;
    };
}
const IframeContainer: React.FC = () => {
    const activeApp = useSelector((state: AppState) => state.tabs.activeApp);

    const ActiveIframe = activeApp ? iframeMap[activeApp] : null;
    console.log("Iframe Component for Active Tab:", activeApp);
    console.log("Iframe Component for Active iframe:", ActiveIframe);
    return (
        <div className="iframe-container">
            {ActiveIframe ? <ActiveIframe /> : <div>No app selected</div>}
        </div>
    );
};

export default IframeContainer;
