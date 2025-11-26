import AsheticsCard from '@/components/common/AsheticsCard';
import TwoColumnLayout from '@/components/layouts/TwoColumnLayout';
import React from 'react'

export default function RelatedAesthetics({ data }) {
  const { RelatedAesthetics } = data;
  
  return (
    <div className='innerWrapper'>
        {RelatedAesthetics.map((item, index) => <div className='content'><AsheticsCard key={index} data={item} /></div>)}
    </div>
  )
}
