import TwoColumnLayout from '@/components/layouts/TwoColumnLayout';
import Box from '@/components/ui/Box/Box';
import Heading from '@/components/ui/Heading';
import Paragraph from '@/components/ui/Paragraph';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import React from 'react'

export default function AstheticsContact({ data }) {
  const { Title, Content, Description } = data;

  const leftContent = (
    <>
      <Box fullHeight direction="column" justify="space-between" borderBottom borderColor="#EAEAE8">
        <div className="uppercase">{Title}</div>
        <div className='heading'>
            <BlocksRenderer content={Description || []} />
          </div>
      </Box>

      <Box
        fullHeight
        direction="row"
        justify="space-between"
        align="flex-end"
        padding="0"
        equalChildren
        showDivider
        dividerColor='#EAEAE8'
      >
        <div className="p20">
          <Paragraph>
            <BlocksRenderer content={Content || []} />
          </Paragraph>
        </div>
        <div className="p20 text-right" />
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
