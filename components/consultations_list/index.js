import React, {Component} from 'react';
import PropTypes from 'prop-types';

const ConsultationItem = ({date, time, est, link}) => (
    <div>
        <table>
            <tbody>
                <tr>
                    <td>Date</td>
                    <td>asdsa</td>
                </tr>
                <tr>
                    <td>Start Time</td>
                    <td>asdsada</td>
                </tr>
                <tr>
                    <td>Est. Duration</td>
                    <td>asdsada</td>
                </tr>
                <tr>
                    <td>Conslt. Link</td>
                    <td><a href='http://'>hhttppasda//</a></td>
                </tr>
            </tbody>
        </table>
    </div>
);

class ConsultationList extends Component {
    static propTypes = {
        consultations: PropTypes.array
    }
    static defaultProps = {
        consultations: [{}]
    }
    render() {
        return (
            <div>
                {this.props.consultations.map((con) => <ConsultationItem {...con}/>)}
            </div>
        );
    }
}

export default ConsultationList;