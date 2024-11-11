// AppLibraryModal.tsx
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
    addTab,
    setActiveApp,
} from "../../packages/mattermost-redux/src/actions/tabAction";
import office from "./apps-icon/only-office.svg";
import bookclub from "./apps-icon/bookclub.png";
import cast from "./apps-icon/cast.png";
import current from "./apps-icon/current.png";
import flipbook from "./apps-icon/flipbook.png";
import flow from "./apps-icon/flow.png";
import gurr from "./apps-icon/gurr.png";
import journal from "./apps-icon/journal.png";
import mix from "./apps-icon/mix.png";
import muse from "./apps-icon/muse.png";
import notes from "./apps-icon/notes.png";
import picask from "./apps-icon/picask.png";
import playbook from "./apps-icon/playbook.png";
import render from "./apps-icon/render.png";
import scribe from "./apps-icon/scribe.png";
import prevarrow from "./prev-arrow.svg";
import nxtarrow from "./nxt-arrow.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";

import "./browse_app.scss";

// Interfaces
interface AppCardProps {
    description: string;
    title: string;
    img: string;
    isInstalled: boolean;
    isInstalling: boolean;
    onInstall: () => void;
    onOpen: () => void;
}

interface AppLibraryModalProps {
    onClose: () => void;
}

interface AppData {
    id: string;
    title: string;
    description: string;
    img: string;
}

// App Data
const productivityApps: AppData[] = [
    {
        id: "office",
        title: "Office Suite",
        description:
            "Collaborative Spreadsheets, Documents, Powerpoints, and PDFs.",
        img: office,
    },
    {
        id: "notes",
        title: "Journal",
        description: "Keep track of your day-to-day reflections.",
        img: journal,
    },
    {
        id: "motion",
        title: "Flipbook",
        description:
            "Create captivating animations and shorts, frame by frame.",
        img: flipbook,
    },
    {
        id: "viewerjs",
        title: "Current",
        description:
            "Dive in, share moments, and explore life from every angle.",
        img: current,
    },
    {
        id: "imageeditor",
        title: "Muse",
        description: "Edit images and stillshots.",
        img: muse,
    },
    {
        id: "playbook",
        title: "Playbook",
        description:
            "That's a pretty good idea you got there. Let's make a playbook.",
        img: playbook,
    },
    {
        id: "render",
        title: "Render",
        description: "Design stunning 2D and 3D visuals with ease.",
        img: render,
    },
];

const designApps: AppData[] = [
    {
        id: "online3dviewer",
        title: "View360",
        description: "View and Edit 3D Models",
        img: notes,
    },
    {
        id: "lumen",
        title: "Notes",
        description:
            "Your studio for brainstorming, knowledge storing, and planmaking.",
        img: notes,
    },
    {
        id: "dawg",
        title: "Mix",
        description: "Mix beats, craft tracks, and shape your sound.",
        img: mix,
    },
    {
        id: "amphion",
        title: "Gurr'",
        description: "Create voice models that can meow, sing, and honk.",
        img: gurr,
    },
    {
        id: "cast",
        title: "cast",
        description: "Transform texts into engaging podcasts.",
        img: cast,
    },
    {
        id: "omniclip",
        title: "CuttingRoom",
        description:
            "Edit videos, shorts, and clips with complex video editing tools.",
        img: notes,
    },
    {
        id: "plexocore",
        title: "Flow",
        description: "A place to manage projects, tasks, and workflows.",
        img: flow,
    },
    {
        id: "scribe",
        title: "Scribe",
        description: "Turn voice into text, quickly and accurately.",
        img: scribe,
    },
];

const AppLibraryModal: React.FC<AppLibraryModalProps> = ({ onClose }) => {
    const [fadeOut, setFadeOut] = useState<boolean>(false);
    const [currentProductivitySlide, setCurrentProductivitySlide] = useState(0);
    const [currentDesignSlide, setCurrentDesignSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [installedApps, setInstalledApps] = useState<Record<string, boolean>>(
        {}
    );
    const [installingApps, setInstallingApps] = useState<
        Record<string, boolean>
    >({});

    const dispatch = useDispatch();
    const productivityCardWrapperRef = useRef<HTMLDivElement>(null);
    const designCardWrapperRef = useRef<HTMLDivElement>(null);

    const CARDS_PER_VIEW = 3;
    const CARD_WIDTH = 250;

    useEffect(() => {
        const storedApps = localStorage.getItem("installedApps");
        if (storedApps) {
            setInstalledApps(JSON.parse(storedApps));
        }
    }, []);

    const closeModal = (): void => {
        setFadeOut(true);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const wrappedProductivityApps = [
        ...productivityApps.slice(-CARDS_PER_VIEW),
        ...productivityApps,
        ...productivityApps.slice(0, CARDS_PER_VIEW),
    ];

    const wrappedDesignApps = [
        ...designApps.slice(-CARDS_PER_VIEW),
        ...designApps,
        ...designApps.slice(0, CARDS_PER_VIEW),
    ];

    const handleTransitionEnd = (
        slideType: "productivity" | "design",
        currentSlide: number,
        setSlide: (value: number) => void
    ) => {
        setIsTransitioning(false);
        const totalOriginalSlides =
            slideType === "productivity"
                ? productivityApps.length
                : designApps.length;

        if (currentSlide <= 0) {
            setSlide(totalOriginalSlides - 1);
        } else if (currentSlide >= totalOriginalSlides + 1) {
            setSlide(0);
        }
    };

    const nextProductivitySlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentProductivitySlide((prev) => prev + 1);
    };

    const previousProductivitySlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentProductivitySlide((prev) => prev - 1);
    };

    const nextDesignSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentDesignSlide((prev) => prev + 1);
    };

    const previousDesignSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentDesignSlide((prev) => prev - 1);
    };

    const handleOpenApp = (app: AppData) => {
        const uniqueId = `${app.id}-${Date.now()}`;
        dispatch(addTab(app.id, app.title, uniqueId));
        dispatch(setActiveApp(app.id));
        closeModal();
    };

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
    const sliderRef = useRef();

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
                <div className="app-category-wrapper">
                    <div className="app-category">
                        <div className="app-heading-wrapper">
                            <h3>Productivity</h3>
                            <div className="nav-btn">
                                <div className=" image-swiper-button-prev arrow ">
                                    <img src={prevarrow} alt="Previous" />
                                </div>
                                <div className="image-swiper-button-next arrow ">
                                    <img src={nxtarrow} alt="Next" />
                                </div>
                            </div>
                        </div>

                        <div className="app-grid">
                            <div className="app-card-wrapper">
                                <Swiper
                                    modules={[Navigation]}
                                    spaceBetween={18}
                                    slidesPerView={1}
                                    loop={true}
                                    navigation={{
                                        nextEl: ".image-swiper-button-next",
                                        prevEl: ".image-swiper-button-prev",
                                    }}
                                    breakpoints={{
                                        768: {
                                            slidesPerView: 2,
                                            spaceBetween: 18,
                                        },
                                        900: {
                                            slidesPerView: 3,
                                            spaceBetween: 18,
                                        },
                                    }}
                                    onSwiper={(swiper) => console.log(swiper)}
                                >
                                    {wrappedProductivityApps.map(
                                        (app, index) => (
                                            <SwiperSlide
                                                key={`${app.id}-${index}`}
                                            >
                                                <AppCard
                                                    title={app.title}
                                                    description={
                                                        app.description
                                                    }
                                                    img={app.img}
                                                    isInstalled={
                                                        installedApps[
                                                            app.title
                                                        ] || false
                                                    }
                                                    isInstalling={
                                                        installingApps[
                                                            app.title
                                                        ] || false
                                                    }
                                                    onInstall={() =>
                                                        handleInstall(app.title)
                                                    }
                                                    onOpen={() =>
                                                        handleOpenApp(app)
                                                    }
                                                />
                                            </SwiperSlide>
                                        )
                                    )}
                                </Swiper>
                            </div>
                        </div>
                    </div>

                    {/* Design Section */}
                    <div className="app-category">
                        <div className="app-heading-wrapper">
                            <h3>Design</h3>
                            <div className="nav-btn">
                                <div className="button-prev arrow ">
                                    <img src={prevarrow} alt="Previous" />
                                </div>
                                <div className="button-next arrow ">
                                    <img src={nxtarrow} alt="Next" />
                                </div>
                            </div>
                        </div>

                        <div className="app-grid">
                            <div className="app-card-wrapper">
                                <Swiper
                                    modules={[Navigation]}
                                    spaceBetween={18}
                                    slidesPerView={3}
                                    breakpoints={{
                                        768: {
                                            slidesPerView: 2,
                                            spaceBetween: 18,
                                        },
                                        900: {
                                            slidesPerView: 3,
                                            spaceBetween: 18,
                                        },
                                    }}
                                    loop={true}
                                    navigation={{
                                        nextEl: ".button-next",
                                        prevEl: ".button-prev",
                                    }}
                                    onSwiper={(swiper) => console.log(swiper)}
                                >
                                    {wrappedDesignApps.map((app, index) => (
                                        <SwiperSlide key={`${app.id}-${index}`}>
                                            <AppCard
                                                title={app.title}
                                                description={app.description}
                                                img={app.img}
                                                isInstalled={
                                                    installedApps[app.title] ||
                                                    false
                                                }
                                                isInstalling={
                                                    installingApps[app.title] ||
                                                    false
                                                }
                                                onInstall={() =>
                                                    handleInstall(app.title)
                                                }
                                                onOpen={() =>
                                                    handleOpenApp(app)
                                                }
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// AppCard Component
const AppCard: React.FC<AppCardProps> = ({
    title,
    img,
    isInstalled,
    isInstalling,
    onInstall,
    onOpen,
    description,
}) => (
    <div className="app-card">
        <div className="app-icon">
            <img src={img} alt={`${title} Icon`} />
        </div>
        <h4 className="app-card-title">{title}</h4>
        <p>{description}</p>
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
