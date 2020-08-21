import React from 'react';
import p from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {

  return (
    <div className={p.profile}>
      <div className={p.info}>
        <ProfileInfo />
      </div>
      <div className={p.posts}>
        <MyPosts postData = {props.state.postData}/>
      </div>
    </div>
  );
}

export default Profile;