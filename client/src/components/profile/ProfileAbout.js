import React, { Component } from 'react'
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
  
  render() {
    const { profile } = this.props

    // Get first name
    const firstName = profile.user.name.trim().split(' ')[0]

    // Get skills list
    const skills = profile.skills.map((skill, index) => (
      <div key={index} class="p-3">
        <i class="fa fa-check" /> {skill}
      </div>
    ))

    return (
      <div class="row">
      <div class="col-md-12">
        <div class="card card-body bg-light mb-3">
          <h3 class="text-center text-info">{firstName}'s Bio</h3>
          <p class="lead"> {isEmpty(profile.bio) ? (<span>{firstName} doesn't have a bio yet.</span>) : (<span>{profile.bio}</span>)}
          </p>
          <hr />
          <h3 class="text-center text-info">Skill Set</h3>
          <div class="row">
            <div class="d-flex flex-wrap justify-content-center align-items-center">
              {skills}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default ProfileAbout