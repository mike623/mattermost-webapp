// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Modal} from 'react-bootstrap';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {RequestStatus} from 'mattermost-redux/constants';

import Textbox from 'components/textbox.jsx';
import Constants from 'utils/constants.jsx';
import * as UserAgent from 'utils/user_agent.jsx';
import * as Utils from 'utils/utils.jsx';

const KeyCodes = Constants.KeyCodes;

const holders = defineMessages({
    error: {
        id: 'reject_expert_reason_modal.error',
        defaultMessage: 'This channel header is too long, please enter a shorter one'
    }
});

class EditChannelHeaderModal extends React.PureComponent {
    static propTypes = {

        /*
         * react-intl helper object
         */
        intl: intlShape.isRequired,

        /*
         * callback to call when modal will hide
         */
        onHide: PropTypes.func.isRequired,

        /*
         * Object with info about current channel ,
         */
        channel: PropTypes.object.isRequired,

        /*
         * boolean should be `ctrl` button pressed to send
         */
        ctrlSend: PropTypes.bool.isRequired,

        /*
         * object with info about server error
         */
        serverError: PropTypes.object,

        /*
         * string with info about about request
         */
        requestStatus: PropTypes.string.isRequired,

        /*
         * Collection of redux actions
         */
        actions: PropTypes.shape({

            /*
             * patch channel redux-action
             */
            patchChannel: PropTypes.func.isRequired
        }).isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            // header: props.channel.header,
            show: false,
            showError: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const {requestStatus: nextRequestStatus} = nextProps;
        const {requestStatus} = this.props;

        if (requestStatus !== nextRequestStatus && nextRequestStatus === RequestStatus.FAILURE) {
            this.setState({showError: true});
        } else if (requestStatus !== nextRequestStatus && nextRequestStatus === RequestStatus.SUCCESS) {
            this.onHide();
        } else {
            this.setState({showError: false});
        }
    }

    handleChange = (e) => {
        this.setState({
            header: e.target.value
        });
    }

    handleSave = () => {
        const {channel, actions: {patchChannel}} = this.props;
        const {header} = this.state;
        patchChannel(channel.id, {header});
    }

    onHide = () => {
        this.setState({show: false});
    }

    focusTextbox = () => {
        if (!Utils.isMobile()) {
            this.refs.editChannelHeaderTextbox.focus();
        }
    }

    handleEntering = () => {
        this.focusTextbox();
    }

    handleKeyDown = (e) => {
        const {ctrlSend} = this.props;
        if (ctrlSend && e.keyCode === KeyCodes.ENTER && e.ctrlKey === true) {
            this.handleKeyPress(e);
        }
    }

    handleKeyPress = (e) => {
        const {ctrlSend} = this.props;
        if (!UserAgent.isMobile() && ((ctrlSend && e.ctrlKey) || !ctrlSend)) {
            if (e.which === KeyCodes.ENTER && !e.shiftKey && !e.altKey) {
                e.preventDefault();
                ReactDOM.findDOMNode(this.refs.editChannelHeaderTextbox).blur();
                this.handleSave(e);
            }
        }
    }

    render() {
        let serverError = null;
        if (this.props.serverError && this.state.showError) {
            let errorMsg;
            if (this.props.serverError.server_error_id === 'model.channel.is_valid.header.app_error') {
                errorMsg = this.props.intl.formatMessage(holders.error);
            } else {
                errorMsg = this.props.serverError.message;
            }

            serverError = (
                <div className='form-group has-error'>
                    <br/>
                    <label className='control-label'>
                        {errorMsg}
                    </label>
                </div>
            );
        }


        return (
            <Modal
                show={this.state.show}
                onHide={this.onHide}
                onEntering={this.handleEntering}
                onExited={this.props.onHide}
            >
                <Modal.Header closeButton={true}>
                    <Modal.Title>
                        {'Can you tell us why you decide to decline John Doe?'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body bsClass='modal-body edit-modal-body'>
                    <div>
                        <textarea
                            style={{border: '1px solid #F2F2F2', background: 'rgba(242, 242, 242, 0.3)'}}
                            placeholder='Please type your reason here.'
                        />
                        <br/>
                        {serverError}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        disabled={this.props.requestStatus === RequestStatus.STARTED}
                        type='button'
                        className='btn btn-primary save-button'
                        onClick={this.handleSave}
                    >
                        <FormattedMessage
                            id='reject_expert_reason_modal.save'
                            defaultMessage='Save'
                        />
                    </button>
                    <button
                        type='button'
                        className='btn btn-default cancel-button'
                        onClick={this.onHide}
                    >
                        <FormattedMessage
                            id='reject_expert_reason_modal.cancel'
                            defaultMessage='Cancel'
                        />
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default injectIntl(EditChannelHeaderModal);

