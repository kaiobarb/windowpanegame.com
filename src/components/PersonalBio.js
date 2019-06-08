import React, {Component} from 'react';

export default class PersonalBio extends Component {

    ProfileContent(d) {
      var sorted = d.sort((a, b) => a.name > b.name);
      let v  = sorted.map( (data) => {
        return (
          <div className='column is-3'>
          <div className='card'>
            <div className='card-content'>
              <div className='media'>
                <div className='media-left'>
                  <figure className='image is-64x64'>
                    <img className='is-rounded' src={data.image} alt=''/>
                  </figure>
                </div>
                <div className='media-content'>
                  <p className='title is-6'>{data.name}</p>
                  <p className='subtitle is-7 has-text-grey'>{data.role}</p>
                </div>
              </div>
              <div className='content'>
                <p className='is-size-7'>{data.bio}</p>
              </div>
            </div>
          </div>
          </div>
        )}
      );
      return v;
    }

    render () {      
      let data = this.props.data;
      console.log(this.ProfileContent(data.profiles))
      return(
        <div className='section'>
          <div className='title'>The Team</div>
          <div className='columns is-multiline'>
              {this.ProfileContent(data.profiles)}
          </div>
        </div>

        
      );
    }

}