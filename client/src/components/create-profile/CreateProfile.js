import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
  }

  onSubmit = e => {
      e.preventDefault();

      console.log('Submit');
  }

  onChange = e => {
      this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { errors } = this.state;
    
    // Create select options
    const options = [
        { label: 'Select Professional Status', value: 0 },
        { label: 'Developer', value: 'Developer' },
        { label: 'Senior Developer', value: 'Senior Developer' },
        { label: 'Manager', value: 'Manager' },
        { label: 'Student or learning', value: 'Student or learning' },
        { label: 'Instructor', value: 'Instructor' },
        { label: 'Intern', value: 'Intern' },
        { label: 'Other', value: 'Other' }
        
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row" />
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create your profile</h1>
            <p className="lead text-center">
            Let's get some information to make your profile stand out
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={this.onSubmit}>
                <TextFieldGroup 
                placeholder="* Profile Handle"
                name="Handle"
                value={this.state.handle}
                onChange={this.onChange}
                error={errors.handle}
                info="A unique handle for your profile"
                />

                <SelectListGroup 
                placeholder="Status"
                name="status"
                value={this.state.status}
                onChange={this.onChange}
                options={options}
                error={errors.status}
                info="Select You professional status"
                />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);
