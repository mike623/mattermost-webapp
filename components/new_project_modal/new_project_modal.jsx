// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import $ from 'jquery';

import PropTypes from 'prop-types';
import React from 'react';
import {Modal} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import {FormattedMessage} from 'react-intl';

import * as ChannelUtils from 'utils/channel_utils.jsx';
import Constants from 'utils/constants.jsx';

import {getShortenedURL} from 'utils/url.jsx';
import * as UserAgent from 'utils/user_agent.jsx';
import * as Utils from 'utils/utils.jsx';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import DynamicInput from 'components/dynamic_input';

export default class NewChannelModal extends React.PureComponent {
    static propTypes = {

        /**
         * Set whether to show the modal or not
         */
        show: PropTypes.bool.isRequired,

        /**
         * The type of channel to create, 'O' or 'P'
         */
        channelType: PropTypes.string.isRequired,

        /**
         * The data needed to create the channel
         */
        channelData: PropTypes.object.isRequired,

        /**
         * The data needed to create the project
         */
        projectData: PropTypes.object.isRequired,

        /**
         * Set to force form submission on CTRL/CMD + ENTER instead of ENTER
         */
        ctrlSend: PropTypes.bool,

        /**
         * Set to show options available to team admins
         */
        isTeamAdmin: PropTypes.bool,

        /**
         * Set to show options available to system admins
         */
        isSystemAdmin: PropTypes.bool,

        /**
         * Server error from failed channel creation
         */
        serverError: PropTypes.node,

        /**
         * Function used to submit the channel
         */
        onSubmitChannel: PropTypes.func.isRequired,

        /**
         * Function to call when modal is dimissed
         */
        onModalDismissed: PropTypes.func.isRequired,

        /**
         * Function to call when modal has exited
         */
        onModalExited: PropTypes.func,

        /**
         * Function to call to switch channel type
         */
        onTypeSwitched: PropTypes.func.isRequired,

        /**
         * Function to call when edit URL button is pressed
         */
        onChangeURLPressed: PropTypes.func.isRequired,

        /**
         * Function to call when channel data is modified
         */
        onDataChanged: PropTypes.func.isRequired
    }

    static defaultProps = {
        projectData: {
            screeningQuestions: [],
            deadline: moment()
        },
        channelData: {}
    }

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onEnterKeyDown = this.onEnterKeyDown.bind(this);

        this.state = {
            displayNameError: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show === true && this.props.show === false) {
            this.setState({
                displayNameError: ''
            });

            document.addEventListener('keydown', this.onEnterKeyDown);
        } else if (nextProps.show === false && this.props.show === true) {
            document.removeEventListener('keydown', this.onEnterKeyDown);
        }
    }

    componentDidMount() {
        // ???
        if (UserAgent.isInternetExplorer() || UserAgent.isEdge()) {
            $('body').addClass('browser--ie');
        }
    }

    onEnterKeyDown(e) {
        if (this.props.ctrlSend && e.keyCode === Constants.KeyCodes.ENTER && e.ctrlKey) {
            this.handleSubmit(e);
        } else if (!this.props.ctrlSend && e.keyCode === Constants.KeyCodes.ENTER && !e.shiftKey && !e.altKey) {
            this.handleSubmit(e);
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const displayName = this.props.channelData.displayName;

        if (displayName.length < Constants.MIN_CHANNELNAME_LENGTH) {
            this.setState({displayNameError: true});
            return;
        }
        this.props.onSubmitChannel();
    }

    handleDynamicInputChange = (data) => {
        const newData = {
            ...this.props.channelData,
            projectData: Object.assign({}, this.props.projectData, {screeningQuestions: data})
        };
        this.props.onDataChanged(newData);
    }
    handleDateChange = (dateMomentObject) => {
        const newData = {
            ...this.props.channelData,
            projectData: Object.assign({}, this.props.projectData, {deadline: dateMomentObject.toISOString()})
        };
        this.props.onDataChanged(newData);
    }

    handleChange() {
        const projectData = {
            ...this.props.projectData,
            clientRequest: this.refs.clientRequest.value,
            preference: this.refs.preference.value
        };

        // can decorate channel on here
        const newData = {
            displayName: 'Project',
            projectData
        };

        this.props.onDataChanged(newData);
    }

    render() {
        var displayNameError = null;
        var serverError = null;
        var displayNameClass = 'form-group';

        if (this.state.displayNameError) {
            displayNameError = (
                <p className='input__help error'>
                    <FormattedMessage
                        id='channel_modal.displayNameError'
                        defaultMessage='Channel name must be 2 or more characters'
                    />
                    {this.state.displayNameError}
                </p>
            );
            displayNameClass += ' has-error';
        }

        if (this.props.serverError) {
            serverError = <div className='form-group has-error'><div className='2'><p className='input__help error'>{this.props.serverError}</p></div></div>;
        }

        let createPublicChannelLink = (
            <button
                className='style--none color--link'
                onClick={this.props.onTypeSwitched}
            >
                <FormattedMessage
                    id='channel_modal.publicChannel1'
                    defaultMessage='Create a public channel'
                />
            </button>
        );

        let createPrivateChannelLink = (
            <button
                className='style--none color--link'
                onClick={this.props.onTypeSwitched}
            >
                <FormattedMessage
                    id='channel_modal.privateGroup2'
                    defaultMessage='Create a private channel'
                />
            </button>
        );

        if (!ChannelUtils.showCreateOption(Constants.OPEN_CHANNEL, this.props.isTeamAdmin, this.props.isSystemAdmin)) {
            createPublicChannelLink = null;
        }

        if (!ChannelUtils.showCreateOption(Constants.PRIVATE_CHANNEL, this.props.isTeamAdmin, this.props.isSystemAdmin)) {
            createPrivateChannelLink = null;
        }

        var channelSwitchText = '';
        let inputPrefixId = '';
        switch (this.props.channelType) {
        case 'P':
            channelSwitchText = (
                <div className='modal-intro'>
                    <FormattedMessage
                        id='channel_modal.privateGroup1'
                        defaultMessage='Create a new private channel with restricted membership. '
                    />
                    {createPublicChannelLink}
                </div>
            );
            inputPrefixId = 'newPrivateChannel';
            break;
        case 'O':
            channelSwitchText = (
                <div className='modal-intro'>
                    <FormattedMessage
                        id='channel_modal.publicChannel2'
                        defaultMessage='Create a new public channel anyone can join. '
                    />
                    {createPrivateChannelLink}
                </div>
            );
            inputPrefixId = 'newPublicChannel';
            break;
        }

        const prettyTeamURL = getShortenedURL();
        return (
            <span>
                <Modal
                    dialogClassName='new-channel__modal'
                    show={this.props.show}
                    bsSize='large'
                    onHide={this.props.onModalDismissed}
                    onExited={this.props.onModalExited}
                >
                    <Modal.Header closeButton={true}>
                        <Modal.Title>
                            <FormattedMessage
                                id='project_modal.modalTitle'
                                defaultMessage='New Project'
                            />
                        </Modal.Title>
                    </Modal.Header>
                    <form
                        role='form'
                        className='form-horizontal'
                        style={{padding: 10}}
                    >
                        <Modal.Body>
                            <div className={displayNameClass}>
                                <label className=' form__label control-label'>
                                    <FormattedMessage
                                        id='project_modal.clientRequest'
                                        defaultMessage='1. First, what do you need help with?'
                                    />
                                </label>
                                <div className=''>
                                    <textarea
                                        id={inputPrefixId + 'clientRequest'}
                                        className='form-control no-resize'
                                        ref='clientRequest'
                                        rows='4'
                                        maxLength='250'
                                        value={this.props.projectData.clientRequest}
                                        onChange={this.handleChange}
                                        tabIndex='2'
                                    />
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className=''>
                                    <label className='form__label control-label'>
                                        <FormattedMessage
                                            id='channel_modal.preference'
                                            defaultMessage='2. Do you have any preference for the type of experts? (e.g. any specific roles, someone who has done it before, thought leaders)'
                                        />
                                    </label>
                                </div>
                                <div className=''>
                                    <textarea
                                        id={inputPrefixId + 'preference'}
                                        className='form-control no-resize'
                                        ref='preference'
                                        rows='4'
                                        maxLength='250'
                                        value={this.props.projectData.preference}
                                        onChange={this.handleChange}
                                        tabIndex='2'
                                    />
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className=''>
                                    <label className='form__label control-label'>
                                        <FormattedMessage
                                            id='channel_modal.screeningQuestions'
                                            defaultMessage='3. Screening questions?'
                                        />
                                    </label>
                                </div>

                                <DynamicInput
                                    onChange={this.handleDynamicInputChange}
                                >
                                    {(index, remove, onChange, type) => (
                                        <div style={{display: 'flex', margin: '5px 0'}}>
                                            <input
                                                id={inputPrefixId + 'screeningQuestions'}
                                                onChange={(e) => onChange(index, e.target.value)}
                                                type='text'
                                                ref={'screening_questions'}
                                                className='form-control'
                                                value={this.props.projectData.screeningQuestions[index]}
                                                autoFocus={true}
                                                tabIndex='1'
                                            />
                                            <button
                                                className='btn btn-primary' data-role='add' onClick={(e) => {
                                                    e.preventDefault();
                                                    remove(index);
                                                }}
                                            >
                                                <span className={`glyphicon glyphicon-${type}`}/>
                                            </button>
                                        </div>
                                    )}
                                </DynamicInput>

                            </div>
                            <div className='form-group'>
                                <div className=''>
                                    <label className='form__label control-label'>
                                        <FormattedMessage
                                            id='channel_modal.deadline'
                                            defaultMessage='4. Is there a deadline for this project?'
                                        />
                                    </label>
                                </div>
                                <div style={{marginTop: 10}}>
                                    <DatePicker
                                        inline={true}
                                        selected={moment(this.props.projectData.deadline)}
                                        onChange={this.handleDateChange}
                                    />
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                type='button'
                                className='btn btn-default'
                                onClick={this.props.onModalDismissed}
                            >
                                <FormattedMessage
                                    id='channel_modal.cancel'
                                    defaultMessage='Cancel'
                                />
                            </button>
                            <button
                                onClick={this.handleSubmit}
                                type='submit'
                                className='btn btn-primary'
                                tabIndex='3'
                            >
                                <FormattedMessage
                                    id='project_modal.createNew'
                                    defaultMessage='Create New Draft Project'
                                />
                            </button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </span>
        );
    }
}
