import type { Meta, StoryObj } from '@storybook/react';
import { Video } from './Video';
import { useRef } from 'react';

const meta: Meta<typeof Video> = {
  title: 'Media/Video',
  component: Video,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A video component with lazy loading and autoplay support. Features intersection observer for performance optimization.',
      },
    },
  },
  argTypes: {
    preloadImmediately: {
      control: 'boolean',
      description: 'Preload the video immediately if true, otherwise lazy load on intersection',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    onEnded: {
      action: 'video ended',
      description: 'Callback fired when video playback ends',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample video files for demo - you can replace these with actual video URLs
const sampleVideoSources = {
  webm: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.webm',
  mp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
};

const samplePoster = 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217';

export const Default: Story = {
  args: {
    videoSources: sampleVideoSources,
    poster: samplePoster,
    preloadImmediately: false,
  },
  render: (args) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    return (
      <div style={{ width: '400px', height: '300px' }}>
        <Video {...args} ref={videoRef} />
      </div>
    );
  },
};

export const PreloadImmediately: Story = {
  args: {
    videoSources: sampleVideoSources,
    poster: samplePoster,
    preloadImmediately: true,
  },
  render: (args) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    return (
      <div style={{ width: '400px', height: '300px' }}>
        <Video {...args} ref={videoRef} />
      </div>
    );
  },
};

export const WithCustomClassName: Story = {
  args: {
    videoSources: sampleVideoSources,
    poster: samplePoster,
    className: 'rounded-lg shadow-lg',
    preloadImmediately: false,
  },
  render: (args) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    return (
      <div style={{ width: '400px', height: '300px' }}>
        <Video {...args} ref={videoRef} />
      </div>
    );
  },
};

export const LargeVideo: Story = {
  args: {
    videoSources: sampleVideoSources,
    poster: samplePoster,
    preloadImmediately: false,
  },
  render: (args) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    return (
      <div style={{ width: '800px', height: '450px' }}>
        <Video {...args} ref={videoRef} />
      </div>
    );
  },
};