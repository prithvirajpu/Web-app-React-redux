import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../features/auth/authThunks';
import Navbar from '../Componenets/Navbar';
import AxiosInstance from '../api/AxiosInstance';
import './Profile.css';
import userpic from '../assets/user.png'

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector(state => state.auth);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profile_image', file);

    try {
      await AxiosInstance.patch('profile/', formData);
      dispatch(fetchProfile());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      <div className="profile-page">
        {profile && (
          <div className="profile-card">
            <img
              className="profile-image"
              src={profile.profile_image || userpic}
              alt={profile.username}
            />

            <div className="profile-upload">
              <label className="upload-btn">
                Change Photo
                <input type="file" onChange={handleImageChange} />
              </label>
            </div>

            <div className="profile-info">
              <div className="profile-row">
                <span className="profile-label">Username</span>
                <span className="profile-value">{profile.username}</span>
              </div>

              <div className="profile-row">
                <span className="profile-label">Email</span>
                <span className="profile-value">{profile.email}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
