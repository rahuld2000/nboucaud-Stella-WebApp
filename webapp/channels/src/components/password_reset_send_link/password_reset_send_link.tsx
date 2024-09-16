// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {FormattedMessage, injectIntl, type IntlShape} from 'react-intl';

import type {ActionResult} from 'mattermost-redux/types/actions';
import {isEmail} from 'mattermost-redux/utils/helpers';


import './password_reset_send_link.scss'
import Footer from 'components/header_footer_route/footer';
import { Link } from 'react-router-dom';

export interface Props {
    actions: {
        sendPasswordResetEmail: (email: string) => Promise<ActionResult>;
    };
    intl: IntlShape;
}

interface State {
    error: React.ReactNode;
    updateText: React.ReactNode;
}

export class PasswordResetSendLink extends React.PureComponent<Props, State> {
    state = {
        error: null,
        updateText: null,
    };
    resetForm = React.createRef<HTMLFormElement>();
    emailInput = React.createRef<HTMLInputElement>();

    handleSendLink = async (e: React.FormEvent) => {
        e.preventDefault();

        const email = this.emailInput.current!.value.trim().toLowerCase();
        if (!email || !isEmail(email)) {
            this.setState({
                error: (
                    <FormattedMessage
                        id='password_send.error'
                        defaultMessage='Please enter a valid email address.'
                    />
                ),
            });
            return;
        }

        // End of error checking clear error
        this.setState({error: null});

        const {data, error} = await this.props.actions.sendPasswordResetEmail(email);
        if (data) {
            this.setState({
                error: null,
                updateText: (
                    <div
                        id='passwordResetEmailSent'
                        className='reset-form alert alert-success'
                    >
                        <FormattedMessage
                            id='password_send.link'
                            defaultMessage='If the account exists, a password reset email will be sent to:'
                        />
                        <div>
                            <b>{email}</b>
                        </div>
                        <br/>
                        <FormattedMessage
                            id='password_send.checkInbox'
                            defaultMessage='Please check your inbox.'
                        />
                    </div>
                ),
            });
            if (this.resetForm.current) {
                this.resetForm.current.hidden = true;
            }
        } else if (error) {
            this.setState({
                error: error.message,
                updateText: null,
            });
        }
    };

    render() {
        let error = null;
        if (this.state.error) {
            error = (
                <div className='form-group has-error'>
                    <label className='control-label'>{this.state.error}</label>
                </div>
            );
        }

        let formClass = 'form-group';
        if (error) {
            formClass += ' has-error';
        }

        return (
            <div className='get-app'>

                <div className='col-sm-12 card_center'>
                
                    <div className=' reset-password_link-body-card'>
                    <p className='dont_p_RESET'>Don't have an account? <Link to={'/signup_user_complete'} className='signup_p'>Sign Up</Link></p>
                    {error}

                       <div className=''>
                       <FormattedMessage
                            id='password_send.title'
                            tagName='h1'
                            defaultMessage='Password Reset'
                        />
                        {this.state.updateText}
                        <form
                            onSubmit={this.handleSendLink}
                            ref={this.resetForm}
                        >
                            <p>
                                <FormattedMessage
                                    id='password_send.description'
                                    defaultMessage='To reset your password, enter the email address you used to sign up'
                                />
                            </p>
                            <div className={formClass}>
                                <input
                                    id='passwordResetEmailInput'
                                    type='email'
                                    className='form-control reset_input'
                                    name='email'
                                    placeholder={this.props.intl.formatMessage({
                                        id: 'password_send.email',
                                        defaultMessage: 'Email',
                                    })}
                                    ref={this.emailInput}
                                    spellCheck='false'
                                    autoFocus={true}
                                />
                            </div>
                            <button
                                id='passwordResetButton'
                                type='submit'
                                className='btn btn-primary reset_my_password ' 
                            >
                                <FormattedMessage
                                    id='password_send.reset'
                                    defaultMessage='Reset my password'
                                />
                            </button>
                        </form>
                       </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default injectIntl(PasswordResetSendLink);
