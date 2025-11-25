import MediaRenderer from '@/components/common/MediaRenderer';
import TwoColumnLayout from '@/components/layouts/TwoColumnLayout';
import FadeUp from '@/components/ui/animations/FadeUp';
import Box from '@/components/ui/Box/Box';
import Heading from '@/components/ui/Heading';
import Paragraph from '@/components/ui/Paragraph';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import React from 'react'

export default function MediaWithTopBottomContent({ data }) {
  const { Title, TopContent, BottomContent, Media } = data;

  const leftContent = (
    <>
      <Box fullHeight direction="column" justify="space-between" mobileGap="90px" borderBottom>
        <div className="uppercase">OVERVIEW</div>
        <FadeUp><Heading level={2} style={{ maxWidth: 476 }}>
          Blending classic forms, natural textures, and thoughtful details, comfortable, and timeless. Here are five elements that define the New Heritage style.
          </Heading></FadeUp>
      </Box>
      <Box className="hide-desktop" borderBottom>
        <FadeUp style={{ width: '100%' }}>
          <MediaRenderer media={Media} classes={"image"} />
        </FadeUp>
      </Box>
      <Box
        fullHeight
        direction="row"
        justify="space-between"
        align="flex-end"
        padding="0"
        equalChildren
      >
        <div className='p20'>
         <Paragraph>
            <BlocksRenderer content={BottomContent || []} />
          </Paragraph>
        </div>
        <div className="p20 text-right">
          <div className="text-light uppercase">{'ShortText'}</div>
        </div>
      </Box>
    </>
  );

  const rightContent = (
    <>
      <div className="p20 hide-mobile">
        <MediaRenderer media={Media} classes={"image"} />
      </div>
    </>
  );

  return (
    <TwoColumnLayout left={leftContent} right={rightContent} showDivider />
  )
}
