import React from "react";
import "./browser-header.scss";
import { LuPlus } from "react-icons/lu";
import { LiaCompass } from "react-icons/lia";

const Browser_Header = () => {
    return (
        <div className="browser-header">
            <div className="browser-tab"><LiaCompass className="compass-icon"/> <span>Infognito</span></div>
            <LuPlus className="plus-icon"/>
        </div>
    );
};

export default Browser_Header;
