'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import styles from './teamListing.module.css';
import Image from 'next/image';
import FadeUp from '@/components/ui/animations/FadeUp';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TEAM_GLOBAL_QUERY = gql`
  query TeamGlobal {
    global {
      TeamListing {
        Listing(pagination: { limit: -1 }) {
          id
          Name
          Role
          Image {
            alternativeText
            url
          }
          Button {
            ButtonText
            ButtonURL
            OpenNewTab
          }
        }
        ReadBioLabel
      }
    }
  }
`;

export default function TeamListing({ data }) {
  const pathname = usePathname();

  const useGlobalTeam = data?.ShowGlobalTeamListing === true;

  const { data: globalData, loading } = useQuery(
    TEAM_GLOBAL_QUERY,
    {
      skip: !useGlobalTeam,
    }
  );

  const teamData = useGlobalTeam
    ? globalData?.global?.TeamListing
    : data;

  const allListing = teamData?.Listing || [];
  const ReadBioLabel = teamData?.ReadBioLabel;


  const currentSlug = pathname ?.split('/') .filter(Boolean) .pop() ?.toLowerCase();

  const Listing = useGlobalTeam
    ? allListing.filter((member) => {
        const memberSlug = member?.Button?.ButtonURL
          ?.replace(/^\/|\/$/g, '')
          ?.split('/')
          ?.filter(Boolean)
          ?.pop()
          ?.toLowerCase();

        return memberSlug !== currentSlug;
      })
    : allListing;

  const defaultImageObject = {
    url: '/images/default-placeholder.jpg',
    alternativeText: 'Default Team Placeholder',
  };

  const [currentImage, setCurrentImage] = useState(
    Listing.length > 0 && Listing[0].Image
      ? Listing[0].Image
      : defaultImageObject
  );

  const [activeMemberId, setActiveMemberId] = useState(
    Listing.length > 0
      ? Listing[0].id
      : null
  );

  useEffect(() => {
    if (Listing.length > 0) {
      setCurrentImage(
        Listing[0].Image || defaultImageObject
      );
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
    if (Listing.length > 0 && Listing[0].Image) {
      setCurrentImage(Listing[0].Image);
      setActiveMemberId(Listing[0].id);
    } else {
      setCurrentImage(defaultImageObject);
      setActiveMemberId(null);
    }
  };

  if (useGlobalTeam && loading) {
    return null;
  }

  if (Listing.length === 0) {
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
            <FadeUp>
              <Image
                src={currentImage.url}
                alt={
                  currentImage.alternativeText ||
                  'Team Member'
                }
                width={244}
                height={322}
                priority
                quality={90}
                className={styles.teamImage}
              />
            </FadeUp>
          </div>

          <div className={styles.teamList}>
            <FadeUp>
              {Listing.map((member, index) => (
                <div
                  key={member.id || index}
                  className={`${styles.teamMemberItem} ${
                    activeMemberId === member.id
                      ? styles.active
                      : ''
                  }`}
                  onMouseEnter={() =>
                    handleMouseEnter(member)
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  <span className={styles.memberName}>
                    {member.Name}
                  </span>

                  <span className={styles.memberTitle}>
                    {member.Role}
                  </span>

                  {member?.Button?.ButtonURL && (
                    <Link
                      href={member.Button.ButtonURL}
                      target={
                        member.Button.OpenNewTab
                          ? '_blank'
                          : '_self'
                      }
                    >
                      {member.Button.ButtonText ||
                        ReadBioLabel ||
                        'READ BIO'}
                    </Link>
                  )}
                </div>
              ))}
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}