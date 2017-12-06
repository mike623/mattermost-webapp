// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

// import {browserHistory} from 'react-router';

// import * as ChannelActions from 'mattermost-redux/actions/channels';
// import {deletePreferences, savePreferences} from 'mattermost-redux/actions/preferences';
// import {Client4} from 'mattermost-redux/client';
// import {getMyChannelMemberships} from 'mattermost-redux/selectors/entities/channels';

// import {actionOnGlobalItemsWithPrefix} from 'actions/storage';

// import {trackEvent} from 'actions/diagnostics_actions.jsx';
// import * as GlobalActions from 'actions/global_actions.jsx';
// import * as PostActions from 'actions/post_actions.jsx';
// import {loadNewDMIfNeeded, loadNewGMIfNeeded, loadProfilesForSidebar} from 'actions/user_actions.jsx';
// import ChannelStore from 'stores/channel_store.jsx';
// import PreferenceStore from 'stores/preference_store.jsx';
import store from 'stores/redux_store.jsx';
// import TeamStore from 'stores/team_store.jsx';
// import UserStore from 'stores/user_store.jsx';

// import * as ChannelUtils from 'utils/channel_utils.jsx';
// import {Constants, Preferences, StoragePrefixes} from 'utils/constants.jsx';
// import * as UserAgent from 'utils/user_agent.jsx';
// import * as Utils from 'utils/utils.jsx';
// import {isUrlSafe} from 'utils/url.jsx';

import * as ProjectClient from './project.js';


export const dispatch = store.dispatch;
export const getState = store.getState;

export async function createProject(channelId, projectData, success, error) {
    const {data, error: err} = await ProjectClient.createProject(channelId, projectData);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
    return data;
}

