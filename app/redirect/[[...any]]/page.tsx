"use client";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import React from "react";

type RedirectParams = {
  params: {
    context?: string | null | undefined;
    status?: string| null | undefined;
    success?: string| null | undefined;
  };
};

const contexts = ["loginsteam", "loginsteamauthenticate", "steamlinkauthenticate", "steamlinkuserID"];
const statuses = ["200", "400", "401", "304"];

function getPageTitle (searchParams: ReadonlyURLSearchParams) {

  const context = searchParams.get("context");
  const success=  searchParams.get("success");

  if (context === "authsteamuser") {
    return "Authenticate Failed"
  }
  else if (context === "createsteamverifyurl") {
    return "Authorization Callback Failure"
  }
  else if (context === "fetchsteamuser") {
    return "Fetch Failed"
  }
  else if (context === "unknown") {
    return "Something Went Wrong"
  }
  else if (context === "nouserid") {
    return "No user id provided. Try refreshing the page."
  }
  else if (context === "steamlink" && success === 'true') {
    return "Steam Link Successful"
  }
  else if (context === "steamalreadylinked") {
    return "No Change"
  }
  else if (context === "steamlinkemail") {
    return "Confirm Your Email"
  }
  else if (context === "steamlinknouser") {
    return "User Not Found"
  }
  else if (context === "steamlinkedtodiffaccount") {
    return "Steam Account Already Linked"
  }
  else {
    return "How did you end up here?";
  }
}

function getDescription (searchParams: ReadonlyURLSearchParams) {
  
  const context = searchParams.get("context");
  const success=  searchParams.get("success");

  if (context === "authsteamuser") {
    return "Failed to authenticate Steam user."
  }
  else if (context === "createsteamverifyurl") {
    return "Failed to create an authorization URL to Steam."
  }
  else if (context === "fetchsteamuser") {
    return "Failed to retrieve Steam user."
  }
  else if (context === "unknown") {
    return "The problem is most likely server side."
  }
  else if (context === "nouserid") {
    return "No user id provided. Try refreshing the page."
  }
  else if (context === "steamlink" && success === 'true') {
    return "Successfully linked your BeatShot account to your steam account."
  }
  else if (context === "steamalreadylinked") {
    return "Your BeatShot account is already linked to your Steam account."
  }
  else if (context === "steamlinkemail") {
    return "Please confirm your email or request for a resend before attempting to link your Steam Account."
  }
  else if (context === "steamlinknouser") {
    return "The requested user was not found in the database."
  }
  else if (context === "steamlinkedtodiffaccount") {
    return "This steam account is already linked to an existing BeatShot account."
  }
  else {
    return "";
  }
}

export default function Redirect({ params }: RedirectParams | any) {
  
  const searchParams = useSearchParams();
  
  return (
    <div className="loading-container">
      <h2 className="loading-text">{getPageTitle(searchParams)}</h2>
      <p>{getDescription(searchParams)}</p>
    </div>
  );
};
