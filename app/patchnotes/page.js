import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCrosshairs } from "@fortawesome/free-solid-svg-icons";

const PatchNotes = () => {
  return (
    <>
      <div className="flex-container-column gap-1rem padding-1rem">
        <h2 className="pn-title">Patch Notes</h2>
        <div className="centered-bordered-container">
          <div className="pn-container">
            <div className="pn-version-date">
              <Link
                className="link hover-blue fw-semibold pn-version-number"
                href="https://store.steampowered.com/news/app/2126580/view/3671048540133749972?utm_source=beatshotwebsite&utm_medium=web"
              >
                Version 0.5.1
              </Link>
              <p className="pn-date">August 8, 2023</p>
            </div>
            <ul>
              <p className="fs-300">
                This is a small update, but it improves the gun viewmodel and animations, which is constantly in your
                field of view.
              </p>
              <li>
                <FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
                <p className="fs-300">Animation</p>
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>New gun animations for idling, strafing, and landing after jumping.</p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>Removed the jump start and falling gun animations. They felt unnecessary in my opinion.</p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>
                      The old animations were relying on IK bone updates on tick using animations created for a
                      different weapon. You could tell the left hand on the handguard was not perfectly synced. The new
                      ones should look much cleaner since they&#39;re custom made for gun and require no IK bone
                      updates.
                    </p>
                  </li>
                </ul>
              </li>
              <li>
                <FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
                <p className="fs-300">User Interface</p>
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>The audio file select window no longer requires breaking out of Fullscreen mode.</p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default PatchNotes;
