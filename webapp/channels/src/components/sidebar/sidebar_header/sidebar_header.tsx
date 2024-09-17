// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

import Heading from '@mattermost/compass-components/components/heading'; // eslint-disable-line no-restricted-imports
import Flex from '@mattermost/compass-components/utilities/layout/Flex'; // eslint-disable-line no-restricted-imports

import {getTheme} from 'mattermost-redux/selectors/entities/preferences';
import {getCurrentTeam} from 'mattermost-redux/selectors/entities/teams';

import CompassThemeProvider from 'components/compass_theme_provider/compass_theme_provider';
import WithTooltip from 'components/with_tooltip';

import type {GlobalState} from 'types/store';

type SidebarHeaderContainerProps = {
    id?: string;
}

type SidebarHeaderProps = Record<string, unknown>;

const SidebarHeaderContainer = styled(Flex).attrs(() => ({
    element: 'header',
    row: true,
    justify: 'space-between',
    alignment: 'center',
}))<SidebarHeaderContainerProps>`
    height: 55px;
    padding: 0 16px;
    gap: 8px;

    .dropdown-menu {
        position: absolute;
        transform: translate(0, 0);
        margin-left: 0;
        min-width: 210px;
    }

    #SidebarContainer & .AddChannelDropdown_dropdownButton {
        border-radius: 16px;
        font-size: 18px;
    }
`;

const SidebarHeading = styled(Heading).attrs(() => ({
    element: 'h1',
    margin: 'none',
    size: 200,
}))<SidebarHeaderProps>`
    color: var(--sidebar-text);
    cursor: pointer;
    display: flex;

    .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
    }

    .icon-chevron-down {
        margin-left: -3px;
        margin-right: -1px;
    }

    #SidebarContainer & {
        font-family: Metropolis, sans-serif;
    }
`;

export type Props = {
    showNewChannelModal: () => void;
    showMoreChannelsModal: () => void;
    showCreateUserGroupModal: () => void;
    invitePeopleModal: () => void;
    showCreateCategoryModal: () => void;
    canCreateChannel: boolean;
    canJoinPublicChannel: boolean;
    handleOpenDirectMessagesModal: (e: Event) => void;
    unreadFilterEnabled: boolean;
    userGroupsEnabled: boolean;
    canCreateCustomGroups: boolean;
}

const SidebarHeader = (_: Props) => {
    const currentTeam = useSelector((state: GlobalState) => getCurrentTeam(state));
    const theme = useSelector(getTheme);

    if (!currentTeam) {
        return null;
    }

    return (
        <CompassThemeProvider theme={theme}>
            <SidebarHeaderContainer
                id={'sidebar-header-container'}
            >
                <WithTooltip
                    id='team-name__tooltip'
                    title={currentTeam.description ? currentTeam.description : currentTeam.display_name}
                    placement='bottom'
                >
                    <SidebarHeading>
                        <button className='style--none sidebar-header'>
                            <span className='title'>{currentTeam.display_name}</span>
                        </button>
                    </SidebarHeading>
                </WithTooltip>
            </SidebarHeaderContainer>
        </CompassThemeProvider>
    );
};

export default SidebarHeader;
