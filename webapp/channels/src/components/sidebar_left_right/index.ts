// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/* eslint-disable @typescript-eslint/no-unused-vars */

import type {ConnectedProps} from 'react-redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import type {Dispatch} from 'redux';

import type {GlobalState} from 'types/store';

import SidebarLeftRight from './sidebar_left_right';

function mapStateToProps(state: GlobalState) {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: {},
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connector(SidebarLeftRight));
