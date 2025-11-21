'use client';

import { useEffect, useState } from 'react';
import styles from './teamListing.module.css';
import Image from 'next/image';

export default function TeamListing({ data }) {
  const { Listing, ReadBioLabel } = data;

  const defaultImageObject = {
    url: '/images/default-placeholder.jpg',
    alternativeText: 'Default Team Placeholder',
  };

  const [currentImage, setCurrentImage] = useState(() => {
    if (Listing && Listing.length > 0 && Listing[0].Image) {
      return Listing[0].Image;
    }
    return defaultImageObject;
  });

  const [activeMemberId, setActiveMemberId] = useState(() => {
    if (Listing && Listing.length > 0) {
      return Listing[0].id;
    }
    return null;
  });

  useEffect(() => {
    if (Listing && Listing.length > 0) {
      setCurrentImage(Listing[0].Image || defaultImageObject);
      setActiveMemberId(Listing[0].id);
    } else {
      setCurrentImage(defaultImageObject);
      setActiveMemberId(null);
    }
  }, [Listing]);

  const handleMouseEnter = (member) => {
    if (member.Image) {
      setCurrentImage(member.Image);
    }
    setActiveMemberId(member.id);
  };

  const handleMouseLeave = () => {
    if (Listing && Listing.length > 0 && Listing[0].Image) {
      setCurrentImage(Listing[0].Image);
      setActiveMemberId(Listing[0].id);
    } else {
      setCurrentImage(defaultImageObject);
      setActiveMemberId(null);
    }
  };

  if (!Listing || Listing.length === 0) {
    return (
      <section className="team-listing">
        <div className="container">
          <p>No team members to display.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.teamListing}>
      <div className="container">
        <div className={styles.teamWrapper}>
            <div className={styles.teamImageContainer}>
                <Image
                    src={currentImage.url}
                    alt="Team Member"
                    width={244}
                    height={322}
                    className={styles.teamImage}
                />
            </div>
            <div className={styles.teamList}>
                {Listing.map((member) => (
                    <div
                        key={member.id}
                        className={`${styles.teamMemberItem} ${activeMemberId === member.id ? styles.active : ''}`}
                        onMouseEnter={() => handleMouseEnter(member)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <span className={styles.memberName}>{member.Name}</span>
                        <span className={styles.memberTitle}>{member.Role}</span>
                        <a href={`/team/${member.id}`} className={styles.readBio}>
                            READ BIO
                        </a>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
