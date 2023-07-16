import Link from "next/link";
import React from "react";
const PatchNotes = () => {
  return (
    <>
      <div className="flex-container-column gap-1rem padding-1rem">
            <h2 className="pn-title">Patch Notes</h2>
          <div className="responsive-centered-container">
            <div className="pn-wrapper">
              <p className="fs-400 text-center text-lightgrey">
                Patch Notes will become available after BeatShot has entered
                Early Access. In the meantime you can check out the <Link className="link text-white hover-blue" href="https://github.com/markoleptic/BeatShot">Github</Link> for the project.
              </p>
            </div>
        </div>
      </div>
    </>
  );
};
export default PatchNotes;
