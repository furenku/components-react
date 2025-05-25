import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { ImageContainer } from './ImageContainer';
import { useEffect, useState } from 'react';

const meta: Meta<typeof ImageContainer> = {
  title: 'Media/ImageContainer',
  component: ImageContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An animated image container component that uses Next.js Image with loading states and blur placeholder.',
      },
    },
    // Next.js specific parameters
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image',
    },
    width: {
      control: { type: 'number' },
      description: 'Image width (used with contain object fit)',
    },
    height: {
      control: { type: 'number' },
      description: 'Image height (used with contain object fit)',
    },
    blurDataURL: {
      control: 'text',
      description: 'Base64 blur placeholder image',
    },
    objectFit: {
      control: { type: 'select' },
      options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
      description: 'Object fit property',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    priority: {
      control: 'boolean',
      description: 'Whether to load image with priority',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Generate a simple blur data URL for demo
const generateBlurDataURL = (color: string = '3b82f6') => {
  return `data:image/svg+xml;base64,${Buffer.from(`
    <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <filter id="blur"><feGaussianBlur stdDeviation="12"/></filter>
      <rect width="100%" height="100%" fill="#${color}" filter="url(#blur)"/>
    </svg>
  `).toString('base64')}`;
};


const fetchImageAsBase64 = async (url: string): Promise<string> => {
  const res = await fetch(url)
  const blob = await res.blob()
  return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
          if (typeof reader.result === 'string') {
              resolve(reader.result)
          } else {
              reject(new Error('Failed to convert blob to base64.'))
          }
      }
      reader.onerror = reject
      reader.readAsDataURL(blob)
  })
}

const ImageContainerDemo = () => {
  const [blurDataURL, setBlurDataURL] = useState<string | null>(null)
  const id = 653 // known working id
  const url = "https://picsum.photos/id/"+id+"/300"
  const preview = "https://picsum.photos/id/"+id+"/18/12"

  useEffect(() => {
      fetchImageAsBase64(preview).then(setBlurDataURL)
  }, [preview])

  return blurDataURL && (
      <ImageContainer
          src={url}
          alt="placeholder"
          blurDataURL={blurDataURL ?? ''}
      />
  )
}


export const Default: Story = {
  args: {},
  render: (args) => (
    <div style={{ width: '400px', height: '300px', position: 'relative' }}>
      <ImageContainerDemo/>
    </div>
  ),
};

export const WithContainFit: Story = {
  args: {
   
  },
  render: (args) => (
    <div style={{ width: '400px', height: '300px', border: '1px solid #ccc', position: 'relative' }}>
      <ImageContainerDemo/>
    </div>
  ),
};

export const WithPriority: Story = {
  args: {
    src: 'https://picsum.photos/800/600?random=3',
    alt: 'Priority loaded image',
    blurDataURL: generateBlurDataURL('ef4444'),
    objectFit: 'cover',
    priority: true,
  },
  render: (args) => (
    <div style={{ width: '400px', height: '300px', position: 'relative' }}>
      <ImageContainer {...args} />
    </div>
  ),
};

export const LargeLandscape: Story = {
  args: {
    src: 'https://picsum.photos/1200/600?random=4',
    alt: 'Large landscape image',
    blurDataURL: generateBlurDataURL('8b5cf6'),
    objectFit: 'cover',
    className: 'rounded-lg',
  },
  render: (args) => (
    <div style={{ width: '600px', height: '300px', position: 'relative' }}>
      <ImageContainer {...args} />
    </div>
  ),
};

export const SmallPortrait: Story = {
  args: {
    src: 'https://picsum.photos/400/600?random=5',
    alt: 'Small portrait image',
    blurDataURL: generateBlurDataURL('f59e0b'),
    objectFit: 'cover',
  },
  render: (args) => (
    <div style={{ width: '200px', height: '300px', position: 'relative' }}>
      <ImageContainer {...args} />
    </div>
  ),
};

export const SlowLoadingDemo: Story = {
  args: {
    // Use a slow-loading image service
    src: 'https://dummyimage.com/800x600/4f46e5/ffffff.png&text=Slow+Loading',
    alt: 'Slow loading demo',
    blurDataURL: generateBlurDataURL('4f46e5'),
    objectFit: 'cover',
  },
  render: (args) => (
    <div style={{ width: '400px', height: '300px', position: 'relative' }}>
      <ImageContainer {...args} />
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
        This story demonstrates the loading animation with a slower image
      </p>
    </div>
  ),
};
