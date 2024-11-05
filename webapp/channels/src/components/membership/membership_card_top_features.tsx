// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from "react";
import { useIntl } from "react-intl";

import { useMembershipCardContext } from "./membership_card";

const TopFeatures = () => {
    const { formatMessage } = useIntl();
    const { topFeatures } = useMembershipCardContext();

    return (
        <div className="top-features">
            <p>{topFeatures}</p>
            <a href="edu.infogito.com">edu.infogito.com</a>
        </div>
    );
};

export default TopFeatures;
