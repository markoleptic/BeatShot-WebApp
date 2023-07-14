import { useAuthContext } from "../../context/AuthProvider";
import React from "react";

const ProfileHeader = () => {
  const { auth } = useAuthContext();
  return (
    <>
      <div className="content-header">
        <h2 className="content-header-text">Welcome, {auth.displayName}.</h2>
      </div>
    </>
  );
};
export default ProfileHeader;
