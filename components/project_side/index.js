import React, {Component} from 'react';
import ProjectRightSideHeader from 'components/project_right_side_header';
import ExpertList from 'components/expert_list';
import ProjectDetail from 'components/project_detail';
import ConsultationsList from 'components/consultations_list';
import PropTypes from 'prop-types';

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
                <ProjectRightSideHeader
                    isProjectDetail={true}
                    toggleSize={this.props.toggleSize}
                    viewPage={this.state.viewPage}
                    onChange={(key) => this.setState({viewPage: key})}
                />

                {this.state.viewPage === 'EXPERTS' && <ExpertList/>}
                {this.state.viewPage === 'PROJECT' && <ProjectDetail/>}
                {this.state.viewPage === 'CONSULTATIONS' && <ConsultationsList/>}
            </div>
        );
    }
}

export default ProjectDetailPage;
