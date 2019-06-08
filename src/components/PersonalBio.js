import React, {Component} from 'react';

export default class PersonalBio extends Component {

    ProfileContent(d) {
      let v  = d.map( (data) => {
        return (
          <div className='column'>
          <div className='card'>
            <div className='card-content'>
              <div className='media'>
                <div className='media-left'>
                  <figure className='image is-64x64'>
                    <img className='is-rounded' src={data.image} alt=''/>
                  </figure>
                </div>
                <div className='media-content'>
                  <p className='title is-4'>{data.name}</p>
                  <p className='subtitle is-6 has-text-grey'>{data.role}</p>
                </div>
              </div>
              <div className='content'>
                {data.bio}
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
        
        <div className='columns is-multiline'>
            {this.ProfileContent(data.profiles)}
        </div>

        
      );
    }

}