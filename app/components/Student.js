import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStudent, updateStudent } from '../redux/students';

class Student extends React.Component {
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id);
  }

  //   componentDidUpdate(prevProps) {
  //     if (prevProps.match.params.candyId !== this.props.match.params.candyId) {
  //       this.props.fetchSingleCandy(this.props.match.params.candyId);
  //     }
  //   }

  render() {
    const { student, updateStudent } = this.props;
    const campus = student.getCampus();
    console.log(`**********STUDENT_CAMPUS${campus}**********`);
    return (
      <div key={student.id}>
        <img src={student.imageUrl} />
        <h2>
          {student.firstName} {student.lastName}
        </h2>
        <p>{student.email}</p>
        <p>{student.gpa}</p>
        <p>
          {student.campusId ? (
            <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
          ) : (
            'Sorry, no campus to see yet!'
          )}
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ student }) => ({
  student,
});

const mapDispatchToProps = (dispatch) => ({
  getStudent: (id) => dispatch(fetchStudent(id)),
  updateStudent: (id, student) => dispatch(updateStudent(id, student)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Student);