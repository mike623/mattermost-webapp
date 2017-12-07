// Copyright (c) 2017 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {closeRightHandSide} from 'actions/views/rhs';

import ProjectSideHeader from './project_side_header.jsx';

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            closeRightHandSide
        }, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(ProjectSideHeader);
