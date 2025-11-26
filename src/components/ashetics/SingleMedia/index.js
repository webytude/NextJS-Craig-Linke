import MediaRenderer from '@/components/common/MediaRenderer';
import React from 'react'

export default function SingleMedia({ data }) {
  const { Media } = data;

  return (
    <div>
      <MediaRenderer media={Media} classes={'image'} />
    </div>
  )
}
