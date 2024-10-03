import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
    addTab,
    setActiveApp,
} from "../../packages/mattermost-redux/src/actions/tabAction";
import "./browse_app.scss";
import vscodeicon from "./vscode.svg";
import prevarrow from "./prev-arrow.svg";
import nxtarrow from "./nxt-arrow.svg";

// Define the type for the AppCard props
interface AppCardProps {
    title: string;
    isInstalled: boolean;
    isInstalling: boolean;
    onInstall: () => void;
    onOpen: () => void; // Add an onOpen prop
}

interface AppLibraryModalProps {
    onClose: () => void;
}

const productivityApps = [
    { id: "vscode", title: "VSCode" },
    { id: "notes", title: "Notes" },
    { id: "motion", title: "Motion" },
    { id: "viewerjs", title: "Viewer js" },
    { id: "imageeditor", title: "Image editor" },
    { id: "playbook", title: "Playbook" },
];

const designApps = [
    { id: "lumen", title: "Lumen" },
    { id: "dawg", title: "Dawg" },
    { id: "amphion", title: "Amphion" },
    { id: "losslesscut", title: "Losslesscut" },
    { id: "omniclip", title: "Omniclip" },
    { id: "plexocore", title: "Plexocore" },
];

const AppLibraryModal: React.FC<AppLibraryModalProps> = ({ onClose }) => {
    const [fadeOut, setFadeOut] = useState<boolean>(false);
    const [currentProductivitySlide, setCurrentProductivitySlide] = useState(0);
    const [totalProductivitySlides, setTotalProductivitySlides] =
        useState<number>(0);
    const [currentDesignSlide, setCurrentDesignSlide] = useState(0);
    const [totalDesignSlides, setTotalDesignSlides] = useState<number>(0);

    const [installedApps, setInstalledApps] = useState<Record<string, boolean>>(
        {}
    );
    const [installingApps, setInstallingApps] = useState<
        Record<string, boolean>
    >({});

    const dispatch = useDispatch(); // Initialize Redux dispatch

    const productivityCardWrapperRef = useRef<HTMLDivElement>(null);
    const designCardWrapperRef = useRef<HTMLDivElement>(null);

    const closeModal = (): void => {
        setFadeOut(true);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    useEffect(() => {
        const storedApps = localStorage.getItem("installedApps");
        if (storedApps) {
            setInstalledApps(JSON.parse(storedApps));
        }

        const countProductivitySlides = () => {
            const cards = productivityCardWrapperRef.current?.children;
            if (cards) {
                setTotalProductivitySlides(cards.length);
            }
        };

        const countDesignSlides = () => {
            const cards = designCardWrapperRef.current?.children;
            if (cards) {
                setTotalDesignSlides(cards.length);
            }
        };

        countProductivitySlides();
        countDesignSlides();
    }, [productivityApps, designApps]);

    const handleOpenApp = (app: { id: string; title: string }) => {
        const uniqueId = `${app.id}-${Date.now()}`;
        dispatch(addTab(app.id, app.title, uniqueId));
        dispatch(setActiveApp(app.id)); // Set the active app
        closeModal(); // Close modal after opening the app
    };

    const nextProductivitySlide = () =>
        setCurrentProductivitySlide(
            (prev) => (prev + 1) % totalProductivitySlides
        );
    const previousProductivitySlide = () =>
        setCurrentProductivitySlide((prev) =>
            prev === 0 ? totalProductivitySlides - 1 : prev - 1
        );
    const nextDesignSlide = () =>
        setCurrentDesignSlide((prev) => (prev + 1) % totalDesignSlides);
    const previousDesignSlide = () =>
        setCurrentDesignSlide((prev) =>
            prev === 0 ? totalDesignSlides - 1 : prev - 1
        );

    const handleInstall = (appTitle: string) => {
        setInstallingApps((prev) => ({ ...prev, [appTitle]: true }));
        setTimeout(() => {
            setInstalledApps((prev) => {
                const updatedApps = { ...prev, [appTitle]: true };
                localStorage.setItem(
                    "installedApps",
                    JSON.stringify(updatedApps)
                );
                return updatedApps;
            });
            setInstallingApps((prev) => ({ ...prev, [appTitle]: false }));
        }, 2000);
    };

    return (
        <div className="modal-overlay">
            <div className={`app-modal-content ${fadeOut ? "fade-out" : ""}`}>
                <div className="app-modal-header">
                    <h2>App Library</h2>
                    <button className="close-button" onClick={closeModal}>
                        ×
                    </button>
                </div>
                {/* Productivity Section */}
                <div className="app-category">
                    <div className="app-heading-wrapper">
                        <h3>Productivity</h3>
                        <div className="nav-btn">
                            <button
                                className="arrow left-arrow"
                                onClick={previousProductivitySlide}
                            >
                                <img src={prevarrow} alt="Previous" />
                            </button>
                            <button
                                className="arrow right-arrow"
                                onClick={nextProductivitySlide}
                            >
                                <img src={nxtarrow} alt="Next" />
                            </button>
                        </div>
                    </div>

                    <div className="app-grid">
                        <div
                            className="app-card-wrapper"
                            ref={productivityCardWrapperRef}
                            style={{
                                transform: `translateX(-${
                                    currentProductivitySlide * 270
                                }px)`,
                                transition: "transform 0.5s ease",
                            }}
                        >
                            {productivityApps.map((app) => (
                                <AppCard
                                    key={app.id} // Use the id as the key
                                    title={app.title}
                                    isInstalled={
                                        installedApps[app.title] || false
                                    }
                                    isInstalling={
                                        installingApps[app.title] || false
                                    }
                                    onInstall={() => handleInstall(app.title)}
                                    onOpen={() => handleOpenApp(app)} // Pass the entire app object
                                />
                            ))}
                        </div>
                    </div>
                </div>
                {/* Similar Design Section as Productivity */}
                <div className="app-category">
                    <div className="app-heading-wrapper">
                        <h3>Design</h3>
                        <div className="nav-btn">
                            <button
                                className="arrow left-arrow"
                                onClick={previousDesignSlide}
                            >
                                <img src={prevarrow} alt="Previous" />
                            </button>
                            <button
                                className="arrow right-arrow"
                                onClick={nextDesignSlide}
                            >
                                <img src={nxtarrow} alt="Next" />
                            </button>
                        </div>
                    </div>

                    <div className="app-grid">
                        <div
                            className="app-card-wrapper"
                            ref={designCardWrapperRef}
                            style={{
                                transform: `translateX(-${
                                    currentDesignSlide * 270
                                }px)`,
                                transition: "transform 0.5s ease",
                            }}
                        >
                            {designApps.map((app) => (
                                <AppCard
                                    key={app.id}
                                    title={app.title}
                                    isInstalled={
                                        installedApps[app.title] || false
                                    }
                                    isInstalling={
                                        installingApps[app.title] || false
                                    }
                                    onInstall={() => handleInstall(app.title)}
                                    onOpen={() => handleOpenApp(app)} // Pass the entire app object
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// AppCard component with type checking using AppCardProps interface
const AppCard: React.FC<AppCardProps> = ({
    title,
    isInstalled,
    isInstalling,
    onInstall,
    onOpen,
}) => (
    <div className="app-card">
        <div className="app-icon">
            <img src={vscodeicon} alt="VSCode Icon" />
        </div>
        <h4 className="app-card-title">{title}</h4>
        <p>
            Body text for whatever you'd like to say. Add main takeaway points,
            quotes, or a short story.
        </p>
        <div className="app-btn-wrapper">
            <div className="app-card-buttons">
                {isInstalled ? (
                    <button className="btn-open" onClick={onOpen}>
                        Open
                    </button>
                ) : (
                    <button className="btn-install" onClick={onInstall}>
                        {isInstalling ? (
                            <div className="loader-wrapper">
                                <div className="loader-05"></div>
                            </div>
                        ) : (
                            "Install"
                        )}
                    </button>
                )}
            </div>
        </div>
    </div>
);

export default AppLibraryModal;
