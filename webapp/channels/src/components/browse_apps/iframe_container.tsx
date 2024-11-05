import React, { useEffect, useState } from "react";
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
} from "./apps_iframe";

const iframeMap: { [key: string]: React.FC } = {
    Office,
    vscode: code,
    notes: notable,
    motion,
    viewerjs,
    imageeditor,
    lumen,
    dawg,
    amphion,
    losslesscut,
    omniclip,
    playbook,
    plexocore,
    online3dviewer,
};

interface AppState {
    tabs: {
        activeApp: string | null;
    };
}

const IframeContainer: React.FC = () => {
    const activeApp = useSelector((state: AppState) => state.tabs.activeApp);
    // Track mounted iframes
    const [mountedIframes, setMountedIframes] = useState<Set<string>>(
        new Set()
    );

    // Mount new iframe when it becomes active
    useEffect(() => {
        if (activeApp && !mountedIframes.has(activeApp)) {
            setMountedIframes((prev) => new Set([...prev, activeApp]));
        }
    }, [activeApp, mountedIframes]);

    return (
        <div className="iframe-container">
            {Object.entries(iframeMap).map(([appName, IframeComponent]) => {
                // Only render if the iframe has been mounted
                if (!mountedIframes.has(appName)) {
                    return null;
                }

                return (
                    <div
                        key={appName}
                        className="iframe-container"
                        style={{
                            display: activeApp === appName ? "flex" : "none",
                            // Preserve the iframe state but hide it completely
                            visibility:
                                activeApp === appName ? "visible" : "hidden",
                        }}
                    >
                        <IframeComponent />
                    </div>
                );
            })}
            {!activeApp && (
                <div className="no-app-selected">
                    <div>No app selected</div>
                </div>
            )}
        </div>
    );
};

export default IframeContainer;
