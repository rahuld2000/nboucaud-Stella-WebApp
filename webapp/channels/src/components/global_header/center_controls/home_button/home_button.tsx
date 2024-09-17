// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import type {WrappedComponentProps} from 'react-intl';

import IconButton from '@mattermost/compass-components/components/icon-button'; // eslint-disable-line no-restricted-imports

import WithTooltip from 'components/with_tooltip';

import type {PropsFromRedux} from './index';

type Props = WrappedComponentProps & PropsFromRedux;

type State = {
    buttonActive: boolean;
};

class HomeButton extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            buttonActive: false,
        };
    }

    render() {
        const {intl} = this.props;
        const tooltipText = (
            <FormattedMessage
                id={'channel_header.homeButtonText'}
                defaultMessage='Home'
            />
        );

        return (
            <WithTooltip
                id='homeButtonTooltip'
                placement='bottom'
                title={tooltipText}
            >
                <IconButton
                    size={'sm'}
                    icon={'home-variant-outline'}
                    onClick={() => {}}
                    active={this.state.buttonActive}
                    inverted={true}
                    compact={true}
                    aria-controls='AddChannelDropdown'
                    aria-expanded={this.state.buttonActive}
                    aria-label={intl.formatMessage({id: 'channel_header.homeButtonText', defaultMessage: 'Home'})}
                />
            </WithTooltip>
        );
    }
}

export default injectIntl(HomeButton);
