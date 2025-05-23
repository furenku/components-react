import type { Meta, StoryObj } from '@storybook/react';
import { ImageContainer } from './ImageContainer';

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

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/800/600?random=1',
    alt: 'Sample image',
    blurDataURL: generateBlurDataURL(),
    objectFit: 'cover',
    priority: false,
  },
  render: (args) => (
    <div style={{ width: '400px', height: '300px', position: 'relative' }}>
      <ImageContainer {...args} />
    </div>
  ),
};

export const WithContainFit: Story = {
  args: {
    src: 'https://picsum.photos/800/600?random=2',
    alt: 'Sample image with contain fit',
    width: 400,
    height: 300,
    blurDataURL: generateBlurDataURL('10b981'),
    objectFit: 'contain',
    priority: false,
  },
  render: (args) => (
    <div style={{ width: '400px', height: '300px', border: '1px solid #ccc', position: 'relative' }}>
      <ImageContainer {...args} />
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
