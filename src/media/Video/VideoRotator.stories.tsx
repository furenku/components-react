import type { Meta, StoryObj } from '@storybook/react';
import { VideoRotator } from './VideoRotator';

const meta: Meta<typeof VideoRotator> = {
  title: 'Media/VideoRotator',
  component: VideoRotator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A video rotator component that cycles through multiple video sources.',
      },
    },
  },
  argTypes: {
    videos: {
      description: 'Array of video sources to rotate through',
    },
    interval: {
      control: { type: 'number' },
      description: 'Rotation interval in milliseconds',
    },
    autoPlay: {
      control: 'boolean',
      description: 'Whether videos should auto-play',
    },
    controls: {
      control: 'boolean',
      description: 'Whether to show video controls',
    },
    muted: {
      control: 'boolean',
      description: 'Whether videos should be muted by default',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    onVideoChange: {
      action: 'video changed',
      description: 'Callback fired when video changes',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample video data
const sampleVideos = [
  {
    id: '1',
    sources: {
      webm: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.webm',
      mp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    poster: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
    title: 'Big Buck Bunny',
  },
  {
    id: '2',
    sources: {
      webm: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.webm',
      mp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    },
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
    title: 'Elephants Dream',
  },
  {
    id: '3',
    sources: {
      webm: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.webm',
      mp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
    title: 'For Bigger Blazes',
  },
];

export const Default: Story = {
  args: {
    videos: sampleVideos,
    interval: 5000,
    autoPlay: true,
    controls: true,
    muted: true,
  },
  render: (args) => (
    <div style={{ width: '640px', height: '360px' }}>
      <VideoRotator {...args} />
    </div>
  ),
};

export const FastRotation: Story = {
  args: {
    videos: sampleVideos,
    interval: 2000,
    autoPlay: true,
    controls: true,
    muted: true,
  },
  render: (args) => (
    <div style={{ width: '640px', height: '360px' }}>
      <VideoRotator {...args} />
    </div>
  ),
};

export const SlowRotation: Story = {
  args: {
    videos: sampleVideos,
    interval: 10000,
    autoPlay: true,
    controls: true,
    muted: true,
  },
  render: (args) => (
    <div style={{ width: '640px', height: '360px' }}>
      <VideoRotator {...args} />
    </div>
  ),
};

export const NoAutoPlay: Story = {
  args: {
    videos: sampleVideos,
    interval: 5000,
    autoPlay: false,
    controls: true,
    muted: false,
  },
  render: (args) => (
    <div style={{ width: '640px', height: '360px' }}>
      <VideoRotator {...args} />
    </div>
  ),
};

export const NoControls: Story = {
  args: {
    videos: sampleVideos,
    interval: 5000,
    autoPlay: true,
    controls: false,
    muted: true,
  },
  render: (args) => (
    <div style={{ width: '640px', height: '360px' }}>
      <VideoRotator {...args} />
    </div>
  ),
};

export const SingleVideo: Story = {
  args: {
    videos: [sampleVideos[0]],
    interval: 5000,
    autoPlay: true,
    controls: true,
    muted: true,
  },
  render: (args) => (
    <div style={{ width: '640px', height: '360px' }}>
      <VideoRotator {...args} />
    </div>
  ),
};

export const CompactSize: Story = {
  args: {
    videos: sampleVideos,
    interval: 5000,
    autoPlay: true,
    controls: true,
    muted: true,
  },
  render: (args) => (
    <div style={{ width: '320px', height: '180px' }}>
      <VideoRotator {...args} />
    </div>
  ),
};