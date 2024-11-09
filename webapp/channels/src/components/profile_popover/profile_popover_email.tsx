// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from "react";

type Props = {
    email?: string;
    haveOverrideProp?: boolean;
    isBot?: boolean;
};
const ProfilePopoverEmail = ({ email, haveOverrideProp, isBot }: Props) => {
    if (!email || isBot || haveOverrideProp) {
        return null;
    }

    return <></>;
};

export default ProfilePopoverEmail;
