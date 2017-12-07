import React, {Component} from 'react';
import SearchResultsHeader from 'components/search_results_header';
import ExpertList from 'components/expert_list';
import PropTypes from 'prop-types';

class ProjectDetailPage extends Component {
    static propTypes = {
        channelId: PropTypes.string.isRequired,
        toggleSize: PropTypes.func.isRequired
    }
    static defaultProps ={
        channelId: ''
    }
    render() {
        return (
            <div>
               project detail
            </div>
        );
    }
}

export default ProjectDetailPage;
