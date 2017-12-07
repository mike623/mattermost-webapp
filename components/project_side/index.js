import React, {Component} from 'react';
import SearchResultsHeader from 'components/search_results_header';
import ExpertList from 'components/expert_list';
import ProjectDetail from 'components/project_detail';
import PropTypes from 'prop-types';

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

class ProjectDetailPage extends Component {
    static propTypes = {
        channelId: PropTypes.string.isRequired,
        toggleSize: PropTypes.func.isRequired
    }
    static defaultProps ={
        channelId: ''
    }
    state = {
        projectData: {},

        // [EXPERTS, CONSULTATION]
        viewPage: 'PROJECT'
    }
    render() {
        return (
            <div>
                {false && (
                    <SearchResultsHeader
                        isProjectDetail={true}
                        toggleSize={this.props.toggleSize}
                    />
                )}
                <DropDown
                    viewPage={this.state.viewPage}
                    onChange={(key) => this.setState({viewPage: key})}
                />

                {this.state.viewPage === 'EXPERTS' && <ExpertList/>}
                {this.state.viewPage === 'PROJECT' && <ProjectDetail/>}
            </div>
        );
    }
}

export default ProjectDetailPage;
