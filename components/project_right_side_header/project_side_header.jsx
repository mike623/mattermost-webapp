// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import PropTypes from 'prop-types';
import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

import Constants from 'utils/constants.jsx';

const titleMap = {
    PROJECT: 'Project',
    EXPERTS: 'Experts',
    CONSULTATIONS: 'Consultations',
    TRANSCRIPTS: 'Transcripts'
};

const DropDown = ({onChange, viewPage}) => (
    <div className='dropdown'>
        <button className='btn btn-secondary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
            {titleMap[viewPage]}
        </button>
        <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
            {Object.keys(titleMap).map((key) => (
                <div
                    onClick={() => onChange(key)}
                    className={`dropdown-item ${viewPage === key ? 'active' : ''}`}
                >
                    {titleMap[key]}
                </div>
    ))}
        </div>
    </div>
);

export default class SearchResultsHeader extends React.Component {
    static propTypes = {
        isMentionSearch: PropTypes.bool,
        isFlaggedPosts: PropTypes.bool,
        isPinnedPosts: PropTypes.bool,
        toggleSize: PropTypes.func,
        onChange: PropTypes.func,
        viewPage: PropTypes.func,
        shrink: PropTypes.func,
        channelDisplayName: PropTypes.string.isRequired,
        actions: PropTypes.shape({
            closeRightHandSide: PropTypes.func
        })
    };

    handleClose = (e) => {
        e.preventDefault();

        this.props.actions.closeRightHandSide();

        this.props.shrink();
    }

    toggleSize = (e) => {
        e.preventDefault();
        this.props.toggleSize();
    }

    render() {
        var title = (
            <FormattedMessage
                id='search_header.results'
                defaultMessage='Search Results'
            />
        );

        const closeSidebarTooltip = (
            <Tooltip id='closeSidebarTooltip'>
                <FormattedMessage
                    id='rhs_header.closeSidebarTooltip'
                    defaultMessage='Close Sidebar'
                />
            </Tooltip>
        );

        const expandSidebarTooltip = (
            <Tooltip id='expandSidebarTooltip'>
                <FormattedMessage
                    id='rhs_header.expandSidebarTooltip'
                    defaultMessage='Expand Sidebar'
                />
            </Tooltip>
        );

        const shrinkSidebarTooltip = (
            <Tooltip id='shrinkSidebarTooltip'>
                <FormattedMessage
                    id='rhs_header.shrinkSidebarTooltip'
                    defaultMessage='Shrink Sidebar'
                />
            </Tooltip>
        );

        if (this.props.isMentionSearch) {
            title = (
                <FormattedMessage
                    id='search_header.title2'
                    defaultMessage='Recent Mentions'
                />
            );
        } else if (this.props.isFlaggedPosts) {
            title = (
                <FormattedMessage
                    id='search_header.title3'
                    defaultMessage='Flagged Posts'
                />
            );
        } else if (this.props.isPinnedPosts) {
            title = (
                <FormattedMessage
                    id='search_header.title4'
                    defaultMessage='Pinned posts in {channelDisplayName}'
                    values={{
                        channelDisplayName: this.props.channelDisplayName
                    }}
                />
            );
        }

        return (
            <div className='sidebar--right__header' style={{overflow: 'visible'}}>
                <div className='pull-left'>
                    <DropDown
                        viewPage={this.props.viewPage}
                        onChange={this.props.onChange}
                    />
                </div>
                <div className='pull-right'>
                    <button
                        type='button'
                        className='sidebar--right__expand'
                        aria-label='Expand'
                        onClick={this.toggleSize}
                    >
                        <OverlayTrigger
                            trigger={['hover', 'focus']}
                            delayShow={Constants.OVERLAY_TIME_DELAY}
                            placement='top'
                            overlay={expandSidebarTooltip}
                        >
                            <i className='fa fa-expand'/>
                        </OverlayTrigger>
                        <OverlayTrigger
                            trigger={['hover', 'focus']}
                            delayShow={Constants.OVERLAY_TIME_DELAY}
                            placement='top'
                            overlay={shrinkSidebarTooltip}
                        >
                            <i className='fa fa-compress'/>
                        </OverlayTrigger>
                    </button>
                    <button
                        type='button'
                        className='sidebar--right__close'
                        aria-label='Close'
                        title='Close'
                        onClick={this.handleClose}
                    >
                        <OverlayTrigger
                            trigger={['hover', 'focus']}
                            delayShow={Constants.OVERLAY_TIME_DELAY}
                            placement='top'
                            overlay={closeSidebarTooltip}
                        >
                            <i className='fa fa-sign-out'/>
                        </OverlayTrigger>
                    </button>
                </div>
            </div>
        );
    }
}
