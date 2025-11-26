import TwoColumnLayout from '@/components/layouts/TwoColumnLayout';
import Box from '@/components/ui/Box/Box';
import Heading from '@/components/ui/Heading';
import Paragraph from '@/components/ui/Paragraph';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import styles from './aestheticMaterials.module.css'
import Image from 'next/image';

export default function AestheticMaterials({ data }) {
  const { Title, TopContent, BottomContent, MaterialsImages } = data;

  const leftContent = (
    <>
      <Box fullHeight direction="column" justify="space-between" borderBottom borderColor="#EAEAE8">
        <div className="uppercase">{Title}</div>
        {/* <h1 className="headingOne" style={{ maxWidth: 470 }}>{SubTitle}</h1> */}
          <Heading level={2} style={{ maxWidth: 470 }}>{'This balance of unique texture and refined materials creates a home full of depth, warmth, and character,'}</Heading>
      </Box>

      <Box
        fullHeight
        direction="row"
        justify="space-between"
        align="flex-end"
        padding="0"
        equalChildren
      >
        <div className="p20">
          <Paragraph>
            <BlocksRenderer content={BottomContent || []} />
          </Paragraph>
        </div>
        <div className="p20 text-right">
          <div className={styles.materialsPhoto}>
            {MaterialsImages.map((material, index) => (
                <div key={index}>
                  <Image
                      src={material.url}
                      alt={
                        material.alternativeText ||
                        "Material Image"
                      }
                      width={36}
                      height={36}
                    />
                </div>
              ))}
          </div>
        </div>
      </Box>
    </>
  );

  const rightContent = (
    <>
      <div className="p20">
          {/* <MediaRenderer media={Media} classes={'image'} /> */}
          right image
      </div>
    </>
  );

  return (
    <TwoColumnLayout left={leftContent} right={rightContent} fullHeight showDivider dividerColor="#EAEAE8" />
  )
}
